import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  Paper,
  Divider
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Assignment as AssignmentIcon,
  Gavel as GavelIcon,
  Receipt as ReceiptIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

interface MetricasBeneficiario {
  matricula: string;
  qtdProtocolos: number;
  qtdProtocolosOuvidoria: number;
  qtdNips: number;
  qtdProtocolosMes: number;
  sinistralidade: string;
  statusFinanceiro: string;
}

interface DashboardMetricasProps {
  matricula?: string;
  apiUrl?: string;
}

const DashboardMetricas: React.FC<DashboardMetricasProps> = ({
  matricula
}) => {
  const [metricas, setMetricas] = useState<MetricasBeneficiario | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (matricula && matricula !== 'undefined' && matricula.length > 0) {
      buscarMetricas();
    }
  }, [matricula]);

  const buscarMetricas = async () => {
    if (!matricula) return;
    
    setLoading(true);
    setError(null);
    
    // URL da API baseada na rota fornecida
    const url = `http://10.201.0.39:3333/metricas/${matricula}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Métricas não encontradas para esta matrícula');
        } else {
          setError(`Erro ${response.status}: ${response.statusText}`);
        }
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      
      // A API retorna { metricas: {...} } baseado no código da rota
      if (data.metricas) {
        setMetricas(data.metricas);
      } else {
        setError('Estrutura de dados inesperada da API');
      }
      
    } catch (err) {
      setError(`Erro ao carregar métricas: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  const formatarPercentual = (valor: string) => {
    if (!valor) return '0%';
    return valor.includes('%') ? valor : `${valor}%`;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'ADIMPLENTE':
        return 'success';
      case 'INADIMPLENTE':
        return 'error';
      case 'PENDENTE':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'ADIMPLENTE':
        return <CheckCircleIcon />;
      case 'INADIMPLENTE':
        return <WarningIcon />;
      default:
        return <AccountBalanceIcon />;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={40} />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Carregando métricas...
        </Typography>
      </Box>
    );
  }



  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Erro ao carregar métricas: {error}
      </Alert>
    );
  }

  if (!metricas) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          mb: 3,
          color: '#1976d2',
          fontWeight: 'bold'
        }}>
          <AssessmentIcon />
          Dashboard de Métricas
        </Typography>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Nenhuma métrica encontrada para esta matrícula. Verifique se a API está funcionando e se a matrícula é válida.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        mb: 3,
        color: '#1976d2',
        fontWeight: 'bold'
      }}>
        <AssessmentIcon />
        Dashboard de Métricas
      </Typography>

      <Grid container spacing={3}>
        {/* Card de Protocolos */}
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card sx={{ 
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AssignmentIcon sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" component="div">
                  Total de Protocolos
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {metricas.qtdProtocolos || 0}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                Protocolos registrados
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Protocolos de Ouvidoria */}
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card sx={{ 
            height: '100%',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <GavelIcon sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" component="div">
                  Ouvidoria
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {metricas.qtdProtocolosOuvidoria || 0}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                Protocolos de ouvidoria
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card de NIPS */}
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card sx={{ 
            height: '100%',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <ReceiptIcon sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" component="div">
                  NIPS
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {metricas.qtdNips || 0}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                NIPS registrados
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Protocolos do Mês */}
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card sx={{ 
            height: '100%',
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUpIcon sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h6" component="div">
                  Este Mês
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
                {metricas.qtdProtocolosMes || 0}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                Protocolos do mês atual
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Sinistralidade */}
        <Grid size={{xs:12, md:6}}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUpIcon sx={{ mr: 1, color: '#ff6b35' }} />
                <Typography variant="h6" component="div">
                  Sinistralidade
                </Typography>
              </Box>
              <Box textAlign="center" py={2}>
                <Typography variant="h2" component="div" sx={{ 
                  fontWeight: 'bold',
                  color: '#ff6b35',
                  mb: 1
                }}>
                  {formatarPercentual(metricas.sinistralidade || '0')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Taxa de sinistralidade
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Status Financeiro */}
        <Grid size={{xs:12, md:6}}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AccountBalanceIcon sx={{ mr: 1, color: '#4caf50' }} />
                <Typography variant="h6" component="div">
                  Status Financeiro
                </Typography>
              </Box>
              <Box textAlign="center" py={2}>
                <Chip
                  icon={getStatusIcon(metricas.statusFinanceiro || '')}
                  label={metricas.statusFinanceiro || 'Não informado'}
                  color={getStatusColor(metricas.statusFinanceiro || '')}
                  size="medium"
                  sx={{ 
                    fontSize: '1.1rem',
                    height: '48px',
                    px: 2
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Situação financeira atual
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Resumo das Informações */}
      <Paper sx={{ mt: 3, p: 2, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
          Resumo das Informações
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:6}}>
            <Typography variant="body2" color="text.secondary">
              <strong>Matrícula:</strong> {metricas.matricula}
            </Typography>
          </Grid>
          <Grid size={{xs:12, sm:6}}>
            <Typography variant="body2" color="text.secondary">
              <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default DashboardMetricas;
