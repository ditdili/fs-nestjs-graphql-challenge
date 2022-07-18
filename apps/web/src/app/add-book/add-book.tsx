import { useFormik } from 'formik';
import { Book, useAddBookMutation } from '../../../../../libs/data-access/src';
import { validationSchema } from '../utils/input-validation-schema';
import { useNavigate } from 'react-router-dom';
import FormComponent from '../components/form-component';

export function AddBook() {
  let navigate = useNavigate();
  const [addBookMutation] = useAddBookMutation({
    onCompleted: () => {
      navigate('/');
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

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
      addBookMutation({
        variables: { book: values },
        refetchQueries: ['getBooks'],
      });
    },
  });

  const handleClose = () => {
    navigate('/');
  };

  return <FormComponent formik={formik} handleClose={handleClose} />;
}

export default AddBook;
