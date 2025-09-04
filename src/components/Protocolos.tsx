import { Paper, Container, Tooltip, IconButton } from "@mui/material";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useEffect, useState} from "react";
import { DataGrid } from "@mui/x-data-grid";

import "../styles/StyleProtocols.css";

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();

  const horas = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

const columns = [
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
      <Tooltip title={params.value}>
        <IconButton>
          <ChatBubbleIcon />
        </IconButton>
      </Tooltip>
    ),
  },
  {
    field: "CONSIDERACAO",
    headerName: "Consideração",
    width: 150,
    renderCell: (params: any) => (
      <Tooltip title={params.value}>
        <IconButton>
          <ChatBubbleIcon />
        </IconButton>
      </Tooltip>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

function Protocols(props: { matricula: any }) {
  const [rows, setRows] = useState();
  const [loading, setLoading] = useState(false);

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
        
      }));

      // O array está em "protocolos"
      setRows(protocolosComId);
    } catch (error) {
      console.error("Erro ao buscar os protocolos:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.matricula) {
      buscarProtocolos();
    }
  }, [props.matricula]);

  return (
    <Paper className="session-detail">
      <h2>Protocolos</h2>
      <Container sx={{ mt: 4 }}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          loading={loading}
        />
      </Container>
    </Paper>
  );
}

export default Protocols;
