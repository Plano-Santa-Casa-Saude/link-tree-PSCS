import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './GuiaListaComponent.css';

// Tipos para o componente
interface Guia {
  NR_GUIA: string;
  NR_TRANSACAO: string;
  STATUS_GUIA: string;
  TIPO_GUIA: string;
  DT_EMISSAO: string;
  DIAS_CORRIDOS: number;
  DT_VENCIMENTO: string;
  CD_MATRICULA: string;
  NM_SEGURADO: string;
  DS_ESPECIALIDADE: string;
  NM_PRESTADOR_SOL: string;
  NM_AUTORIZADOR: string;
  DS_DEPTO_OPERADORA: string;
  PRAZO: string;
  NIVEL: string;
  NR_GUIA_TEM: string;
  DS_OBSERVACAO?: string;
}

interface Paginacao {
  paginaAtual: number;
  totalPaginas: number;
  totalRegistros: number;
}

interface GuiaListaComponentProps {
  matricula: string;
  onGuiaClick?: (nrGuia: string) => void;
  apiUrl?: string;
}

const GuiaListaComponent: React.FC<GuiaListaComponentProps> = ({ 
  matricula, 
  onGuiaClick,
  apiUrl = 'http://10.201.0.39:3333/guia'
}) => {
  // Estados locais
  const [guias, setGuias] = useState<Guia[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paginacao, setPaginacao] = useState<Paginacao>({
    paginaAtual: 1,
    totalPaginas: 1,
    totalRegistros: 0
  });
  const [modalObservacao, setModalObservacao] = useState<{ isOpen: boolean; observacao: string }>({
    isOpen: false,
    observacao: ''
  });

  // Cores dos status
  const coresStatus: Record<string, string> = {
    'Negado': '#ff0000',
    'Cancelada': '#ff0000',
    'Em Analise': '#cdcccc',
    'Autorizado Parcialmente': '#fcaf42',
    'Autorizado': '#92d050'
  };

  // Função para formatar data no padrão brasileiro (dd/mm/aaaa)
  // Suporta formatos: ISO (2024-01-15), dd-mm-aaaa (15-01-2024), dd/mm/aaaa (15/01/2024)
  const formatarData = useCallback((data: string): string => {
    if (!data || data.trim() === '') return '';
    
    try {
      // Remove espaços em branco
      const dataLimpa = data.trim();
      
      // Se a data já está no formato dd/mm/aaaa, retorna como está
      if (dataLimpa.includes('/') && dataLimpa.length >= 8) {
        return dataLimpa;
      }
      
      // Se a data está no formato ISO (aaaa-mm-dd) ou similar
      let dataObj: Date;
      
      // Tenta diferentes formatos de data
      if (dataLimpa.includes('-')) {
        // Formato ISO: aaaa-mm-dd ou dd-mm-aaaa
        const partes = dataLimpa.split('-');
        if (partes.length === 3) {
          // Se o primeiro elemento tem 4 dígitos, é formato ISO
          if (partes[0].length === 4) {
            dataObj = new Date(dataLimpa);
          } else {
            // Formato dd-mm-aaaa, converte para ISO
            dataObj = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
          }
        } else {
          dataObj = new Date(dataLimpa);
        }
      } else {
        dataObj = new Date(dataLimpa);
      }
      
      // Verifica se a data é válida
      if (isNaN(dataObj.getTime())) {
        return dataLimpa; // Retorna a string original se não conseguir converter
      }
      
      // Formata para dd/mm/aaaa
      const dia = dataObj.getDate().toString().padStart(2, '0');
      const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
      const ano = dataObj.getFullYear();
      
      return `${dia}/${mes}/${ano}`;
    } catch (error) {
      console.warn('Erro ao formatar data:', data, error);
      return data; // Retorna a string original em caso de erro
    }
  }, []);


  // Buscar guias da API
  const buscarGuias = useCallback(async (pagina: number = 1): Promise<void> => {
    if (!matricula) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${apiUrl}/${matricula}?pagina=${pagina}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Timeout de 10 segundos
        signal: AbortSignal.timeout(10000)
      });
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setGuias(data.guia || []);
      setPaginacao({
        paginaAtual: data.paginaAtual || 1,
        totalPaginas: data.totalPaginas || 1,
        totalRegistros: data.totalRegistros || 0
      });
    } catch (err) {
      console.error('Erro ao buscar guias:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar guias');
      setGuias([]);
      setPaginacao({
        paginaAtual: 1,
        totalPaginas: 1,
        totalRegistros: 0
      });
    } finally {
      setLoading(false);
    }
  }, [matricula, apiUrl]);

  // Efeito para buscar guias quando matrícula mudar
  useEffect(() => {
    if (matricula) {
      buscarGuias(1);
    }
  }, [matricula, buscarGuias]);

  // Manipular clique em guia
  const handleGuiaClick = useCallback((nrGuia: string): void => {
    onGuiaClick?.(nrGuia);
  }, [onGuiaClick]);

  // Manipular clique em observações
  const handleObservacaoClick = useCallback((observacao: string): void => {
    setModalObservacao({ isOpen: true, observacao });
  }, []);

  // Fechar modal de observações
  const closeModalObservacao = useCallback((): void => {
    setModalObservacao({ isOpen: false, observacao: '' });
  }, []);

  // Status que ocultam o número da guia
  const statusOcultos = useMemo(() => ['Negado', 'Em Analise', 'Cancelada'], []);

  // Renderizar número da guia (oculto para alguns status)
  const renderNumeroGuia = useCallback((guia: Guia): React.ReactNode => {
    if (statusOcultos.includes(guia.STATUS_GUIA)) {
      return <div className="guia-oculta" aria-label="Número da guia oculto"></div>;
    }
    return guia.NR_GUIA;
  }, [statusOcultos]);

  // Renderizar botão de observações
  const renderObservacoes = useCallback((guia: Guia): React.ReactNode => {
    const hasObservacao = Boolean(guia.DS_OBSERVACAO);
    
    return (
      <button 
        className="btn btn-primary btn-sm"
        title={hasObservacao ? "Ver observações" : "Sem observações"}
        onClick={() => hasObservacao && handleObservacaoClick(guia.DS_OBSERVACAO!)}
        disabled={!hasObservacao}
        aria-label={hasObservacao ? "Ver observações" : "Sem observações"}
      >
        <i className="fas fa-comment"></i>
      </button>
    );
  }, [handleObservacaoClick]);


  // Renderizar paginação
  const renderPaginacao = useMemo(() => {
    if (paginacao.totalPaginas <= 1) return null;

    const paginas: React.ReactNode[] = [];
    const { paginaAtual, totalPaginas } = paginacao;

    for (let i = 1; i <= totalPaginas; i++) {
      if (i === 1 || i === totalPaginas || (i < paginaAtual + 10 && i > paginaAtual - 10)) {
        if (i === totalPaginas && !(totalPaginas < paginaAtual + 10 && totalPaginas > paginaAtual - 10)) {
          paginas.push(<span key="dots1">...</span>);
        }

        paginas.push(
          <button
            key={i}
            className={`btn btn-primary ${i === paginaAtual ? 'active' : ''}`}
            onClick={() => buscarGuias(i)}
          >
            {i}
          </button>
        );

        if (i === 1 && !(1 < paginaAtual + 10 && 1 > paginaAtual - 10)) {
          paginas.push(<span key="dots2">...</span>);
        }
      }
    }

    return <div className="pagination">{paginas}</div>;
  }, [paginacao, buscarGuias]);

  if (!matricula) {
    return (
      <div className="alert alert-warning" role="alert">
        <i className="fas fa-exclamation-triangle me-2"></i>
        Matrícula não informada
      </div>
    );
  }

  return (
    <div className="guia-lista-container">

      {/* Tabela de Guias */}
      <div className="table-responsive" style={{ maxHeight: '35vh', overflowX: 'auto' }}>
        <table 
          className="table table-hover" 
          style={{ whiteSpace: 'nowrap' }}
          role="table"
          aria-label="Lista de guias médicas"
        >
          <thead>
            <tr>
              <th className="align-middle text-center sticky-header" scope="col">Nr. Guia</th>
              <th className="align-middle text-center sticky-header" scope="col">Nr. Transação</th>
              <th className="align-middle text-center sticky-header" scope="col">Status Guia</th>
              <th className="align-middle text-center sticky-header" scope="col">Tipo Guia</th>
              <th className="align-middle text-center sticky-header" scope="col">Dt. Emissão</th>
              <th className="align-middle text-center sticky-header" scope="col">Dias Corridos</th>
              <th className="align-middle text-center sticky-header" scope="col">Dt. Vencimento</th>
              <th className="align-middle text-center sticky-header" scope="col">Matrícula</th>
              <th className="align-middle text-center sticky-header" scope="col">Nome Beneficiário</th>
              <th className="align-middle text-center sticky-header" scope="col">Especialidade</th>
              <th className="align-middle text-center sticky-header" scope="col">Prestador Executor</th>
              <th className="align-middle text-center sticky-header" scope="col">Nome Prestador</th>
              <th className="align-middle text-center sticky-header" scope="col">Autorizador</th>
              <th className="align-middle text-center sticky-header" scope="col">Setor</th>
              <th className="align-middle text-center sticky-header" scope="col">Prazo de Auto.</th>
              <th className="align-middle text-center sticky-header" scope="col">Nível</th>
              <th className="align-middle text-center sticky-header" scope="col">Guia Tem.</th>
              <th className="align-middle text-center sticky-header" scope="col">Observações</th>
              <th className="align-middle text-center sticky-header" scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={19} className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={19} className="text-center text-danger">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Erro ao carregar guias: {error}
                </td>
              </tr>
            ) : guias.length === 0 ? (
              <tr>
                <td colSpan={19} className="text-center text-muted">
                  <i className="fas fa-inbox me-2"></i>
                  Nenhuma guia encontrada
                </td>
              </tr>
            ) : (
              guias.map((guia: Guia, index: number) => (
                <tr key={`${guia.NR_GUIA}-${index}`}>
                  <td className="align-middle text-center">
                    {renderNumeroGuia(guia)}
                  </td>
                  <td className="align-middle text-center">{guia.NR_TRANSACAO}</td>
                  <td 
                    className="align-middle text-center"
                    style={{ 
                      backgroundColor: coresStatus[guia.STATUS_GUIA] || '#ffffff',
                      border: `1px solid ${coresStatus[guia.STATUS_GUIA] || '#dee2e6'}`
                    }}
                  >
                    {guia.STATUS_GUIA}
                  </td>
                  <td className="align-middle text-center">{guia.TIPO_GUIA}</td>
                  <td className="align-middle text-center date-cell">{formatarData(guia.DT_EMISSAO)}</td>
                  <td className="align-middle text-center">{guia.DIAS_CORRIDOS}</td>
                  <td className="align-middle text-center date-cell">{formatarData(guia.DT_VENCIMENTO)}</td>
                  <td className="align-middle text-center">{guia.CD_MATRICULA}</td>
                  <td className="align-middle text-center">{guia.NM_SEGURADO}</td>
                  <td className="align-middle text-center">{guia.DS_ESPECIALIDADE}</td>
                  <td className="align-middle text-center">{guia.NM_PRESTADOR_SOL}</td>
                  <td className="align-middle text-center">{guia.NM_PRESTADOR_SOL}</td>
                  <td className="align-middle text-center">{guia.NM_AUTORIZADOR}</td>
                  <td className="align-middle text-center">{guia.DS_DEPTO_OPERADORA}</td>
                  <td className="align-middle text-center">{guia.PRAZO}</td>
                  <td className="align-middle text-center">{guia.NIVEL}</td>
                  <td className="align-middle text-center">{guia.NR_GUIA_TEM}</td>
                  <td className="align-middle text-center">
                    {renderObservacoes(guia)}
                  </td>
                  <td className="align-middle text-center">
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleGuiaClick(guia.NR_GUIA)}
                      title="Ver detalhes"
                      aria-label={`Ver detalhes da guia ${guia.NR_GUIA}`}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      {renderPaginacao}

      {/* Informações de paginação */}
      {paginacao.totalRegistros > 0 && (
        <div className="pagination-info mt-2">
          <small className="text-muted">
            Mostrando {((paginacao.paginaAtual - 1) * 15) + 1} a {Math.min(paginacao.paginaAtual * 15, paginacao.totalRegistros)} de {paginacao.totalRegistros} registros
          </small>
        </div>
      )}

      {/* Modal de Observações */}
      {modalObservacao.isOpen && (
        <div 
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050,
          }}
          onClick={closeModalObservacao}
        >
          <div 
            className="modal-content"
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '0',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="modal-header"
              style={{
                padding: '20px',
                borderBottom: '1px solid #dee2e6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h5 
                className="modal-title"
                style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#495057',
                }}
              >
                Observações da Guia
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModalObservacao}
                aria-label="Fechar modal"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6c757d',
                  padding: '0',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ×
              </button>
            </div>
            <div 
              className="modal-body"
              style={{
                padding: '20px',
              }}
            >
              <div className="observacao-content">
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                  {modalObservacao.observacao}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(GuiaListaComponent);
