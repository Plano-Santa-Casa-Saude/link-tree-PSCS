import { Paper, Grid, Typography, Popover, Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Campo } from "../common";

import {ServiceProgram} from './index'

import InfoIcon from "@mui/icons-material/Info";

export default function DetailBeneficiary(props: { matricula: any }) {
  const [dadosPessoais, setDadosPessoais] = useState<dadosPessoais | null>(
    null
  );

  const [carencias, setCarencias] = useState<any[]>([]);
  const [SNcarencias, setSNCarencias] = useState(0);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  interface dadosPessoais {
    nome: string;
    nomeSocial: string;
    cpf: string;
    sexo: string;
    plano: string;
    tipoBeneficiario: string;
    tipoContrato: string;
    dataAdesao: string;
    tipoAcomodacao: string;
    snAtivo: string;
    motivoCancelamento: string;
    dataDesligamento: string;
    dataNascimento: string;
    idade: number;
    nomeMae: string;
    possuiCoparticipacao: string;
    nomeEmpresa: string;
    codigoContrato: number;
    snSuspenso: string;
    email: string;
    telefone: string;
    celular: string;
  }

  interface carencias {
    CD_GRU_CARENCIA: any;
    DS_GRU_CARENCIA: any;
    DS_GRU_CARENCIA_ABREV: any;
    CD_MATRICULA: any;
    DT_VENCIMENTO: any;
    DIAS_RESTANTES: any;
    DS: any;
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
        nome: b.NM_SEGURADO,
        nomeSocial: b.NM_SOCIAL,
        cpf: b.NR_CPF,
        sexo: b.TP_SEXO,
        plano: b.DS_PLANO,
        tipoBeneficiario: b.TP_USUARIO,
        tipoContrato: b.TP_CONTRATO,
        dataAdesao: b.ADESAO,
        tipoAcomodacao: b.DS_TIP_ACOMODACAO,
        snAtivo: b.SN_ATIVO,
        motivoCancelamento: b.MOT_DESLIGAMENTO,
        dataDesligamento: b.DT_DESLIGAMENTO,
        dataNascimento: b.DT_NASCIMENTO,
        idade: b.IDADE,
        nomeMae: b.NM_MAE,
        possuiCoparticipacao: b.SN_COPART,
        nomeEmpresa: b.DS_EMPRESA,
        codigoContrato: b.CD_CONTRATO,
        snSuspenso: b.SUSPENSO,
        email: b.DS_EMAIL,
        telefone: b.NR_TELEFONE,
        celular: b.NR_CELULAR,
      };
      localStorage.setItem("contrato", dados.codigoContrato.toString());
      setDadosPessoais(dados);
    } catch (error) {
      console.error("Erro ao buscar dados do beneficiário:", error);
    }
  };

  const buscarCarencia = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/zelus/carencias/${props.matricula}`
      );
      const data = await response.json();
      console.log(data);
      const CarenciasTratados = data.Carencias.map((b: any, index: number) => ({
        ...b,
        id: index + 1, // ou `${b.matricula}-${index}`
        DS:
          b.DS_GRU_CARENCIA +
          " - " +
          new Date(b.DT_VENCIMENTO).toLocaleDateString("pt-BR") +
          " - " +
          Math.floor(b.DIAS_RESTANTES) +
          " dias",
      }));
      console.log(CarenciasTratados);
      setSNCarencias(CarenciasTratados.length);
      setCarencias(CarenciasTratados);
    } catch (error) {
      console.error("Erro ao buscar dados do beneficiário:", error);
    }
  };

  useEffect(() => {
    if (props.matricula) {
      buscarDados();
      buscarCarencia();
    }
  }, [props.matricula]);

  return (
    <>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dados Pessoais
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={2} sx={{ mt: 2 }}>
          <Grid size={3}>
            <Campo label="Matrícula" valor={props.matricula || "N/A"} />
          </Grid>
          <Grid size={2}>
            <Campo label="CPF" valor={dadosPessoais?.cpf || ""}></Campo>
          </Grid>
          <Grid size={7}></Grid>
          <Grid size={4}>
            <Campo label="Nome" valor={dadosPessoais?.nome || "N/A"} />
          </Grid>
          <Grid size={4}>
            <Campo
              label="Nome Social"
              valor={dadosPessoais?.nomeSocial || ""}
            ></Campo>
          </Grid>
          <Grid size={3}>
            <Campo
              label="Sexo"
              valor={
                dadosPessoais?.sexo === "M"
                  ? "MASCULINO"
                  : dadosPessoais?.sexo === "F"
                  ? "FEMININO"
                  : ""
              }
            ></Campo>
          </Grid>
          <Grid size={4}>
            <Campo label="Plano" valor={dadosPessoais?.plano || ""}></Campo>
          </Grid>
          <Grid size={2}>
            <Campo
              label="Tipo beneficiário"
              valor={
                dadosPessoais?.tipoBeneficiario === "T"
                  ? "TITULAR"
                  : "DEPENDENTE"
              }
            ></Campo>
          </Grid>
          <Grid size={2}>
            <Campo
              label="Tipo Contrato"
              valor={dadosPessoais?.tipoContrato || ""}
            ></Campo>
          </Grid>
          <Grid size={2}>
            <Campo
              label="Data adesão:"
              valor={
                dadosPessoais?.dataAdesao
                  ? new Date(dadosPessoais.dataAdesao).toLocaleDateString(
                      "pt-BR"
                    )
                  : ""
              }
            ></Campo>
          </Grid>
          <Grid size={3}>
            <Campo
              label="Tipo Acomodação"
              valor={dadosPessoais?.tipoAcomodacao || ""}
            ></Campo>
          </Grid>
          <Grid size={1}>
            <Campo
              label="Ativo"
              valor={dadosPessoais?.snAtivo === "S" ? "Sim" : "Não"}
            ></Campo>
          </Grid>
          <Grid size={4}>
            <Campo
              label="Motivo do Cancelamento"
              valor={dadosPessoais?.motivoCancelamento || ""}
            ></Campo>
          </Grid>
          <Grid size={2}>
            <Campo
              label="Data Desligamento"
              valor={
                dadosPessoais?.dataDesligamento
                  ? new Date(dadosPessoais.dataDesligamento).toLocaleDateString(
                      "pt-BR"
                    )
                  : ""
              }
            ></Campo>
          </Grid>
          <Grid size={2}></Grid>
          <Grid size={2}>
            <Campo
              label="Data de Nascimento"
              valor={
                dadosPessoais?.dataNascimento
                  ? new Date(dadosPessoais.dataNascimento).toLocaleDateString(
                      "pt-BR"
                    )
                  : ""
              }
            ></Campo>
          </Grid>
          <Grid size={1}>
            <Campo label="Idade" valor={dadosPessoais?.idade || ""}></Campo>
          </Grid>
          <Grid size={4}>
            <Campo
              label="Nome da Mãe"
              valor={dadosPessoais?.nomeMae || ""}
            ></Campo>
          </Grid>
          <Grid size={4}>
            <Campo
              label="Possui Coparticipação"
              valor={
                dadosPessoais?.possuiCoparticipacao === "S" ? "SIM" : "NÃO"
              }
            ></Campo>
          </Grid>
          <Grid size={5}>
            <Campo
              label="Nome da Empresa"
              valor={dadosPessoais?.nomeEmpresa || ""}
            ></Campo>
          </Grid>
          <Grid size={2}>
            <Campo
              label="Código do Contrato"
              valor={dadosPessoais?.codigoContrato || ""}
            ></Campo>
          </Grid>
          <Grid size={5}></Grid>
          <Grid size={2}>
            <Campo
              label="Carência"
              valor={SNcarencias > 0 ? "Sim" : "Não"}
            ></Campo>
          </Grid>
          {SNcarencias > 0 ? (
            <Grid
              size="auto"
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              >
                <InfoIcon />
              </Button>
            </Grid>
          ) : null}
          <Grid size={5}>
            <Campo
              label="Suspenso"
              valor={dadosPessoais?.snSuspenso === "S" ? "Sim" : "Não"}
            ></Campo>
          </Grid>
          <Grid size={SNcarencias > 0 ? 2 : 5}></Grid>
          <Grid size={4}>
            <Campo label="Email" valor={dadosPessoais?.email || ""}></Campo>
          </Grid>
          <Grid size={3}>
            <Campo
              label="Telefone"
              valor={dadosPessoais?.telefone || ""}
            ></Campo>
          </Grid>
          <Grid size={3}>
            <Campo label="Celular" valor={dadosPessoais?.celular || ""}></Campo>
          </Grid>
          <Grid size={2}></Grid>
          <Grid size={6}>
            <ServiceProgram matricula={props.matricula} />
          </Grid>
        </Grid>
      </Paper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          {carencias?.map((b: any, index: number) => (
            <MenuItem >
              {b.DS}
            </MenuItem>
          ))}
        </Typography>
      </Popover>
    </>
  );
}
