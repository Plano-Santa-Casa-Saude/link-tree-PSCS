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

//-------------------COMPONENTES---------------------//
import ProcessProtocol from "./processProtocol";
import AttachmentsProtocol from "./attachmentsProtocol";
//-------------------HOOKERS----------------------//
import { useEffect, useState } from "react";
import formatDate from "../utils/utils";
//--------------------STYLE---------------------//
import "../styles/StyleProtocols.css";

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
  const [open, setOpen] = useState(false);
  const [CdProtocolos, setCdProtocolos] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [displayTramites, setDisplayTramites] = useState(true);

  useEffect(() => {
    if (props.matricula) {
      buscarProtocolos();
    }
  }, [props.matricula]);

  //   const handleOpenModalProtocolos = () => setOpen(true);
  const handleCloseModalProtocolos = () => setOpen(false);
  const handleOpenModalProtocolos = (cdAtendCallCenter: string) => {
    setCdProtocolos(cdAtendCallCenter);
    setDisplayTramites(true);
    setOpen(true);
  };
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
        <Button onClick={() => handleOpenModalProtocolos(params.value)}>
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
        `http://localhost:3333/protocolos/${props.matricula}`
      );

      const data = await response.json();
      console.log(data); // aqui você vê o objeto completo: { total, page, limit, ... }

      const protocolosComId = data.protocolos.map((b: any, index: number) => ({
        ...b,
        id: index + 1, // ou `${b.matricula}-${index}`
        DATA_INICIO: formatDate(b.DATA_INICIO),
        DATA_TERMINO: formatDate(b.DATA_TERMINO),
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
      <Paper className="session-detail">
        <h2>Protocolos</h2>
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
        open={open}
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
                <ProcessProtocol cdAtendCallCenter={CdProtocolos} />
              )}
              {tabValue === 1 && (
                <AttachmentsProtocol cdAtendCallCenter={CdProtocolos} />
              )}
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  );
}

export default Protocols;
// function setLoading(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }
