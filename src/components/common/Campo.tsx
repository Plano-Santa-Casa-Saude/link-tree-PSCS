import { TextField, Typography, Box } from "@mui/material";

interface CampoProps {
  label: string;
  valor: string | number;
}

export default function Campo({ label, valor }: CampoProps) {
  return (
    <Box sx={{ mb: 2 }} > 
      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5}}>
        {label}
      </Typography>
      <TextField
        value={valor}
        fullWidth
        variant="outlined"
        size="small"
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
  );
}
