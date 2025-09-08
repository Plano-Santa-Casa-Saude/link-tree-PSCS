//-------------------MUI----------------------//
import { Paper, Typography, Grid, Button } from "@mui/material";
//-------------------HOOKERS----------------------//
import { useEffect, useState } from "react";
import formatDate from "../utils/utils";
import { DataGrid } from "@mui/x-data-grid";
const paginationModel = { page: 0, pageSize: 5 };

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

function UserAttention(props: { matricula: any }) {
  const [rowsAlertas, setRowsAlertas] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.matricula) {
      buscarAlertas();
    }
  }, [props.matricula]);

  //----------------------------COLUNAS USUARIO ATENÇÃO--------------------------------//

  const columnsAlertas = [
    { field: "DS_MOTIVO_ATENCAO", headerName: "Motivo", width: 160 },
    { field: "DS_DESCRICAO", headerName: "Ds. Inclução", width: 160 },
    { field: "DT_INCLUSAO", headerName: "Dt. Inclução", width: 160 },
    { field: "CD_USUARIO_CADASTRO", headerName: "Usu. Inclução", width: 160 },
    { field: "DS_INATIVACAO", headerName: "Ds. Inativação", width: 160 },
    { field: "DT_INATIVACAO", headerName: "Dt. Inativação", width: 160 },
    { field: "CD_USUARIO_INATIVACAO", headerName: "Usu. Inativação", width: 160 },
  ];

  //------------------------------ROTA ANEXOS----------------------------------//

  const buscarAlertas = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/zelus/usuario_atencao/${props.matricula}`
        //`http://10.201.0.39:3333/anexos/266243`
      );

      const data = await response.json();
      console.log(data); // aqui você vê o objeto completo: { total, page, limit, ... }

      const AlertasTratado = data.usuAtencao.map((b: any, index: number) => ({
        ...b,
        id: index + 1, // ou `${b.matricula}-${index}`
        DT_INCLUSAO: formatDate(b.DT_INCLUSAO),
        DT_INATIVACAO: formatDate(b.DT_INATIVACAO),
        //DH_CADASTRO_ANEXO: formatDate(b.DH_CADASTRO_ANEXO),
      }));

      // O array está em "tramites"
      setRowsAlertas(AlertasTratado);
    } catch (error) {
      console.error("Erro ao buscar as Alertas:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Usuario Atenção
      </Typography>
      <DataGrid
        rows={rowsAlertas}
        columns={columnsAlertas}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0, marginTop: 2 }}
        loading={loading}
      />
    </Paper>
  );
}

export default UserAttention;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
