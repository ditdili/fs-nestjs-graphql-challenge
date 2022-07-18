import { Box, Button } from '@mui/material';
import TextInput from './text-input';

const FormComponent = ({ formik, handleClose }: Record<any, any>) => {
  return (
    <Box
      sx={{
        margin: '0px auto',
        maxWidth: 'sm',
        mt: 2,
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextInput formik={formik} label="Title" value="title" />
        <TextInput formik={formik} label="Author" value="author" />
        <TextInput formik={formik} label="Category" value="category" />
        <TextInput formik={formik} label="Id" type="number" value="id" />
        <TextInput
          formik={formik}
          label="Inventory"
          value="inventory"
          type="number"
        />
        <TextInput formik={formik} label="ISBN" value="isbn" />
        <TextInput formik={formik} label="Notes" value="notes" />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 1,
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ ml: 1 }} variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormComponent;
