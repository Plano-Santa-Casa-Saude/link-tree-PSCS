//-------------------MUI----------------------//
import { Tooltip, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
//--------------------ICONES------------------------//
import FileDownloadIcon from "@mui/icons-material/FileDownload";

//-------------------HOOKERS----------------------//
import { useEffect, useState } from "react";
import formatDate from "../utils/utils";

const paginationModel = { page: 0, pageSize: 5 };

function AttachmentsProtocol(props: { cdAtendCallCenter: any }) {
  const [loading, setLoading] = useState(false);
  const [rowsAnexos, setRowsAnexos] = useState();

  useEffect(() => {
    if (props.cdAtendCallCenter) {
      buscarAnexos();
    }
  }, [props.cdAtendCallCenter]);

  //----------------------------COLUNAS ANEXOS--------------------------------//

  const columnsAnexos = [
    { field: "DS_ARQUIVO", headerName: "Ds. anexo", width: 350 },
    { field: "DH_CADASTRO_ANEXO", headerName: "Dt. Anexo", width: 160 },
    {
      field: "DS_CAMINHO",
      headerName: "Anexo",
      width: 200,
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
            <FileDownloadIcon
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

  //------------------------------ROTA ANEXOS----------------------------------//

  const buscarAnexos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/anexos/${props.cdAtendCallCenter}`
        //`http://10.201.0.39:3333/anexos/266243`
      );

      const data = await response.json();
      console.log(data); // aqui você vê o objeto completo: { total, page, limit, ... }

      const AnexosTratados = data.anexos.map((b: any, index: number) => ({
        ...b,
        id: index + 1, // ou `${b.matricula}-${index}`
        DH_CADASTRO_ANEXO: formatDate(b.DH_CADASTRO_ANEXO),
      }));

      // O array está em "tramites"
      setRowsAnexos(AnexosTratados);
    } catch (error) {
      console.error("Erro ao buscar os anexos:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataGrid
      rows={rowsAnexos}
      columns={columnsAnexos}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      loading={loading}
    />
  );
}

export default AttachmentsProtocol;
