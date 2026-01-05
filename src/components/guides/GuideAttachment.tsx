import { Box, Button, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function GuideAttachment(props: { guia: any }) {
  const [anexos, setAnexos] = useState<any[]>([null]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.guia) {
      buscarAnexos();
    }
  }, [props.guia]);

  const buscarAnexos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        //`http://10.201.0.39:3333/AnexosGuia/:guia`
        `http://10.201.0.39:3333/AnexosGuia/87678239`
      );

      const data = await response.json();
      setAnexos(data.Anexos);
    } catch (error) {
      console.error("Erro ao buscar os anexos:", error);
      setAnexos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        {anexos.length > 0 ? (
          anexos.map((b) => (
            <>
              <Paper key={b?.CD_GUIA_ANEXO} elevation={5} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ flexDirection: "row", fontSize: 15 }}>
                  <Button
                    variant="text"
                    component="a"
                    target="_blank"
                    href="\\10.201.21.2\fnfi_itau\guias_anexos\586\87678239\19aec1bd16a9ac4703b7aca9448828e6d4.jpg"
                  >
                    {b?.DS_ARQUIVO}
                    <FileDownloadIcon></FileDownloadIcon>
                  </Button>
                </Box>
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
