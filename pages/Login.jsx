import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert('Por favor, complete todos los campos.');
      return;
    }
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
      <form onSubmit={handleLogin}>
        <TextField 
          label="Correo Electrónico" 
          fullWidth
          type="email"
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <TextField 
          label="Contraseña" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Iniciar
        </Button>
      </form>
    </Box>
  );
};

export default Login;
