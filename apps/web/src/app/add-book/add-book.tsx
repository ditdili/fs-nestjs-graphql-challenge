import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Book, useAddBookMutation } from '../../../../../libs/data-access/src';

const validationSchema = yup.object({
  author: yup.string().required('Author is required'),
  category: yup.string().required('Category is required'),
  id: yup.string().required('ID is required'),
  inventory: yup.number().required('Inventory is required'),
  isbn: yup.string().required('ISBN is required'),
  notes: yup.string(),
  title: yup.string().required('Title is required'),
});

export function AddBook() {
  const [addBookMutation, { data, loading, error }] = useAddBookMutation();

  const formik = useFormik({
    initialValues: {
      author: '',
      category: '',
      id: '',
      inventory: 0,
      isbn: '',
      notes: '',
      title: '',
    },
    validationSchema,
    onSubmit: (values: Book) => {
      console.log(values);
      addBookMutation({ variables: { book: values } });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          id="author"
          name="author"
          label="Author"
          value={formik.values.author}
          onChange={formik.handleChange}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
        />
        <TextField
          fullWidth
          id="category"
          name="category"
          label="Category"
          value={formik.values.category}
          onChange={formik.handleChange}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
        />
        <TextField
          fullWidth
          id="id"
          name="id"
          label="id"
          value={formik.values.id}
          onChange={formik.handleChange}
          error={formik.touched.id && Boolean(formik.errors.id)}
          helperText={formik.touched.id && formik.errors.id}
        />
        <TextField
          fullWidth
          id="inventory"
          name="inventory"
          label="inventory"
          type="number"
          value={formik.values.inventory}
          onChange={formik.handleChange}
          error={formik.touched.inventory && Boolean(formik.errors.inventory)}
          helperText={formik.touched.inventory && formik.errors.inventory}
        />
        <TextField
          fullWidth
          id="isbn"
          name="isbn"
          label="isbn"
          value={formik.values.isbn}
          onChange={formik.handleChange}
          error={formik.touched.isbn && Boolean(formik.errors.isbn)}
          helperText={formik.touched.isbn && formik.errors.isbn}
        />
        <TextField
          fullWidth
          id="notes"
          name="notes"
          label="notes"
          value={formik.values.notes}
          onChange={formik.handleChange}
          error={formik.touched.notes && Boolean(formik.errors.notes)}
          helperText={formik.touched.notes && formik.errors.notes}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddBook;
