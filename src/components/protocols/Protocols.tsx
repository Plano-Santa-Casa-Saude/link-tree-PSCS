//-------------------MUI----------------------//
import {
  Paper,
  Container,
  Tooltip,
  IconButton,
  Modal,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
//--------------------ICONES------------------------//
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ReplyIcon from "@mui/icons-material/Reply";
import AddIcon from "@mui/icons-material/Add";
//-------------------COMPONENTES---------------------//
import { AttachmentsProtocol, ProtocolForm, ProcessProtocol } from "./index";

//-------------------HOOKERS----------------------//
import { useEffect, useState } from "react";
//--------------------STYLE---------------------//

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "150vh",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

const paginationModel = { page: 0, pageSize: 5 };

function Protocols(props: { matricula: any }) {
  const [loading, setLoading] = useState(false);
  const [rowsProtocolos, setRowsProtocolos] = useState();
  const [openModalProtocolos, setOpenModalProtocolos] = useState(false);
  const [openModalFormulario, setOpenModalFormulario] = useState(false);
  const [CdProtocolos, setCdProtocolos] = useState("");
  const [dtTermino, setDtTermino] = useState("");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (props.matricula) {
      buscarProtocolos();
    }
  }, [props.matricula]);

  //   const handleOpenModalProtocolos = () => setOpen(true);
  const handleCloseModalProtocolos = () => setOpenModalProtocolos(false);
  const handleOpenModalProtocolos = (
    cdAtendCallCenter: string,
    dtTermino: string
  ) => {
    setCdProtocolos(cdAtendCallCenter);
    setOpenModalProtocolos(true);
    setDtTermino(dtTermino);
  };
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenModalFormulario = () => {
    setOpenModalFormulario(true);
    setOpenModalProtocolos(false);
  };
  const handleCloseModalFormulario = () => {
    setOpenModalFormulario(false);
    setOpenModalProtocolos(true);
  };

  //-----------------------COLUNAS PROTOCOLOS------------------------------//
  const columnsProtocolos = [
    { field: "DEMANDA", headerName: "Demanda", width: 100 },
    { field: "NR_PROTOCOLO_ANS", headerName: "Protocolo ANS", width: 185 },
    {
      field: "DATA_INICIO",
      headerName: "Dt. Inicio",
      width: 150,
    },
    {
      field: "DATA_TERMINO",
      headerName: "Dt. Termino",
      Type: "Number",
      width: 150,
    },
    {
      field: "TIPO_ATENDIMENTO",
      headerName: "Tipo",
      width: 150,
    },
    {
      field: "SERVICO",
      headerName: "Serviço",
      width: 300,
    },
    {
      field: "MOTIVO",
      headerName: "Motivo",
      width: 200,
    },
    {
      field: "ORIGEM_ATENDIMENTO",
      headerName: "Origem",
      width: 200,
    },
    {
      field: "DEPARTAMENTO_ABERTURA",
      headerName: "Departamento Abertura",
      width: 180,
    },
    {
      field: "PROTOCOLO_ASSOCIADO",
      headerName: "Protocolo Associado",
      width: 150,
    },
    {
      field: "CD_USUARIO_ABERTURA",
      headerName: "Atendente Abertura",
      width: 200,
    },
    {
      field: "SLA",
      headerName: "SLA",
      width: 100,
    },
    {
      field: "OCORRENCIA",
      headerName: "Ocorrência",
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
      field: "CONSIDERACAO",
      headerName: "Consideração",
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
      field: "CD_PROTOCOLO",
      headerName: "Opções",
      width: 90,
      renderCell: (params: any) => (
        <Button
          onClick={() =>
            handleOpenModalProtocolos(params.value, params.row.DATA_TERMINO)
          }
        >
          <RemoveRedEyeIcon />
        </Button>
      ),
    },
  ];

  //-------------------------------ROTA PROTOCOLOS----------------------------------------//

  const buscarProtocolos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/protocolos/${props.matricula}`
      );

      const data = await response.json();

      const protocolosComId = data.protocolos.map((b: any, index: number) => ({
        ...b,
        id: index + 1, // ou `${b.matricula}-${index}`
        DATA_INICIO: new Date(b.DATA_INICIO).toLocaleDateString("pt-BR"),
        DATA_TERMINO: b.DATA_TERMINO
          ? new Date(b.DATA_TERMINO).toLocaleDateString("pt-BR")
          : "",
        CD_PROTOCOLO: b.DEMANDA,
      }));

      // O array está em "protocolos"
      setRowsProtocolos(protocolosComId);
    } catch (error) {
      console.error("Erro ao buscar os protocolos:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Protocolos
        </Typography>
        <Container sx={{ mt: 4 }}>
          <DataGrid
            rows={rowsProtocolos || []}
            columns={columnsProtocolos}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
            loading={loading}
          />
        </Container>
      </Paper>

      <Modal
        open={openModalProtocolos}
        onClose={handleCloseModalProtocolos}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Protocolo - {CdProtocolos}
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
              <Tab label="Trâmites" />
              <Tab label="Anexos" />
            </Tabs>

            {/* Conteúdo */}
            <Box sx={{ mt: 2 }}>
              {tabValue === 0 && (
                <>
                  <ProcessProtocol
                    dtTermino={dtTermino}
                    cdAtendCallCenter={CdProtocolos}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleOpenModalFormulario}
                  >
                    <AddIcon />
                    Novo tramite
                  </Button>
                </>
              )}
              {tabValue === 1 && (
                <AttachmentsProtocol cdAtendCallCenter={CdProtocolos} />
              )}
            </Box>
          </Container>
        </Box>
      </Modal>

      <Modal
        open={openModalFormulario}
        onClose={handleCloseModalFormulario}
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
          <Button onClick={handleCloseModalFormulario}>
            <ReplyIcon /> Voltar
          </Button>
          <ProtocolForm cdAtendCallCenter={CdProtocolos} />
        </Box>
      </Modal>
    </>
  );
}

export default Protocols;
