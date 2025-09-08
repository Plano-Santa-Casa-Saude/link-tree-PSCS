//-------------------MUI----------------------//
import {
  Paper,
  Modal,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
//--------------------ICONES------------------------//
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
//-------------------HOOKERS----------------------//
import { useEffect, useState } from "react";
import formatDate from "../utils/utils";
//------------------COMPONENTES-------------------//
import DetailMonthlyFee from "./detailMonthlyFee";
import CurrentCopart from "./currentCopart";

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

function Financial(props: { contrato: any,matricula: any }) {
  const anoAtual = new Date().getFullYear();
  const anos = Array.from({ length: 6 }, (_, i) => anoAtual - i);

  const [loading, setLoading] = useState(false);
  const [rowsMensalidades, setRowsMensalidades] = useState();
  const [openModalMensalidades, setOpenModalMensalidades] = useState(false);
  const [openModalCopart, setOpenModalCopart] = useState(false);
  const [openModalImpostoRenda, setOpenModalImpostoRenda] = useState(false);
  const [anoImpostoRenda, setAnoImpostoRenda] = useState(anoAtual);
  const [CdMensalidade, setCdMensalidade] = useState("");

  useEffect(() => {
    if (props.contrato) {
      buscarMensalidades();
    }
  }, [props.contrato]);

  const handleCloseModalMensalidades = () => setOpenModalMensalidades(false);
  const handleOpenModalMensalidades = (PcdMensalidade: any) => {
    setCdMensalidade(PcdMensalidade);
    setOpenModalMensalidades(true);
  };
  const handleCloseModalCopart = () => setOpenModalCopart(false);
  const handleOpenModalCopart = () => setOpenModalCopart(true);
  const handleCloseModalImpostoRenda = () => setOpenModalImpostoRenda(false);
  const handleOpenModalImpostoRenda = () => setOpenModalImpostoRenda(true);
  const handleChangeImpostoRenda = (AnoInput: any) => {
    setAnoImpostoRenda(AnoInput);
  };
  //----------------------------COLUNAS MENSALIDADES--------------------------------//

  const columnsMensalidades = [
    { field: "CD_CONTRATO", headerName: "Nr. Contrato", width: 160 },
    { field: "CD_MENS_CONTRATO", headerName: "Cd. Titulo", width: 160 },
    { field: "STATUS", headerName: "Status", width: 160 },
    { field: "NR_MES", headerName: "Mês", width: 160 },
    { field: "NR_ANO", headerName: "Ano", width: 160 },
    {
      field: "DT_VENCIMENTO_ORIGINAL",
      headerName: "Vnct. Original",
      width: 160,
    },
    { field: "DT_VENCIMENTO", headerName: "Vnct. Atualizado", width: 160 },
    { field: "DT_RECEBIMENTO", headerName: "Dt. Recebido", width: 160 },
    { field: "VL_COBRADO", headerName: "Vl. Cobrado", width: 160 },
    { field: "VL_RECEBIDO", headerName: "Vl. Recebido", width: 160 },
    { field: "ATRASO", headerName: "Dias de atraso", width: 160 },
    {
      field: "CD_MENSALIDADE",
      headerName: "Opções",
      width: 90,
      renderCell: (params: any) => (
        <Button onClick={() => handleOpenModalMensalidades(params.value)}>
          <RemoveRedEyeIcon />
        </Button>
      ),
    },
  ];

  //------------------------------ROTA ANEXOS----------------------------------//

  const buscarMensalidades = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/zelus/mensalidades/${props.contrato}`
        //`http://10.201.0.39:3333/anexos/266243`
      );

      const data = await response.json();
      console.log(data); // aqui você vê o objeto completo: { total, page, limit, ... }

      const MensalidadesTratados = data.mensalidades.map(
        (b: any, index: number) => ({
          ...b,
          id: index + 1, // ou `${b.matricula}-${index}`
          DT_VENCIMENTO_ORIGINAL: formatDate(b.DT_VENCIMENTO_ORIGINAL),
          DT_VENCIMENTO: formatDate(b.DT_VENCIMENTO),
          DT_RECEBIMENTO: formatDate(b.DT_RECEBIMENTO),
          VL_COBRADO: b.VL_COBRADO.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          VL_RECEBIDO: b.VL_RECEBIDO
            ? b.VL_RECEBIDO.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "R$ 0,00",
          CD_MENSALIDADE: b.CD_MENS_CONTRATO,
          //DH_CADASTRO_ANEXO: formatDate(b.DH_CADASTRO_ANEXO),
        })
      );

      // O array está em "tramites"
      setRowsMensalidades(MensalidadesTratados);
    } catch (error) {
      console.error("Erro ao buscar as mensalidades:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Financeiro
        </Typography>
        <Grid container sx={{ marginTop: 2 }} rowSpacing={1} columnSpacing={1}>
          <Grid size="auto">
            <Button onClick={handleOpenModalCopart} variant="contained">
              Coparticipaçao Vigente
            </Button>
          </Grid>
          <Grid size="auto">
            <Button onClick={handleOpenModalImpostoRenda} variant="contained">
              Imposto de Renda
            </Button>
          </Grid>
        </Grid>
        <DataGrid
          rows={rowsMensalidades}
          columns={columnsMensalidades}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, marginTop: 2 }}
          loading={loading}
        />
      </Paper>
      <Modal
        open={openModalMensalidades}
        onClose={handleCloseModalMensalidades}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...styleModal, width: "70%" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Mensalidade - {CdMensalidade}
          </Typography>
          <DetailMonthlyFee mensalidade={CdMensalidade} />
          <Button
            href={`http://10.201.0.20/mvsaudeweb/ServletBoleto?portal=true&mensContrato=${CdMensalidade}&cdMultiEmpresa=1&cdContrato=${props.contrato}&tpBoleto=3&qpag=N`}
            target="_blank"
            variant="contained"
          >
            Detalhe copart
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openModalCopart}
        onClose={handleCloseModalCopart}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...styleModal, width: "60%" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Coparticipação vigente
          </Typography>
          <CurrentCopart contrato={props.contrato} />
        </Box>
      </Modal>

      <Modal
        open={openModalImpostoRenda}
        onClose={handleCloseModalImpostoRenda}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...styleModal, width: "30%" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Imposto de Renda
          </Typography>

          <FormControl sx={{ marginTop: 3, marginBottom: 3 }} fullWidth>
            <InputLabel id="ano-label">Ano</InputLabel>
            <Select labelId="ano-label" id="ano-select"  onChange={(e) => setAnoImpostoRenda(Number(e.target.value))} label="Ano">
              {anos.map((ano) => (
                <MenuItem key={ano} value={ano}>
                  {ano}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button href={`http://10.201.0.20/mvsaudeweb/ServletBoleto?portal=true&tpBoleto=6&pMesIni=01/01/${anoImpostoRenda}&pMesFim=31/12/${anoImpostoRenda}&cdMatricula=${props.matricula}&cdMultiEmpresa=1&pAno=${anoImpostoRenda}`} target="_blank" variant="contained">Buscar</Button>
        </Box>
      </Modal>
    </>
  );
}

export default Financial;
