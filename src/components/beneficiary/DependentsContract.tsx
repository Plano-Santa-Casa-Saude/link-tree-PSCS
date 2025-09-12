//-------------------HOOKERS----------------------//
import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
const paginationModel = { page: 0, pageSize: 5 };

export default function DependentsContract(props: { contrato: any }) {
  const [rowsDependents, setRowsDependents] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.contrato) {
      buscarDependents();
    }
  }, [props.contrato]);

  //----------------------------COLUNAS USUARIO ATENÇÃO--------------------------------//

  const columnsDependents = [
    { field: "CD_MATRICULA", headerName: "Matrícula", width: 150 },
    { field: "NM_SEGURADO", headerName: "Nome", width: 300 },
    {
      field: "SN_ATIVO",
      headerName: "Ativo",
      width: 80,
    },
  ];

  //------------------------------ROTA ANEXOS----------------------------------//

  const buscarDependents = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/zelus/dependentes/${props.contrato}`
      );

      const data = await response.json();

      const DependentsTratado = data.Dependentes.map(
        (b: any, index: number) => ({
          ...b,
          id: index + 1, // ou `${b.matricula}-${index}`
        })
      );

      // O array está em "tramites"
      setRowsDependents(DependentsTratado);
    } catch (error) {
      console.error("Erro ao buscar os Dependentes:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 0.5 }}>
          Dependentes
        </Typography>
        <DataGrid
          rows={rowsDependents}
          columns={columnsDependents}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, marginTop: 2 }}
          loading={loading}
        />
      </Box>
    </>
  );
}
