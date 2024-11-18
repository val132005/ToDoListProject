import React, { useState } from "react";
import { Typography, Button, Box, Dialog, DialogActions, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { useQuery, gql } from '@apollo/client';  // Importar gql y useQuery
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBarLogged from "../assets/ResponsiveAppBarLogged";
import TaskForm from './TaskForm';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Consulta GraphQL para obtener las tareas
const GET_TASKS = gql`
  query GetTasks {
    item {
      id_item
      name_item
      description_item
      state_item
      priority_item
      id_todolist
      todolist {  
        name_todolist  
      }
    }
  }
`;
const ToDoList = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);  // Estado para controlar el modal
  const { loading, error, data } = useQuery(GET_TASKS);  // Obtener datos de tareas

  const rows = data ? data.item.map(task => ({
    id: task.id_item,  // Usar id_item como identificador único
    title: task.name_item,
    description: task.description_item,
    status: task.state_item,
    priority: task.priority_item,
    todolistName: task.todolist.name_todolist,  // Aquí accedes a la relación correctamente
  })) : [];
  

  const handleAddTask = () => {
    setOpen(true);  // Abre el modal
  };

  const handleClose = () => {
    setOpen(false);  // Cierra el modal
  };

  const handleEditTask = (taskId) => {
    console.log("Editando tarea con ID:", taskId);
    // Aquí puedes agregar la lógica para editar la tarea
  };

  const handleDeleteTask = (taskId) => {
    console.log("Eliminando tarea con ID:", taskId);
    // Aquí puedes agregar la lógica para eliminar la tarea
  };

  if (loading) return <Typography>Cargando tareas...</Typography>;
  if (error) return <Typography>Error al cargar tareas: {error.message}</Typography>;

  return (
    <>
      <div className='nav-var-1'>
        <ResponsiveAppBarLogged />
      </div>
      <Box sx={{ padding: "16px" }}>
        {/* Encabezado con título y botón */}
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme.palette.primary.main,  // Fondo azul con el color primario del tema
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "4px",
            marginBottom: "16px",
          })}
        >
          <Typography variant="h6">To do list</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddTask}
            sx={{ textTransform: "none" }}
          >
            + Agregar tarea
          </Button>
        </Box>

        {/* Tabla de tareas */}
        <TableContainer component={Paper} sx={{ marginTop: "16px" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID de tarea</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nombre de la tarea</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Descripción</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Estado de tarea</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Prioridad de tarea</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Lista de tareas</TableCell> {/* Nueva columna para el nombre de la lista */}
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Acciones</TableCell> {/* Nueva columna para acciones */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell> {/* Mostrar ID de tarea */}
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.todolistName}</TableCell> {/* Mostrar el nombre de la lista de tareas */}
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditTask(task.id)} // Editar tarea
                      sx={{ marginRight: 2 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteTask(task.id)} // Eliminar tarea
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal para agregar tarea */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogContent>
          <TaskForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ToDoList;
