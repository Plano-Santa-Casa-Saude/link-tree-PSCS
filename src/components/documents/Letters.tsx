import { Button, Grid, Paper, Typography } from "@mui/material";

function Letters() {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cartas
      </Typography>
      <Grid container spacing={2}>
        <Grid size="auto">
          <Button variant="contained" >Carta de Permanência</Button>
        </Grid>
        <Grid size="auto">
          <Button variant="contained" >Carta de Quitação de Débitos</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Letters;
