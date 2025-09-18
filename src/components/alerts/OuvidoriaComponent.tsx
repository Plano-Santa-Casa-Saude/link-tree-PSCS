import React, { useState, useEffect } from 'react';

interface Ouvidoria {
  OCORRENCIA: string;
  MOTIVO: string;
  ORIGEM_ATENDIMENTO: string;
}

interface OuvidoriaComponentProps {
  matricula?: string;
  ouvidorias?: Ouvidoria[];
  titulo?: string;
  mostrarModal?: boolean;
  onFecharModal?: () => void;
  className?: string;
  apiUrl?: string;
}

const OuvidoriaComponent: React.FC<OuvidoriaComponentProps> = ({ 
  matricula,
  ouvidorias: ouvidoriasProp = [], 
  titulo = "Ouvidoria", 
  mostrarModal = false, 
  onFecharModal = () => {},
  className = "",
  apiUrl = "http://10.201.0.39:3333/ouvidoria"
}) => {
  const [ouvidorias, setOuvidorias] = useState<Ouvidoria[]>(ouvidoriasProp);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar ouvidorias da API se matrícula for fornecida e válida
  useEffect(() => {
    if (matricula && apiUrl && matricula !== '-2' && matricula !== 'undefined' && matricula.length > 3) {
      buscarOuvidorias();
    }
  }, [matricula, apiUrl]);

  const buscarOuvidorias = async () => {
    if (!matricula) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${apiUrl}/${matricula}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log('Dados recebidos da API de ouvidoria:', data);
      console.log('Tipo dos dados:', typeof data, 'É array?', Array.isArray(data));
      
      // Verificar se os dados são um array
      let dadosArray = data;
      if (!Array.isArray(data)) {
        // Se não for array, tentar extrair de propriedades comuns
        if (data.ouvidoria && Array.isArray(data.ouvidoria)) {
          dadosArray = data.ouvidoria;
        } else if (data.data && Array.isArray(data.data)) {
          dadosArray = data.data;
        } else if (data.resultado && Array.isArray(data.resultado)) {
          dadosArray = data.resultado;
        } else {
          // Se for um objeto único, converter para array
          dadosArray = [data];
        }
      }
      
      console.log('Dados processados para array:', dadosArray);
      
      // Mapear os dados da API para o formato esperado
      const ouvidoriasFormatadas: Ouvidoria[] = dadosArray.map((item: any) => ({
        OCORRENCIA: item.OCORRENCIA || 'Não informado',
        MOTIVO: item.MOTIVO || 'Não informado',
        ORIGEM_ATENDIMENTO: item.ORIGEM_ATENDIMENTO || 'Não informado'
      }));
      
      console.log('Ouvidorias formatadas:', ouvidoriasFormatadas);
      setOuvidorias(ouvidoriasFormatadas);
    } catch (err) {
      console.error('Erro ao buscar ouvidorias:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const renderOuvidoria = (ouvidoria: Ouvidoria, index: number) => (
    <div key={index} style={{ 
      border: '1px solid #ddd', 
      padding: '10px', 
      margin: '5px 0',
      borderRadius: '4px',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '8px' }}>
        <span><strong>Motivo:</strong> {ouvidoria.MOTIVO}</span>
        <span><strong>Origem:</strong> {ouvidoria.ORIGEM_ATENDIMENTO}</span>
      </div>
      <div>
        <strong>Ocorrência:</strong> {ouvidoria.OCORRENCIA}
      </div>
    </div>
  );

  const conteudoOuvidorias = (
    <div className={className}>
      {titulo && <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>{titulo}</h3>}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{
            width: '30px',
            height: '30px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #4a90e2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 10px'
          }}></div>
          <p style={{ color: '#666', margin: 0, fontSize: '0.9em' }}>Carregando ouvidorias...</p>
        </div>
      ) : error ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          color: '#d32f2f',
          backgroundColor: '#ffebee',
          borderRadius: '8px',
          border: '1px solid #ffcdd2'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '500', fontSize: '0.9em' }}>Erro ao carregar ouvidorias</p>
          <p style={{ margin: 0, fontSize: '0.8em' }}>{error}</p>
        </div>
      ) : ouvidorias.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          color: '#666',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <p style={{ margin: 0, fontSize: '1em' }}>Beneficiário não possui ouvidorias</p>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.8em' }}>Este beneficiário não possui registros de ouvidoria no momento.</p>
        </div>
      ) : (
        <div>
          {ouvidorias.map((ouvidoria, index) => renderOuvidoria(ouvidoria, index))}
        </div>
      )}
    </div>
  );

  // Se não é modal, renderiza o conteúdo diretamente
  if (!mostrarModal) {
    return conteudoOuvidorias;
  }

  // Se deve mostrar como modal
  if (mostrarModal) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1300,
        animation: 'fadeIn 0.3s ease-out'
      }} onClick={onFecharModal}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          maxWidth: '800px',
          width: '95%',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          animation: 'slideIn 0.3s ease-out'
        }} onClick={(e) => e.stopPropagation()}>
          <div style={{
            background: 'linear-gradient(135deg, #4a90e2, #357abd)',
            color: 'white',
            padding: '20px 24px',
            borderRadius: '12px 12px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.4em', fontWeight: '600' }}>{titulo}</h2>
              {matricula && (
                <p style={{ margin: '4px 0 0 0', fontSize: '0.9em', opacity: 0.9 }}>
                  Matrícula: {matricula}
                </p>
              )}
            </div>
            <button 
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                fontSize: '28px',
                cursor: 'pointer',
                padding: '4px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
              onClick={onFecharModal}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
              ×
            </button>
          </div>
          
          <div style={{ padding: '24px' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid #f3f3f3',
                  borderTop: '4px solid #4a90e2',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px'
                }}></div>
                <p style={{ color: '#666', margin: 0 }}>Carregando ouvidorias...</p>
              </div>
            ) : error ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px',
                color: '#d32f2f',
                backgroundColor: '#ffebee',
                borderRadius: '8px',
                border: '1px solid #ffcdd2'
              }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: '500' }}>Erro ao carregar ouvidorias</p>
                <p style={{ margin: 0, fontSize: '0.9em' }}>{error}</p>
              </div>
            ) : ouvidorias.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px',
                color: '#666',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}>
                <p style={{ margin: 0, fontSize: '1.1em' }}>Nenhuma ouvidoria encontrada</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.9em' }}>Este beneficiário não possui registros de ouvidoria no momento.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {ouvidorias.map((ouvidoria, index) => (
                  <div key={index} style={{ 
                    border: '1px solid #e0e0e0', 
                    padding: '16px', 
                    borderRadius: '8px',
                    backgroundColor: '#fafafa',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    transition: 'box-shadow 0.2s'
                  }}>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <span style={{ 
                        fontSize: '0.9em', 
                        color: '#666',
                        backgroundColor: '#e3f2fd',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: '500'
                      }}>
                        <strong>Motivo:</strong> {ouvidoria.MOTIVO}
                      </span>
                      <span style={{ 
                        fontSize: '0.9em', 
                        color: '#666',
                        backgroundColor: '#f3e5f5',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: '500'
                      }}>
                        <strong>Origem:</strong> {ouvidoria.ORIGEM_ATENDIMENTO}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '1em', 
                      color: '#333', 
                      lineHeight: '1.5',
                      backgroundColor: 'white',
                      padding: '12px',
                      borderRadius: '4px',
                      border: '1px solid #e0e0e0',
                      whiteSpace: 'pre-wrap'
                    }}>
                      <strong>Ocorrência:</strong> {ouvidoria.OCORRENCIA}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: '#fafafa',
            borderRadius: '0 0 12px 12px'
          }}>
            <button 
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: '#6c757d',
                color: 'white',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
              onClick={onFecharModal}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
            >
              Fechar
            </button>
          </div>
        </div>
        
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Renderização normal (não modal)
  return conteudoOuvidorias;
};

export default OuvidoriaComponent;
