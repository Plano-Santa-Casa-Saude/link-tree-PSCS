import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import PdfCartaPermanencia from "./PdfLetterOfStay";
import PdfQuitacaoDividas from "./PdfLetterDebtSettlement";

const styleModalPdf = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

function Letters(params: { matricula: any; contrato: any }) {
  const [openModalPdfPermanencia, setopenModalPdfPermanencia] = useState(false);
  const [openModalPdfQuitacao, setopenModalPdfQuitacao] = useState(false);
  const [openModalFiltro, setopenModalFiltro] = useState(false);

  const [dtInicio, setDtInicio] = useState("");
  const [dtFim, setDtFim] = useState("");

  const handleopenModalPdfPermanencia = () => setopenModalPdfPermanencia(true);
  const handleCloseModalPdfPermanencia = () =>
    setopenModalPdfPermanencia(false);

  const handleopenModalPdfQuitacao = () => setopenModalPdfQuitacao(true);
  const handleCloseModalPdfQuitacao = () => setopenModalPdfQuitacao(false);

  const handleopenModalFiltro = () => setopenModalFiltro(true);
  const handleCloseModalFiltro = () => setopenModalFiltro(false);

  const handleBuscar = () => {

    // aqui você pode chamar sua API, gerar PDF, etc.
    if (!dtInicio || !dtFim) {
      alert("Preencha as duas datas!");
      return;
    }

    if(dtFim < dtInicio){
      alert("A Dt. Fim não pode ser menor que a Dt. Fim!!")
      return;
    }

    handleopenModalPdfQuitacao()
    handleCloseModalFiltro() 
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cartas
      </Typography>
      <Grid container spacing={2}>
        <Grid size="auto">
          <Button onClick={handleopenModalPdfPermanencia} variant="contained">
            Carta de Permanência
          </Button>
        </Grid>
        <Grid size="auto">
          <Button onClick={handleopenModalFiltro} variant="contained">
            Carta de Quitação de Débitos
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={openModalPdfPermanencia}
        onClose={handleCloseModalPdfPermanencia}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...styleModalPdf, width: "70%", height: "90%" }}>
          <PdfCartaPermanencia matricula={params.matricula} />
        </Box>
      </Modal>
      <Modal
        open={openModalFiltro}
        onClose={handleCloseModalFiltro}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...styleModalPdf, width: "35%", height: "30%" }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Informe o periodo
          </Typography>

          <TextField
            label="Dt. Início"
            type="date"
            value={dtInicio}
            onChange={(e) => setDtInicio(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}

          />

          <TextField
            label="Dt. Fim"
            type="date"
            value={dtFim}
            onChange={(e) => setDtFim(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}

          />

          <Button variant="contained" onClick={handleBuscar}>
            Buscar
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openModalPdfQuitacao}
        onClose={handleCloseModalPdfQuitacao}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...styleModalPdf, width: "70%", height: "90%" }}>
          <PdfQuitacaoDividas contrato={params.contrato} dtInicio={dtInicio} dtFim={dtFim} />
        </Box>
      </Modal>
    </Paper>
  );
}

export default Letters;
