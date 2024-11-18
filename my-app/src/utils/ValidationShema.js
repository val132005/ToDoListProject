import * as yup from 'yup';

const ValidationSchema = yup.object({
  username: yup.string().required('El nombre de usuario es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

export default ValidationSchema;
