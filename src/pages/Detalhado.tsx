import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Box, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  UserAttention,
  Protocols,
  Financial,
  GuiaListaComponent,
  Letters,
  DetailBeneficiary,
  AddressBeneficiary,
  DetailContract,
  AlertaComponent,
  DashboardMetricas,
} from "../components";

export default function DetalheBeneficiario() {
  const { matricula } = useParams();
  const [mostrarModalAlertas, setMostrarModalAlertas] = useState(false);

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
        <UserAttention matricula={matricula} />
        
        {/* Dashboard de Métricas */}
        <DashboardMetricas 
          matricula={matricula} 
          apiUrl="http://10.201.0.39:3333/metricas"
        />
        
        <DetailBeneficiary matricula={matricula} />
        
        {/* Botão para abrir modal de alertas */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <Button 
            variant="contained" 
            color="warning"
            onClick={() => setMostrarModalAlertas(true)}
            sx={{ mr: 2 }}
          >
            Ver Alertas e Ouvidoria
          </Button>
          <Typography variant="body2" color="text.secondary" component="span">
            (Matrícula: {matricula})
          </Typography>
        </Box>
        
        <AddressBeneficiary matricula={matricula} />
        <DetailContract contrato={localStorage.contrato} />
        <Protocols matricula={matricula} />
        <Box sx={{ mt: 4 }}>
          <GuiaListaComponent
            matricula={matricula || ""}
            onGuiaClick={(_nrGuia) => {
              // Aqui você pode implementar a navegação ou modal para detalhes da guia
            }}
            apiUrl="http://10.201.0.39:3333/guia"
          />
        </Box>
        <Financial contrato={localStorage.contrato} matricula={matricula} />
        <Letters />
        
        {/* Modal de Alertas e Ouvidoria */}
        <AlertaComponent
          matricula={matricula}
          titulo="Alertas e Ouvidoria do Beneficiário"
          mostrarModal={mostrarModalAlertas}
          onFecharModal={() => setMostrarModalAlertas(false)}
          apiUrl="http://10.201.0.39:3333/alertas"
          ouvidoriaApiUrl="http://10.201.0.39:3333/ouvidoria"
        />
      </Box>
    </Container>
  );
}
