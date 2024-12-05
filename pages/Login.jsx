import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/visor');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" mb={3}>
        Iniciar Sesión
      </Typography>
      <TextField label="Correo Electrónico" fullWidth margin="normal" />
      <TextField label="Contraseña" type="password" fullWidth margin="normal" />
      <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>
        Iniciar
      </Button>
    </Box>
  );
};

export default Login;
