//-------------------MUI----------------------//
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
//--------------------ICONES------------------------//
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
//-------------------HOOKERS----------------------//
import { useEffect, useState } from "react";

export default function ProtocolForm(props: { cdAtendCallCenter: any }) {
  const [TramitesAbertos, setTramitesAbertos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.cdAtendCallCenter) {
      buscarTramites();
    }
  }, [props.cdAtendCallCenter]);

  //------------------------------ROTA TRAMITES----------------------------------//
  const buscarTramites = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/zelus/tramitesAbertos/${props.cdAtendCallCenter}`
      );

      const data = await response.json();

      console.log(data.Tramites);
      // O array está em "tramites"
      setTramitesAbertos(data.Tramites);
    } catch (error) {
      console.error("Erro ao buscar os tramites:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {TramitesAbertos.length > 0 && (
        <>
          <h2>
            Encerrar Tramite aberto
            <CheckIcon />
          </h2>
          <Grid container rowSpacing={2} sx={{ margin: 2 }} spacing={2}>
            <Grid size={3}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="select-tramites-label">Tramite</InputLabel>
                <Select
                  labelId="select-tramites-label"
                  id="select-tramites"
                  label="Tramite"
                >
                  <MenuItem value="Selecione o tramite">
                    Selecione o tramite
                  </MenuItem>
                  {TramitesAbertos.map((item, index) => (
                    <MenuItem key={index} value={item.CD_TRAMITE_PROTOCOLO}>
                      {item.CD_TRAMITE_PROTOCOLO}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <TextField
                id="text-justificativa"
                label="Justificativa"
                multiline
                fullWidth
                rows={4}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                id="text-justificativa-atraso"
                label="Justificativa Atraso"
                multiline
                fullWidth
                rows={4}
              />
            </Grid>
            <Grid size={4}>
              <TextField
                id="text-servico-principal"
                label="Serviço Principal"
                fullWidth
              />
            </Grid>
            <Grid size={4}>
              <TextField id="text-motivo" label="Motivo" fullWidth />
            </Grid>
            <Grid size={4}></Grid>
            <Grid size={6}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="select-tipos">Tipos</InputLabel>
                <Select labelId="select-tipos" id="select-tipos" label="Tipo">
                  <MenuItem value="Selecione o tipo">Selecione o tipo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={2}>
              <FormControl variant="standard" fullWidth>
                <InputLabel id="select-sla">SLA</InputLabel>
                <Select labelId="select-sla" id="select-sla" label="SLA">
                  <MenuItem value="Selecione o sla">Selecione o sla</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={4}></Grid>
            <Grid size={4}>
              <TextField id="text-autorizador" label="Autorizador" fullWidth />
            </Grid>
          </Grid>
        </>
      )}

      <h2>
        Novo Tramite
        <AddIcon />
      </h2>
      <Grid container rowSpacing={2} sx={{ margin: 2 }} spacing={2}>
        <Grid size={4}>
          <TextField id="text-autorizador" label="Autorizador" fullWidth />
        </Grid>
        <Grid size={2}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="select-sla">SLA</InputLabel>
            <Select labelId="select-sla" id="select-sla" label="SLA">
              <MenuItem value="Selecione o sla">Selecione o sla</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
          <TextField
            id="text-justificativa"
            label="Justificativa"
            multiline
            fullWidth
            rows={4}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            id="text-justificativa-atraso"
            label="Justificativa Atraso"
            multiline
            fullWidth
            rows={4}
          />
        </Grid>
      </Grid>
      <Box sx={{alignContent: "end"}}  >
        <Button variant="contained">
          Salvar
          <SaveIcon />
        </Button>
      </Box>
    </>
  );
}
