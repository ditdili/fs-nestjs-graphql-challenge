import { TextField } from '@mui/material';

const TextInput = ({ formik, label, value, type }: Record<any, any>) => {
  const notNullValue = formik.values[value] || '';

  return (
    <TextField
      sx={{ mt: 2 }}
      fullWidth
      id={value}
      name={value}
      type={type || 'text'}
      label={label}
      value={notNullValue}
      onChange={formik.handleChange}
      error={formik.touched[value] && Boolean(formik.errors[value])}
      helperText={formik.touched[value] && formik.errors[value]}
    />
  );
};

export default TextInput;
