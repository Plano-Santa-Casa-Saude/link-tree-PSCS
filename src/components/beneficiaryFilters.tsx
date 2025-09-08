import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "ativo", headerName: "Ativo", width: 70 },
  { field: "matricula", headerName: "Matricula", width: 130 },
  {
    field: "nome",
    headerName: "Nome",
    width: 250,
  },
  {
    field: "cpf",
    headerName: "CPF",
    Type: "Number",
    width: 150,
  },
  {
    field: "plano",
    headerName: "Plano",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 300,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function BeneficiaryFilters() {
  const [rows, setRows] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const buscarBeneficiarios = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://10.201.0.39:3333/beneficiarios/all`);

      const data = await response.json();
      console.log(data); // aqui você vê o objeto completo: { total, page, limit, ... }

      const beneficiariosComId = data.beneficiarios.map(
        (b: any, index: number) => ({
          ...b,
          id: index + 1, // ou `${b.matricula}-${index}`
        })
      );

      // O array está em "beneficiarios"
      setRows(beneficiariosComId);
    } catch (error) {
      console.error("Erro ao buscar os beneficiarios:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="StandardAdornmentNmCompleto">
              Nome Completo
            </InputLabel>
            <Input id="StandardAdornmentNmCompleto" />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="StandardAdornmentMatricula">
              Matrícula
            </InputLabel>
            <Input id="StandardAdornmentMatricula" />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="StandardAdornmentCpf">CPF</InputLabel>
            <Input id="StandardAdornmentCpf" />
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Abrir protocolo"
              labelPlacement="top"
            />
          </FormGroup>
        </Grid>

        <Grid
          size={{ xs: 12, sm: 6, md: 1 }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={buscarBeneficiarios} variant="contained">
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>

      <Container sx={{ mt: 4 }}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          loading={loading}
          onCellDoubleClick={(params) => {
            const matricula = params.row.matricula
            navigate(`/Detalhado/${matricula}`);
          }}
        />
      </Container>
    </>
  );
}
