//-------------------MUI----------------------//
import { DataGrid } from "@mui/x-data-grid";

//-------------------HOOKERS----------------------//
import { useEffect, useState } from "react";
import formatDate from "../utils/utils";

const paginationModel = { page: 0, pageSize: 5 };

function DetailMonthlyFee(props: { mensalidade: any }) {
  const [loading, setLoading] = useState(false);
  const [rowsItens, setRowsItens] = useState();

  useEffect(() => {
    if (props.mensalidade) {
      buscarItens();
    }
  }, [props.mensalidade]);

  //----------------------------COLUNAS ITENS--------------------------------//

  const columnsItens = [
    { field: "DT_EMISSAO", headerName: "Dt. Emissão", width: 150 },
    { field: "DS_LCTO_MENSALIDADE", headerName: "Ds. Lançamento", width: 360 },
    { field: "QT_LANCAMENTO", headerName: "Qts. Lançamento", width: 160 },
    { field: "VL_LANCAMENTO", headerName: "Vl. Lançamento", width: 160 },
  ];

  //------------------------------ROTA ITENS----------------------------------//

  const buscarItens = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/zelus/itens_mensalidade/${props.mensalidade}`
      );

      const data = await response.json();
      console.log(data); // aqui você vê o objeto completo: { total, page, limit, ... }

      const ItensTratados = data.Itens.map((b: any, index: number) => ({
        ...b,
        id: index + 1, // ou `${b.matricula}-${index}`
        DT_EMISSAO: formatDate(b.DT_EMISSAO),
        VL_LANCAMENTO: b.VL_LANCAMENTO.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      }));

      // O array está em "tramites"
      setRowsItens(ItensTratados);
    } catch (error) {
      console.error("Erro ao buscar os itens:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataGrid
      rows={rowsItens}
      columns={columnsItens}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0 }}
      loading={loading}
    />
  );
}

export default DetailMonthlyFee;
