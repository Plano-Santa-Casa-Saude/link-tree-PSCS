import React, { useState, useEffect } from 'react';
import OuvidoriaComponent from './OuvidoriaComponent';

interface Alerta {
  data: string;
  setor: string;
  descricao: string;
}

interface AlertaComponentProps {
  matricula?: string;
  alertas?: Alerta[];
  titulo?: string;
  mostrarModal?: boolean;
  onFecharModal?: () => void;
  className?: string;
  apiUrl?: string;
  ouvidoriaApiUrl?: string;
}

const AlertaComponentSimple: React.FC<AlertaComponentProps> = ({ 
  matricula,
  alertas: alertasProp = [], 
  titulo = "Alertas", 
  mostrarModal = false, 
  onFecharModal = () => {},
  className = "",
  apiUrl = "http://localhost:3333/alertas",
  ouvidoriaApiUrl = "http://localhost:3333/ouvidoria"
}) => {
  const [alertas, setAlertas] = useState<Alerta[]>(alertasProp);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abaAtiva, setAbaAtiva] = useState<'alertas' | 'ouvidoria'>('alertas');

  // Buscar alertas da API se matrícula for fornecida e válida
  useEffect(() => {
    console.log('Matrícula recebida:', matricula, 'Tipo:', typeof matricula);
    if (matricula && apiUrl && matricula !== '-2' && matricula !== 'undefined' && matricula.length > 3) {
      buscarAlertas();
    }
  }, [matricula, apiUrl]);

  const buscarAlertas = async () => {
    if (!matricula) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${apiUrl}/${matricula}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log('Dados recebidos da API de alertas:', data);
      console.log('Tipo dos dados:', typeof data, 'É array?', Array.isArray(data));
      
      // Verificar se os dados são um array
      let dadosArray = data;
      if (!Array.isArray(data)) {
        // Se não for array, tentar extrair de propriedades comuns
        if (data.alertas && Array.isArray(data.alertas)) {
          dadosArray = data.alertas;
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
      const alertasFormatados: Alerta[] = dadosArray.map((item: any) => ({
        data: item.DT_VIGENCIA_INICIAL ? new Date(item.DT_VIGENCIA_INICIAL).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR'),
        setor: item.ds_departamento || 'Não informado',
        descricao: item.observacao || 'Sem descrição'
      }));
      
      console.log('Alertas formatados:', alertasFormatados);
      setAlertas(alertasFormatados);
    } catch (err) {
      console.error('Erro ao buscar alertas:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  // Se não é modal, não renderiza nada
  if (!mostrarModal) {
    return null;
  }

  const renderAlerta = (alerta: Alerta, index: number) => (
    <div key={index} style={{ 
      border: '1px solid #ddd', 
      padding: '10px', 
      margin: '5px 0',
      borderRadius: '4px',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '8px' }}>
        <span><strong>Data:</strong> {alerta.data}</span>
        <span><strong>Setor:</strong> {alerta.setor}</span>
      </div>
      <div>
        <strong>Descrição:</strong> {alerta.descricao}
      </div>
    </div>
  );

  const conteudoAlertas = (
    <div className={className}>
      {titulo && <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>{titulo}</h3>}
      <div>
        {alertas.map((alerta, index) => renderAlerta(alerta, index))}
      </div>
    </div>
  );

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
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
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
          
          {/* Abas */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: '#f8f9fa'
          }}>
            <button
              style={{
                flex: 1,
                padding: '12px 20px',
                border: 'none',
                backgroundColor: abaAtiva === 'alertas' ? '#ff6b35' : 'transparent',
                color: abaAtiva === 'alertas' ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
                borderBottom: abaAtiva === 'alertas' ? '3px solid #ff6b35' : '3px solid transparent'
              }}
              onClick={() => setAbaAtiva('alertas')}
            >
              Alertas
            </button>
            <button
              style={{
                flex: 1,
                padding: '12px 20px',
                border: 'none',
                backgroundColor: abaAtiva === 'ouvidoria' ? '#4a90e2' : 'transparent',
                color: abaAtiva === 'ouvidoria' ? 'white' : '#666',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
                borderBottom: abaAtiva === 'ouvidoria' ? '3px solid #4a90e2' : '3px solid transparent'
              }}
              onClick={() => setAbaAtiva('ouvidoria')}
            >
              Ouvidoria
            </button>
          </div>
          
          <div style={{ padding: '24px' }}>
            {abaAtiva === 'alertas' ? (
              loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #ff6b35',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 16px'
                  }}></div>
                  <p style={{ color: '#666', margin: 0 }}>Carregando alertas...</p>
                </div>
              ) : error ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px',
                  color: '#666',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px'
                }}>
                  <p style={{ margin: 0, fontSize: '1.1em' }}>Beneficiário não possui alertas</p>
                  <p style={{ margin: '8px 0 0 0', fontSize: '0.9em' }}>Este beneficiário não possui alertas no momento.</p>
                </div>
              ) : alertas.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px',
                  color: '#666',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px'
                }}>
                  <p style={{ margin: 0, fontSize: '1.1em' }}>Beneficiário não possui alertas</p>
                  <p style={{ margin: '8px 0 0 0', fontSize: '0.9em' }}>Este beneficiário não possui alertas no momento.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {alertas.map((alerta, index) => (
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
                          <strong>Data:</strong> {alerta.data}
                        </span>
                        <span style={{ 
                          fontSize: '0.9em', 
                          color: '#666',
                          backgroundColor: '#f3e5f5',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontWeight: '500'
                        }}>
                          <strong>Setor:</strong> {alerta.setor}
                        </span>
                      </div>
                      <div style={{ 
                        fontSize: '1em', 
                        color: '#333', 
                        lineHeight: '1.5',
                        backgroundColor: 'white',
                        padding: '12px',
                        borderRadius: '4px',
                        border: '1px solid #e0e0e0'
                      }}>
                        <strong>Descrição:</strong> {alerta.descricao}
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <OuvidoriaComponent
                matricula={matricula}
                titulo=""
                mostrarModal={false}
                apiUrl={ouvidoriaApiUrl}
              />
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
  return conteudoAlertas;
};

export default AlertaComponentSimple;
