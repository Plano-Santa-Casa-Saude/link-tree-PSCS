import {
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import formatDate from "../../utils/utils";
//--------------------ICONES------------------------//
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ReplyIcon from "@mui/icons-material/Reply";

import { DataGrid } from "@mui/x-data-grid";
import { GuideProcedures, GuideOccurrences, GuideLocks, GuideAttachment } from "./index";

const paginationModel = { page: 0, pageSize: 5 };

export default function GuiaListaComponent(props: { matricula: any }) {
  const [rowsGuias, setRowsGuias] = useState();
  const [loading, setLoading] = useState(false);

  const [openModalGuia, setOpenModalGuia] = useState(false);

  const [guiaModal, setGuiaModal] = useState(null);

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (props.matricula) {
      buscarGuias();
    }
  }, [props.matricula]);

  const handleOpenModalProtocolos = (guia: any) => {
    setOpenModalGuia(true);
    setGuiaModal(guia);
  };

  const handleCloseModalGuia = () => {
    setOpenModalGuia(false);
  };

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const columnsGuias = [
    { field: "NR_GUIA", headerName: "Nr. Guia", width: 100 },
    { field: "NR_TRANSACAO", headerName: "Nr. Transação", width: 150 },
    { field: "STATUS_GUIA", headerName: "Status", width: 140 },
    { field: "TIPO_GUIA", headerName: "Tipo Guia", width: 120 },
    { field: "DT_EMISSAO", headerName: "Dt. Emissão", width: 120 },
    { field: "TEMPO_EM_ABERTO", headerName: "Dias Corridos", width: 200 },
    { field: "DT_VENCIMENTO", headerName: "Dt. Vencimento", width: 140 },
    { field: "CD_MATRICULA", headerName: "Matrícula", width: 140 },
    { field: "NM_SEGURADO", headerName: "Nm. Beneficiario", width: 200 },
    { field: "DS_ESPECIALIDADE", headerName: "Especialidade", width: 140 },
    {
      field: "PRESTADOR_EXECUTOR",
      headerName: "Prestador Executor",
      width: 140,
    },
    { field: "NM_PRESTADOR_SOL", headerName: "Nome Prestador", width: 140 },
    { field: "NM_AUTORIZADOR", headerName: "Autorizador", width: 140 },
    { field: "DS_DEPTO_OPERADORA", headerName: "Setor", width: 140 },
    { field: "PRAZO", headerName: "Prazo de Auto.", width: 180 },
    { field: "NIVEL", headerName: "Nível", width: 140 },
    { field: "NR_GUIA_TEM", headerName: "Guia Tem.", width: 140 },
    {
      field: "DS_OBSERVACAO",
      headerName: "Obervações",
      width: 150,
      renderCell: (params: any) => (
        <Tooltip
          placement="left-start"
          title={
            <>
              {String(params.value)
                .split("\n")
                .map((linha, i) => (
                  <div key={i}>{linha}</div>
                ))}
            </>
          }
        >
          <IconButton>
            <ChatBubbleIcon
              sx={{
                color: params.value ? "blue" : "grey",
                cursor: params.value ? "pointer" : "default",
              }}
            />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "DETALHE_GUIA",
      headerName: "Opções",
      width: 90,
      renderCell: (params: any) => (
        <Button onClick={() => handleOpenModalProtocolos(params.value)}>
          <RemoveRedEyeIcon />
        </Button>
      ),
    },
  ];

  const buscarGuias = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/guia/${props.matricula}`
      );

      const data = await response.json();

      const GuiasTratados = data.guia.map((b: any, index: number) => ({
        ...b,
        id: index + 1,
        DT_EMISSAO: new Date(b.DT_EMISSAO).toLocaleDateString("pt-BR"),
        DT_VENCIMENTO: new Date(b.DT_VENCIMENTO).toLocaleDateString("pt-BR"),
        PRESTADOR_EXECUTOR: b.NM_PRESTADOR_SOL,
        DETALHE_GUIA: b.NR_GUIA,
      }));

      // O array está em "tramites"
      setRowsGuias(GuiasTratados);
    } catch (error) {
      console.error("Erro ao buscar as guias:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Guias
        </Typography>
        <DataGrid
          rows={rowsGuias}
          columns={columnsGuias}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          loading={loading}
        />
      </Paper>
      <Modal
        open={openModalGuia}
        onClose={handleCloseModalGuia}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "75vw",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
            maxHeight: "80vh", // limita altura
            overflowY: "auto", // ativa scroll
          }}
        >
          <Button onClick={handleCloseModalGuia}>
            <ReplyIcon /> Voltar
          </Button>
          <Typography variant="h5" component="h1" gutterBottom>
            Guias - {guiaModal}
          </Typography>
          <Container sx={{ mt: 4 }}>
            {/* Abas */}
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              aria-label="abas do modal"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Procedimentos" />
              <Tab label="Ocorrências" />
              <Tab label="Bloqueios" />
              <Tab label="Anexos" />
            </Tabs>

            {/* Conteúdo */}
            <Box sx={{ mt: 2 }}>
              {tabValue === 0 && <GuideProcedures guia={guiaModal} />}
              {tabValue === 1 && <GuideOccurrences guia={guiaModal} />}
              {tabValue === 2 && <GuideLocks guia={guiaModal} />}
              {tabValue === 3 && <GuideAttachment guia={guiaModal} />}
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  );
}
