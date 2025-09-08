import React,{ useEffect , useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Box, Paper, Grid, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Procolos from '../components/Protocolos.tsx';
import GuiaListaComponent from '../components/GuiaListaComponent';
import Campo from "../components/Campo.tsx";


export default function DetalheBeneficiario() {
  const { matricula } = useParams();
  const navigate = useNavigate();
  const [dadosPessoais, setDadosPessoais] = useState<dadosPessoais | null>(null);

  const handleVoltar = () => {
    navigate("/");
  };
  interface dadosPessoais {
    nome: string;
    nomeSocial: string;
    cpf: string;
    sexo: string;
    plano: string;
    tipoBeneficiario: string;
    tipoContrato: string;
    //dataAdesao: string;
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
   const buscarDados = async () => {
    let dados: dadosPessoais;
    try {
      console.log('Buscando dados para matrícula:', matricula);
      const response = await fetch(`http://10.201.0.39:3333/dadosUsuario/${matricula}`);
      const data = await response.json();
      const b = data.beneficiario[0]; ;


      dados = {
        nome: b.NM_SEGURADO,
        nomeSocial: b.NM_SOCIAL,
        cpf: b.NR_CPF,
        sexo: b.TP_SEXO,
        plano: b.DS_PLANO,
        tipoBeneficiario: b.TP_USUARIO,
        tipoContrato: b.TP_CONTRATO,
        //dataAdesao: b.DT_ADESAO,
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
      setDadosPessoais(dados);
    } catch (error) {
      console.error("Erro ao buscar dados do beneficiário:", error);
    }

      }
    
  useEffect(() => {
    if (matricula){
    buscarDados();
    }
  }, [matricula]);
  


  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 2, mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleVoltar}
          sx={{ mb: 3 }}
        >
          Voltar
        </Button>
        
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{xs: 12}}>
              <Typography variant="h4" component="h1" gutterBottom>
                Detalhes do Beneficiário
              </Typography>
               <Typography variant="h5" gutterBottom align="center">
                Informações Pessoais
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Campo label="Matrícula" valor={matricula || "N/A"} />
              <Campo label="Nome" valor={dadosPessoais?.nome || "N/A"} />
              <Campo label="Nome Social" valor={dadosPessoais?.nomeSocial ||''}></Campo>
              <Campo label="Nome da Mãe" valor={dadosPessoais?.nomeMae||''}></Campo>
              <Campo label="CPF" valor={dadosPessoais?.cpf||''}></Campo>
              <Campo label="Sexo" valor={dadosPessoais?.sexo === "M" ? "MASCULINO" : dadosPessoais?.sexo === "F" ? "FEMININO" : ""}></Campo>
              <Campo label="Data de Nascimento" valor={dadosPessoais?.dataNascimento ? new Date(dadosPessoais.dataNascimento).toLocaleDateString("pt-BR") : ""}></Campo>
            </Grid>
            
            <Grid size={{ xs: 12, md: 4 }}>
             <Campo label="Idade" valor={dadosPessoais?.idade ||''}></Campo>
             <Campo label="Plano" valor={dadosPessoais?.plano ||''}></Campo>
             <Campo label="Satus" valor={dadosPessoais?.snAtivo === 'S' ? 'ATIVO' : 'INATIVO'}></Campo>
             <Campo label="Tipo beneficiário" valor={dadosPessoais?.tipoBeneficiario === 'T' ? 'TITULAR': 'DEPENDENTE'}></Campo>
             <Campo label="Suspenso" valor={dadosPessoais?.snSuspenso ==='S' ? 'SIM' : 'NÃO'}></Campo>
             <Campo label="Motivo do Cancelamento" valor={dadosPessoais?.motivoCancelamento ||''}></Campo>
             <Campo label="Data do Cancelamento" valor={dadosPessoais?.dataDesligamento ? new Date(dadosPessoais.dataDesligamento).toLocaleDateString("pt-BR") : ''}></Campo>                 
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Campo label="Código do Contrato" valor={dadosPessoais?.codigoContrato || ''}></Campo>
              <Campo label="Nome da Empresa" valor={dadosPessoais?.nomeEmpresa||''}></Campo>
              <Campo label="Tipo Contrato" valor={dadosPessoais?.tipoContrato ||''}></Campo>
              <Campo label="Tipo Acomodação" valor={dadosPessoais?.tipoAcomodacao ||''}></Campo>
              <Campo label="Possui Coparticipação" valor={dadosPessoais?.possuiCoparticipacao === 'S' ? 'SIM' : 'NÃO'}></Campo>
            </Grid>
            <Grid size={{ xs: 12}}>
            <Typography variant="h5" component="h1" gutterBottom align="center">
              Dados de contato
            </Typography>
            </Grid>
            <Grid container display={'flex'} flex={1}>
              <Grid size = {{xs:12,md:4}}>
                <Campo label="Email" valor={dadosPessoais?.email||''}></Campo>
              </Grid>
              <Grid size = {{xs:12,md:4}}>
                <Campo label="Telefone" valor={dadosPessoais?.telefone||''}></Campo> 
              </Grid>
              <Grid size = {{xs:12,md:4}}>
                <Campo label="Celular" valor={dadosPessoais?.celular||''}></Campo> 
              </Grid>
          </Grid>
          </Grid>
        </Paper>
        <Procolos matricula={matricula} />
        
        {/* Componente de Lista de Guias */}
        <Box sx={{ mt: 4 }}>
          <GuiaListaComponent 
            matricula={matricula || ''} 
            onGuiaClick={(nrGuia) => {
              console.log('Guia clicada:', nrGuia);
              // Aqui você pode implementar a navegação ou modal para detalhes da guia
            }}
            apiUrl="http://10.201.0.39:3333/guia"
          />
        </Box>
      </Box>
    </Container>
  );
}