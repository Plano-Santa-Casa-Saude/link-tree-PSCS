import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";

interface Ocorrencia {
  NR_GUIA: number;
  USUARIO: string;
  DESCRICAO_USUARIO: string;
  CODIGO_OCORRENCIA: number;
  OCORRENCIA: string;
  DATA_INCLUSAO: string;
  OBSERVACAO: string;
  id: number;
}

export default function GuideOccurrences(props: { guia: any }) {
  const [ocorrencias, setOcorrencias] = useState<any[]>([null]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.guia) {
      buscarOcorrencias();
    }
  }, [props.guia]);

  const buscarOcorrencias = async () => {
    setLoading(true);
    try {
      const response = await fetch(
       `http://10.201.0.39:3333/OcorrenciasGuia/:guia`
       //`http://10.201.0.39:3333/OcorrenciasGuia/57044669`
      );

      const data = await response.json();
      setOcorrencias(data.Ocorrencias);
    } catch (error) {
      console.error("Erro ao buscar as ocorrencias:", error);
      setOcorrencias([]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        {ocorrencias.length > 0 ? (
          ocorrencias.map((b) => (
            <>
              <Paper key={b?.CODIGO_OCORRENCIA}  elevation={5} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6">
                  {new Date(b?.DATA_INCLUSAO).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Usuário Cadastro:
                </Typography>
                <Typography sx={{ fontSize: 15 }}>{b?.USUARIO}</Typography>
                <Typography sx={{ fontWeight: "bold" }}>Ocorrência:</Typography>
                <Typography sx={{ fontSize: 15 }}>{b?.OBSERVACAO}</Typography>
              </Paper>
            </>
          ))
        ) : (
          <Paper elevation={5} sx={{ p: 2 }}>
            Nenhuma ocorrência encontrada
          </Paper>
        )}
      </Box>
    </>
  );
}
