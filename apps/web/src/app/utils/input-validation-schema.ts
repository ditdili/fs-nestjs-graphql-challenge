import * as yup from 'yup';

export const validationSchema = yup.object({
  author: yup.string().required('Author is required'),
  category: yup.string().required('Category is required'),
  id: yup.string().required('ID is required'),
  inventory: yup.number().required('Inventory is required'),
  isbn: yup.string().required('ISBN is required'),
  notes: yup.string().nullable(),
  title: yup.string().required('Title is required'),
});
