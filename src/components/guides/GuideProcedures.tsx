import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

const paginationModel = { page: 0, pageSize: 5 };

export default function GuideProcedures(props: { guia: any }) {
  const [rowsItensGuias, setRowsItensGuias] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.guia) {
      buscarItensGuias();
    }
  }, [props.guia]);

  const buscarItensGuias = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/ItensGuia/${props.guia}`
      );

      const data = await response.json();
      console.log(data);
      const ItensTratados = data.itensGuia.map((b: any, index: number) => ({
        ...b,
        id: index + 1,
      }));

      console.log(ItensTratados);

      // O array está em "tramites"
      setRowsItensGuias(ItensTratados);
    } catch (error) {
      console.error("Erro ao buscar os itens:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const columnsItensGuias = [
    { field: "CD_PROCEDIMENTO", headerName: "Cd. Procedimento", width: 150 },
    { field: "DS_PROCEDIMENTO", headerName: "Ds. Procedimento", width: 300 },
    { field: "QT_SOLIC", headerName: "Qts. Solicitado", width: 120 },
    { field: "TP_STATUS", headerName: "Status", width: 140 },
  ];

  return (
    <Paper elevation={5} sx={{ p: 2 }}>
      <DataGrid
        rows={rowsItensGuias}
        columns={columnsItensGuias}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        loading={loading}
      />
    </Paper>
  );
}
