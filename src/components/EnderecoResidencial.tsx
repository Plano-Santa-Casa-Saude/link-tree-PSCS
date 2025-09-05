import { Box, Paper, Grid,Typography } from "@mui/material";
import Campo from "./Campo";
import React,{ useEffect , useState } from "react";
import { useParams } from "react-router-dom";

interface enderecoResidencial{
    zipCode: number;
    publicPlace: string;
    adress: string;
    number: number;
    complement: string;
    neighborhood: string;
    city: string;
    uf: string;
  }

  export default function enderecoResidencial(){
const { matricula } = useParams();
const [ endereco , setEndereco ] = useState<enderecoResidencial | null>(null);

const searchAdress = async () => {
    let endereco: enderecoResidencial;
    try {
      const response = await fetch(`http://10.201.0.39:3333/dadosUsuario/${matricula}`);
      const data = await response.json();
      const b = data.beneficiario[0]; 


      endereco = {
        zipCode: b.NR_CEP,
        publicPlace: b.TP_LOGRADOURO,
        adress: b.DS_ENDERECO,
        number: b.NR_ENDERECO,
        complement: b.DS_COMPLEMENTO,
        neighborhood: b.DS_BAIRRO,
        city: b.NM_CIDADE,
        uf: b.NM_UF
      };
      setEndereco(endereco);
    } catch (error) {
      console.error("Erro ao buscar dados do beneficiário:", error);
    }

      }
      useEffect(() => {
          if (matricula){
          searchAdress();
          }
        }, [matricula]);

return(

      <Box sx={{ mt: 2, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3} display='flex' flex={1} sx={{ mt: 2 }}>
            <Grid size={{xs: 12}}>
              <Typography variant="h4" component="h1" gutterBottom>
                Detalhes do Beneficiário
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>   
                <Campo label="CEP" valor={endereco?.zipCode||''}></Campo>
                <Campo label="Número" valor={endereco?.number||''}></Campo>
                <Campo label="Número" valor={endereco?.city||''}></Campo>

            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Campo label="Logradouro" valor={endereco?.publicPlace||''}></Campo>
                <Campo label="Complemento" valor={endereco?.complement||''}></Campo>   
                <Campo label="UF" valor={endereco?.uf||''}></Campo>   

            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <Campo label="Endereço" valor={endereco?.adress||''}></Campo>
                <Campo label="Bairro" valor={endereco?.neighborhood||''}></Campo>   
            </Grid>
          </Grid>
        </Paper>
      </Box>

);
}
