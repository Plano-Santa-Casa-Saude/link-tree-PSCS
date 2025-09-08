//-------------------MUI----------------------//
import { DataGrid } from "@mui/x-data-grid";
//-------------------HOOKERS----------------------//
import { useEffect, useState } from "react";
import formatDate from "../utils/utils";

type Copart = {
  CD_CONTRATO: number;
  CD_PLANO: number;
  DS_PLANO: string;
  CD_GRUPO_PROCEDIMENTO: number;
  DS_GRUPO_PROCEDIMENTO: string;
  DT_VIGENCIA: string;
  VALOR: number;
  id: number;
};

const paginationModel = { page: 0, pageSize: 5 };

function CurrentCopart(props: { contrato: string }) {
  const [loading, setLoading] = useState(false);
  const [rowsCopart, setCopartVigente] = useState<Copart[]>([]);

  useEffect(() => {
    if (props.contrato) {
      buscarCopart();
    }
  }, [props.contrato]);

  //----------------------------COLUNAS COPART--------------------------------//

  const columnsCopart = [
    { field: "DS_GRUPO_PROCEDIMENTO", headerName: "Procedimento", width: 200 },
    { field: "DT_VIGENCIA", headerName: "Dt. Vigência", width: 160 },
    { field: "VALOR", headerName: "Valor", width: 400 },
  ];

  //------------------------------ROTA COPART----------------------------------//

  const buscarCopart = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        //`http://10.201.0.39:3333/zelus/copart_vigente/${props.contrato}`
        `http://10.201.0.39:3333/zelus/copart_vigente/4993`
      );

      const data = await response.json();
      console.log("API bruta:", data);

      // Se vier matriz (array dentro de array), achata
      const copartArray = data.copart.flat();

      const CopartTratado = copartArray.map((b: any, index: number) => ({
        ...b,
        id: index + 1, // ou `${b.matricula}-${index}`
        DT_VIGENCIA: formatDate(b.DT_VIGENCIA),
        VALOR: b.VALOR.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
      }));

      console.log("CopartTratado:", CopartTratado);
      setCopartVigente(CopartTratado);
    } catch (error) {
      console.error("Erro ao buscar as copart:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataGrid
      rows={rowsCopart}
      columns={columnsCopart}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5]}
      sx={{ border: 0 }}
      loading={loading}
    />
  );
}

export default CurrentCopart;
