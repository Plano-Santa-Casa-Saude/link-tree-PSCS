import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Campo } from "../common";

import{DependentsContract} from './index';

export default function DetailContract(props: { contrato: any }) {
  const [dadosContrato, setDadosContrato] = useState<dadosPessoais | null>(
    null
  );

  interface dadosPessoais {
    NM_RESPONSAVEL_FINANCEIRO: any;
    NR_CPF_CGC: any;
    DS_EMAIL: any;
    DS_EMAIL_NFE: any;
    NR_CEP: any;
    TP_LOGRADOURO: any;
    DS_ENDERECO_COBRANCA: any;
    NR_ENDERECO: any;
    DS_COMPLEMENTO: any;
    DS_BAIRRO: any;
    NM_CIDADE: any;
    NM_UF: any;
    DT_ULTIMO_REAJUSTE: any;
    DT_PROX_REAJUSTE: any;
  }

  const buscarDados = async () => {
    let dados: dadosPessoais;
    try {
      const response = await fetch(
        `http://10.201.0.39:3333/zelus/responsvel_financeiro/${props.contrato}`
      );
      const data = await response.json();
      const b = data.responsavelFinanceiro[0];

      dados = {
        NM_RESPONSAVEL_FINANCEIRO: b.NM_RESPONSAVEL_FINANCEIRO,
        NR_CPF_CGC: b.NR_CPF_CGC,
        DS_EMAIL: b.DS_EMAIL,
        DS_EMAIL_NFE: b.DS_EMAIL_NFE,
        NR_CEP: b.NR_CEP,
        TP_LOGRADOURO: b.TP_LOGRADOURO,
        DS_ENDERECO_COBRANCA: b.DS_ENDERECO_COBRANCA,
        NR_ENDERECO: b.NR_ENDERECO,
        DS_COMPLEMENTO: b.DS_COMPLEMENTO,
        DS_BAIRRO: b.DS_BAIRRO,
        NM_CIDADE: b.NM_CIDADE,
        NM_UF: b.NM_UF,
        DT_ULTIMO_REAJUSTE: b.DT_ULTIMO_REAJUSTE,
        DT_PROX_REAJUSTE: b.DT_PROX_REAJUSTE,
      };
      setDadosContrato(dados);
    } catch (error) {
      console.error("Erro ao buscar dados do beneficiário:", error);
    }
  };

  useEffect(() => {
    if (props.contrato) {
      buscarDados();
    }
  }, [props.contrato]);

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dados do Contrato
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={2} sx={{ mt: 2 }}>
        <Grid size={5}>
          <Campo
            label="Nome do Responsável Financeiro"
            valor={dadosContrato?.NM_RESPONSAVEL_FINANCEIRO || ""}
          />
        </Grid>
        <Grid size={3}>
          <Campo label="CPF" valor={dadosContrato?.NR_CPF_CGC || ""} />
        </Grid>
        <Grid size={8}></Grid>
        <Grid size={6}>
          <Campo label="Email" valor={dadosContrato?.DS_EMAIL || ""} />
        </Grid>
        <Grid size={6}>
          <Campo
            label="Email Nota Fiscal"
            valor={dadosContrato?.DS_EMAIL_NFE || ""}
          />
        </Grid>
       
        <Grid size={2}>
          <Campo label="CEP" valor={dadosContrato?.NR_CEP || ""} />
        </Grid>
        <Grid size={2}>
          <Campo
            label="Tipo Logradouro"
            valor={dadosContrato?.TP_LOGRADOURO || ""}
          />
        </Grid>
        <Grid size={4}>
          <Campo
            label="Endereço"
            valor={dadosContrato?.DS_ENDERECO_COBRANCA || ""}
          />
        </Grid>
        <Grid size={2}>
          <Campo label="Número" valor={dadosContrato?.NR_ENDERECO || ""} />
        </Grid>
        <Grid size={3}>
          <Campo
            label="Complemento"
            valor={dadosContrato?.DS_COMPLEMENTO || ""}
          />
        </Grid>
        <Grid size={4}>
          <Campo label="Bairro" valor={dadosContrato?.DS_BAIRRO || ""} />
        </Grid>
        <Grid size={4}>
          <Campo label="Cidade" valor={dadosContrato?.NM_CIDADE || ""} />
        </Grid>
        <Grid size={1}>
          <Campo label="UF" valor={dadosContrato?.NM_UF || ""} />
        </Grid>
        <Grid size={3}>
          <Campo
            label="Data Reajuste"
            valor={
              dadosContrato?.DT_ULTIMO_REAJUSTE
                ? new Date(dadosContrato.DT_ULTIMO_REAJUSTE).toLocaleDateString(
                    "pt-BR"
                  )
                : ""
            }
          />
        </Grid>
        <Grid size={3}>
          <Campo
            label="Data Proximo Reajuste"
            valor={
              dadosContrato?.DT_PROX_REAJUSTE
                ? new Date(dadosContrato.DT_PROX_REAJUSTE).toLocaleDateString(
                    "pt-BR"
                  )
                : ""
            }
          />
        </Grid>
        <Grid size={6} ></Grid>
        <Grid size={7} >
          <DependentsContract contrato={props.contrato} />
        </Grid>
      </Grid>
    </Paper>
  );
}