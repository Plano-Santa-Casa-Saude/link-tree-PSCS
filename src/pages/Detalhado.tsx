import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Box, Paper, Grid, Container, Avatar, Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

export default function DetalheBeneficiario() {
  const { matricula } = useParams();
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="lg" sx={{ 
      py: 4,
      background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)',
      minHeight: '100vh'
    }}>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={handleVoltar}
          sx={{ 
            mb: 3, 
            color: '#f8bd1c',
            '&:hover': {
              backgroundColor: 'rgba(248, 189, 28, 0.1)',
              transform: 'translateX(-4px)',
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          Voltar à lista
        </Button>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'center' }}>
          <Avatar 
            sx={{ 
              bgcolor: '#132f4c', 
              mr: 3,
              width: 72,
              height: 72,
              border: '3px solid #f8bd1c'
            }}
          >
            <PersonIcon sx={{ fontSize: 36, color: '#ffffff' }} />
          </Avatar>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ 
              fontWeight: 700,
              color: '#ffffff',
              mb: 2
            }}>
              Detalhes do Beneficiário
            </Typography>
            <Chip 
              label="Ativo" 
              color="success" 
              size="medium" 
              icon={<HealthAndSafetyIcon />}
              sx={{
                backgroundColor: '#4caf50',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 600,
                '& .MuiChip-icon': {
                  color: '#ffffff'
                }
              }}
            />
          </Box>
        </Box>
        
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                border: '2px solid',
                borderColor: '#f8bd1c',
                background: 'linear-gradient(135deg, #132f4c 0%, #0a1929 100%)',
                boxShadow: '0 4px 16px rgba(248, 189, 28, 0.2)',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(248, 189, 28, 0.3)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ 
                mb: 3, 
                color: '#f8bd1c',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                👤 Informações Pessoais
              </Typography>
              
              <Box sx={{ space: 2 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    textTransform: 'uppercase', 
                    fontWeight: 600,
                    color: '#1976d2',
                    fontSize: '0.875rem'
                  }}>
                    Matrícula
                  </Typography>
                  <Typography variant="h5" sx={{ 
                    mt: 0.5, 
                    fontWeight: 600,
                    color: '#ffffff'
                  }}>
                    {matricula || "N/A"}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    textTransform: 'uppercase', 
                    fontWeight: 600,
                    color: '#1976d2',
                    fontSize: '0.875rem'
                  }}>
                    Nome Completo
                  </Typography>
                  <Typography variant="h5" sx={{ 
                    mt: 0.5, 
                    fontWeight: 600,
                    color: '#ffffff'
                  }}>
                    João Silva Santos
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    textTransform: 'uppercase', 
                    fontWeight: 600,
                    color: '#1976d2',
                    fontSize: '0.875rem'
                  }}>
                    CPF
                  </Typography>
                  <Typography variant="h5" sx={{ 
                    mt: 0.5, 
                    fontWeight: 600,
                    color: '#ffffff'
                  }}>
                    123.456.789-00
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                border: '2px solid',
                borderColor: '#f8bd1c',
                background: 'linear-gradient(135deg, #132f4c 0%, #0a1929 100%)',
                boxShadow: '0 4px 16px rgba(248, 189, 28, 0.2)',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(248, 189, 28, 0.3)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ 
                mb: 3, 
                color: '#f8bd1c',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                🏥 Informações do Plano
              </Typography>
              
              <Box sx={{ space: 2 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    textTransform: 'uppercase', 
                    fontWeight: 600,
                    color: '#1976d2',
                    fontSize: '0.875rem'
                  }}>
                    Plano de Saúde
                  </Typography>
                  <Typography variant="h5" sx={{ 
                    mt: 0.5, 
                    fontWeight: 600,
                    color: '#ffffff'
                  }}>
                    Plano Premium Plus
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    textTransform: 'uppercase', 
                    fontWeight: 600,
                    color: '#1976d2',
                    fontSize: '0.875rem'
                  }}>
                    Cobertura
                  </Typography>
                  <Typography variant="h5" sx={{ 
                    mt: 0.5, 
                    fontWeight: 600,
                    color: '#ffffff'
                  }}>
                    Nacional
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    textTransform: 'uppercase', 
                    fontWeight: 600,
                    color: '#1976d2',
                    fontSize: '0.875rem'
                  }}>
                    Validade
                  </Typography>
                  <Typography variant="h5" sx={{ 
                    mt: 0.5, 
                    fontWeight: 600,
                    color: '#ffffff'
                  }}>
                    31/12/2024
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}