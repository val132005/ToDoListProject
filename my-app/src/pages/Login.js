import React from 'react';
import TextField from '@mui/material/TextField';  // Cambio de @material-ui/core a @mui/material
import Button from '@mui/material/Button'; 
import ResponsiveAppBarNormal from '../assets/ResponsiveAppBarNonLogged';
import { useState } from 'react'; 
import '../styles/Login.css'; // Importamos los estilos personalizados

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => { 
    e.preventDefault();
    // Aquí puedes agregar la lógica para el inicio de sesión
    console.log(credentials);
  };

  return (
    <div className="login-container">
      <ResponsiveAppBarNormal />

      <div className="login-form">
        <h1 className="title">Login</h1>
        <p className="text">Por favor, ingresa tus credenciales para continuar</p>

        <form onSubmit={handleSubmit} className='formBigContainer'>
          <TextField
            required
            label="Usuario"
            variant="outlined"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="MuiTextField-root" 
            sx={{ width: '80%', marginBottom: '15px' }}
          />
          <TextField
            required
            label="Contraseña"
            variant="outlined"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="MuiTextField-root" // Asegura que el estilo de texto se aplique
          />
          <div className="button-container-form">
            <Button type="submit" className="login-form button" sx={{ backgroundColor: '#2196f3', color: 'black' }}>
              Iniciar sesión
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
