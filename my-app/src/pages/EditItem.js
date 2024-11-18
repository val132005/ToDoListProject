import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBarNormal from '../assets/ResponsiveAppBarLogged';
import '../styles/CreateNewItem.css';

const EditItem = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!taskTitle || !taskDescription || !status || !priority) {
      setError("Please fill out all fields.");
      return;
    }

    // Aquí deberías hacer la lógica para guardar la tarea
    alert("Task created successfully!");
    // Luego rediriges o realizas cualquier otra acción
    navigate("/HomeLogged"); // Redirige a la página de inicio
  };

  return (
    <div className="task-form-container">
      <ResponsiveAppBarNormal />
      <div className="task-form">
        <h1 className="title">Editar Tarea</h1>
        <p className="text">Por favor, ingresa los detalles de la tarea</p>

        <form onSubmit={handleFormSubmit} className='formBigContainer'>
          <TextField
            required
            label="Título de la tarea"
            variant="outlined"
            name="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="MuiTextField-root" 
            sx={{ width: '80%', marginBottom: '15px' }}
          />

          <TextField
            required
            label="Descripción de la tarea"
            variant="outlined"
            name="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="MuiTextField-root" 
            sx={{ width: '80%', marginBottom: '15px' }}
            multiline
            rows={4}
          />

          <FormControl required sx={{ width: '80%', marginBottom: '15px' }}>
            <InputLabel>Estado</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Estado"
            >
              <MenuItem value={1}>Sin iniciar</MenuItem>
              <MenuItem value={2}>En proceso</MenuItem>
              <MenuItem value={3}>Terminada</MenuItem>
            </Select>
          </FormControl>

          <FormControl required sx={{ width: '80%', marginBottom: '15px' }}>
            <InputLabel>Nivel de prioridad</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Nivel de prioridad"
            >
              <MenuItem value={1}>Alta</MenuItem>
              <MenuItem value={2}>Media</MenuItem>
              <MenuItem value={3}>Baja</MenuItem>
            </Select>
          </FormControl>

          {error && <Typography color="error" variant="body2">{error}</Typography>}
          
          <div className="button-container-form">
            <Button type="submit" className="task-form button" sx={{ backgroundColor: '#2196f3', color: 'black' }}>
              Crear tarea
            </Button>
          </div>
        </form>  
      </div>
    </div>
  );
};

export default EditItem;
