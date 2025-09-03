import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Box, Paper, Grid, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Procolos from '../components/Protocolos.tsx';


export default function DetalheBeneficiario() {
  const { matricula } = useParams();
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 2, mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleVoltar}
          sx={{ mb: 3 }}
        >
          Voltar
        </Button>
        
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Detalhes do Beneficiário
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Informações Pessoais
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Matrícula:</strong> {matricula || "N/A"}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Nome:</strong> Nome do Beneficiário
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>CPF:</strong> XXX.XXX.XXX-XX
              </Typography>
            </Grid>
            
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" gutterBottom>
                Informações do Plano
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Plano:</strong> Nome do Plano
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Status:</strong> Ativo
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Procolos matricula={matricula} />
      </Box>
    </Container>
  );
}