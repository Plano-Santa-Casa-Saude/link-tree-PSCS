//-------------------HOOKERS----------------------//
import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
const paginationModel = { page: 0, pageSize: 5 };

export default function ServiceProgram(props: { matricula: any }) {
  const [rowsProgramas, setRowsProgramas] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.matricula) {
      buscarProgramas();
    }
  }, [props.matricula]);

  //----------------------------COLUNAS USUARIO ATENÇÃO--------------------------------//

  const columnsProgramsas = [
    { field: "CD_PROGRAMA_ATENDIMENTO", headerName: "Código", width: 100 },
    { field: "DS_PROGRAMA_ATENDIMENTO", headerName: "Descrição", width: 275 },
    {
      field: "DT_VIGENCIA_INICIO",
      headerName: "Dt. Inicio Vigência",
      width: 160,
    },
  ];

  //------------------------------ROTA ANEXOS----------------------------------//

  const buscarProgramas = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/zelus/programaAtendimento/${props.matricula}`
      );

      const data = await response.json();

      const ProgramasTratado = data.Programa.map((b: any, index: number) => ({
        ...b,
        id: index + 1, // ou `${b.matricula}-${index}`
        DT_VIGENCIA_INICIO: new Date(b.DT_VIGENCIA_INICIO).toLocaleDateString(
          "pt-BR"
        ),
      }));

      // O array está em "tramites"
      setRowsProgramas(ProgramasTratado);
    } catch (error) {
      console.error("Erro ao buscar os Programas:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 0.5 }}>
          Progamas de Atendimento
        </Typography>
        <DataGrid
          rows={rowsProgramas}
          columns={columnsProgramsas}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, marginTop: 2 }}
          loading={loading}
        />
      </Box>
    </>
  );
}
