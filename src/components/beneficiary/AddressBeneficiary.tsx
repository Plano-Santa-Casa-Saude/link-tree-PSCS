import { Paper, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Campo } from "../common";

export default function AddressBeneficiary(props: { matricula: any }) {
  const [dadosPessoais, setDadosPessoais] = useState<dadosPessoais | null>(
    null
  );

  interface dadosPessoais {
    NR_CEP: any;
    TP_LOGRADOURO: any;
    DS_ENDERECO: any;
    NR_ENDERECO: any;
    DS_COMPLEMENTO: any;
    DS_BAIRRO: any;
    NM_CIDADE: any;
    NM_UF: any;
  }
  const buscarDados = async () => {
    let dados: dadosPessoais;
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/dadosUsuario/${props.matricula}`
      );
      const data = await response.json();
      const b = data.beneficiario[0];

      dados = {
        NR_CEP: b.NR_CEP,
        TP_LOGRADOURO: b.TP_LOGRADOURO,
        DS_ENDERECO: b.DS_ENDERECO,
        NR_ENDERECO: b.NR_ENDERECO,
        DS_COMPLEMENTO: b.DS_COMPLEMENTO,
        DS_BAIRRO: b.DS_BAIRRO,
        NM_CIDADE: b.NM_CIDADE,
        NM_UF: b.NM_UF,
      };
      setDadosPessoais(dados);
    } catch (error) {
      console.error("Erro ao buscar dados do beneficiário:", error);
    }
  };

  useEffect(() => {
    if (props.matricula) {
      buscarDados();
    }
  }, [props.matricula]);

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Endereço Residencial
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={2} sx={{ mt: 2 }}>
        <Grid size={2}>
          <Campo label="CEP" valor={dadosPessoais?.NR_CEP || ""} />
        </Grid>
        <Grid size={2}>
          <Campo
            label="Tipo Logradouro"
            valor={dadosPessoais?.TP_LOGRADOURO || ""}
          />
        </Grid>
        <Grid size={4}>
          <Campo label="Endereço" valor={dadosPessoais?.DS_ENDERECO || ""} />
        </Grid>
        <Grid size={2}>
          <Campo label="Número" valor={dadosPessoais?.NR_ENDERECO || ""} />
        </Grid>
        <Grid size={2}></Grid>
        <Grid size={3}>
          <Campo label="Complemento" valor={dadosPessoais?.DS_COMPLEMENTO || ""} />
        </Grid>
        <Grid size={3}>
          <Campo label="Bairro" valor={dadosPessoais?.DS_BAIRRO || ""} />
        </Grid>
        <Grid size={4}>
          <Campo label="Cidade" valor={dadosPessoais?.NM_CIDADE || ""} />
        </Grid>
        <Grid size={1}>
          <Campo label="UF" valor={dadosPessoais?.NM_UF || ""} />
        </Grid>
      </Grid>
    </Paper>
  );
}
