//-------------------MUI----------------------//
import { Tooltip, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
//--------------------ICONES------------------------//
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
//-------------------HOOKERS----------------------//
import { useEffect, useState } from "react";
import formatDate from "../../utils/utils";

const paginationModel = { page: 0, pageSize: 5 };

function ProcessProtocol(props: { cdAtendCallCenter: any; dtTermino: any }) {
  const [rowsTramites, setRowsTramites] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.cdAtendCallCenter) {
      buscarTramites();
    }
  }, [props.cdAtendCallCenter]);
  //----------------------------COLUNAS TRAMITES--------------------------------//
  const columnsTramites = [
    { field: "CD_ATEND_CALL_CENTER", headerName: "Cd. Tramite", width: 100 },
    { field: "NM_AUTORIZADOR", headerName: "Nm. Autorizador", width: 260 },
    { field: "DT_INICIO_TRAMITE", headerName: "Dt. Inicio", width: 140 },
    { field: "DT_FINAL_TRAMITE", headerName: "Dt. Fim", width: 140 },
    {
      field: "DS_JUSTIFICATIVA_TRAMITE",
      headerName: "Descrição",
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
  ];

  //------------------------------ROTA TRAMITES----------------------------------//

  const buscarTramites = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/tramites/${props.cdAtendCallCenter}`
      );

      const data = await response.json();

      const TramitesTratados = data.tramites.map((b: any, index: number) => ({
        ...b,
        id: index + 1, // ou `${b.matricula}-${index}`
        DT_INICIO_TRAMITE: formatDate(b.DT_INICIO_TRAMITE),
        DT_FINAL_TRAMITE: b.DT_FINAL_TRAMITE
          ? new Date(b.DT_FINAL_TRAMITE).toLocaleDateString("pt-BR")
          : "Aberto",
      }));

      // O array está em "tramites"
      setRowsTramites(TramitesTratados);
    } catch (error) {
      console.error("Erro ao buscar os tramites:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={5} sx={{ p: 2 }}>
      <DataGrid
        rows={rowsTramites}
        columns={columnsTramites}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        loading={loading}
      />
    </Paper>
  );
}

export default ProcessProtocol;
