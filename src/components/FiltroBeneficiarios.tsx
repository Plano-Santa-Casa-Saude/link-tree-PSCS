import {
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Container,
  Paper,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import type { Beneficiario, FiltroBeneficiario as FiltroType } from "../types";

const columns = [
  { field: "ativo", headerName: "Ativo", width: 70 },
  { field: "matricula", headerName: "Matricula", width: 130 },
  {
    field: "nome",
    headerName: "Nome",
    width: 250,
  },
  {
    field: "cpf",
    headerName: "CPF",
    Type: "Number",
    width: 150,
  },
  {
    field: "plano",
    headerName: "Plano",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 300,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function FiltroBeneficiario() {
  const [rows, setRows] = useState<Beneficiario[]>();
  const [filtros, setFiltros] = useState<FiltroType>({});
  const navigate = useNavigate();

  const buscarBeneficiarios = async () => {
    try {
      const response = await fetch(`http://10.201.0.39:3333/beneficiarios/all`);

      const data = await response.json();
      console.log(data);

      const beneficiariosComId = data.beneficiarios.map(
        (b: any, index: number) => ({
          ...b,
          id: index + 1,
        })
      );

      setRows(beneficiariosComId);
    } catch (error) {
      console.error("Erro ao buscar os beneficiarios:", error);
      throw error;
    }
  };

  const handleFiltroChange = (campo: keyof FiltroType, valor: string | boolean) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <Container maxWidth="xl" sx={{ 
      py: 4,
      background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)',
      minHeight: '100vh'
    }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        mb: 4, 
        fontWeight: 600,
        color: '#ffffff',
        textAlign: 'center'
      }}>
        Consulta de Beneficiários
      </Typography>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4,
          borderRadius: 3,
          border: '2px solid',
          borderColor: '#f8bd1c',
          background: 'linear-gradient(135deg, #132f4c 0%, #0a1929 100%)',
          boxShadow: '0 4px 16px rgba(248, 189, 28, 0.2)',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(248, 189, 28, 0.3)',
          }
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ 
          mb: 3, 
          color: '#f8bd1c',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          🔍 Filtros de Busca
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              label="Nome Completo"
              variant="outlined"
              size="small"
              value={filtros.nome || ''}
              onChange={(e) => handleFiltroChange('nome', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#f8bd1c',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#f8bd1c',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#f8bd1c',
                  '&.Mui-focused': {
                    color: '#f8bd1c',
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              fullWidth
              label="Matrícula"
              variant="outlined"
              size="small"
              value={filtros.matricula || ''}
              onChange={(e) => handleFiltroChange('matricula', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#f8bd1c',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#f8bd1c',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#f8bd1c',
                  '&.Mui-focused': {
                    color: '#f8bd1c',
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <TextField
              fullWidth
              label="CPF"
              variant="outlined"
              size="small"
              value={filtros.cpf || ''}
              onChange={(e) => handleFiltroChange('cpf', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#f8bd1c',
                  },
                  '&:hover fieldset': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#f8bd1c',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#f8bd1c',
                  '&.Mui-focused': {
                    color: '#f8bd1c',
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch 
                    checked={filtros.abrirProtocolo || false}
                    onChange={(e) => handleFiltroChange('abrirProtocolo', e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#f8bd1c',
                        '&:hover': {
                          backgroundColor: 'rgba(248, 189, 28, 0.08)',
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#f8bd1c',
                      },
                    }}
                  />
                }
                label="Abrir protocolo"
                labelPlacement="top"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    color: '#132f4c',
                    fontWeight: 500,
                  }
                }}
              />
            </FormGroup>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 6, md: 1 }}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Button 
              onClick={buscarBeneficiarios} 
              variant="contained"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                backgroundColor: '#f8bd1c',
                color: '#0a1929',
                boxShadow: '0 4px 12px rgba(248, 189, 28, 0.4)',
                '&:hover': {
                  backgroundColor: '#ffd54f',
                  boxShadow: '0 6px 20px rgba(248, 189, 28, 0.5)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <SearchIcon sx={{ mr: 1 }} />
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 3,
          border: '2px solid',
          borderColor: '#f8bd1c',
          background: 'linear-gradient(135deg, #132f4c 0%, #0a1929 100%)',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(248, 189, 28, 0.2)',
        }}
      >
        <Box sx={{ 
          p: 3, 
          borderBottom: '2px solid', 
          borderColor: '#f8bd1c',
          background: 'linear-gradient(135deg, #0a1929 0%, #132f4c 100%)'
        }}>
          <Typography variant="h6" sx={{ 
            color: '#f8bd1c',
            fontWeight: 600,
            textAlign: 'center'
          }}>
            📊 Resultados da Busca
          </Typography>
        </Box>
        
        <DataGrid
          rows={rows || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ 
            border: 0,
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid',
              borderColor: '#e0e0e0',
              color: '#0a1929',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f8bd1c',
              borderBottom: '2px solid',
              borderColor: '#132f4c',
              color: '#0a1929',
              fontWeight: 600,
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(248, 189, 28, 0.1)',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: '2px solid',
              borderColor: '#132f4c',
              backgroundColor: '#fafafa',
            }
          }}
          onCellDoubleClick={(params) => {
            const matricula = params.row.matricula
            navigate(`/Detalhado/${matricula}`);
          }}
        />
      </Paper>
    </Container>
  );
}
