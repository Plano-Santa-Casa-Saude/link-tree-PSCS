import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function GuideLocks(props: { guia: any }) {
  const [bloqueios, setBloqueios] = useState<any[]>([null]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.guia) {
      buscarBloqueios();
    }
  }, [props.guia]);

  const buscarBloqueios = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/BloqueiosGuia/:guia`
        //`http://10.201.0.39:3333/BloqueiosGuia/87678239`
      );

      const data = await response.json();
      setBloqueios(data.Bloqueios);
    } catch (error) {
      console.error("Erro ao buscar as bloqueios:", error);
      setBloqueios([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        {bloqueios.length > 0 ? (
          bloqueios.map((b) => (
            <>
              <Paper
                key={b?.CODIGO_OCORRENCIA}
                elevation={5}
                sx={{ p: 2, mb: 2 }}
              >
                <Typography sx={{ fontWeight: "bold" }}>Iten da Guia:</Typography>
                <Typography sx={{ fontSize: 15 }}>{b?.CD_ITGUIA}</Typography>
                <Typography sx={{ fontWeight: "bold" }}>Procedimento:</Typography>
                <Typography sx={{ fontSize: 15,  whiteSpace: "pre-line" }}>{b?.CD_PROCEDIMENTO + " - " + b?.DS_PROCEDIMENTO}</Typography>
                <Typography sx={{ fontWeight: "bold" }}>Motivo:</Typography>
                <Typography sx={{ fontSize: 15, whiteSpace: "pre-line" }} >{b?.CD_MOTIVO + " - " + b?.DS_ERRO }</Typography>

              </Paper>
            </>
          ))
        ) : (
          <Paper elevation={5} sx={{ p: 2 }}>
            Nenhum bloqueio encontrada
          </Paper>
        )}
      </Box>
    </>
  );
}
