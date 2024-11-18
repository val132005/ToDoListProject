import React, { useState } from "react";
import { TextField, MenuItem, Button, Typography, Box, Snackbar } from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../services/RegistrerTasks"; // Asegúrate de importar la mutación

const TaskForm = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    status: "",
    level: "",
  });

  const [createTask, { loading, error }] = useMutation(CREATE_TASK);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para controlar el Snackbar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createTask({
        variables: {
          name_item: formValues.title,
          description_item: formValues.description,
          state_item: formValues.status,
          priority_item: formValues.level,
          id_todolist: 1, // Cambia esto si necesitas un id_todolist dinámico
        },
      });

      console.log("Tarea creada:", data.insert_item.returning);

      // Abrir el Snackbar cuando la tarea se haya creado correctamente
      setOpenSnackbar(true);
      setFormValues({ title: "", description: "", status: "", level: "" }); // Limpiar el formulario
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "auto",
        marginTop: "0px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Registrar Tarea
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField
            fullWidth
            label="Título de la tarea"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Descripción de la tarea"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            select
            label="Estado"
            name="status"
            value={formValues.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="Iniciando">Iniciando</MenuItem>
            <MenuItem value="En proceso">En proceso</MenuItem>
            <MenuItem value="Finalizado">Finalizado</MenuItem>
          </TextField>
          <TextField
            fullWidth
            select
            label="Nivel de la tarea"
            name="level"
            value={formValues.level}
            onChange={handleChange}
            required
          >
            <MenuItem value="Bajo">Bajo</MenuItem>
            <MenuItem value="Medio">Medio</MenuItem>
            <MenuItem value="Alto">Alto</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Tarea"}
          </Button>
        </Box>
      </form>

      {error && (
        <Typography color="error" align="center">
          Error al guardar la tarea: {error.message}
        </Typography>
      )}

      {/* Snackbar para mostrar el mensaje de éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // El mensaje se ocultará automáticamente después de 3 segundos
        onClose={() => setOpenSnackbar(false)}
        message="¡Tarea creada con éxito!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ backgroundColor: 'green' }} // Color de fondo verde
      />
    </Box>
  );
};

export default TaskForm;
