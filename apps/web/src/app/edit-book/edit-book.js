import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  useGetBookQuery,
  useUpdateBookMutation,
  Book,
} from '../../../../../libs/data-access/src';
import { useFormik } from 'formik';
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { validationSchema } from '../utils/input-validation-schema';
import FormComponent from '../components/form-component';

export default function FormDialog({ open, setOpenEdit }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [updateBookMutation, { data }] = useUpdateBookMutation({
    onCompleted: () => {
      handleClose();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const [bookInfo, setBookInfo] = useState({
    author: '',
    category: '',
    id: '',
    inventory: 0,
    isbn: '',
    notes: '',
    title: '',
  });

  const formik = useFormik({
    initialValues: bookInfo,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      updateBookMutation({
        variables: { book: values },
        refetchQueries: ['getBooks'],
      });
    },
  });

  useEffect(() => {
    if (location.pathname.includes('edit') && !open) {
      setOpenEdit(true);
    }
  }, [location, open, setOpenEdit]);

  const handleClose = () => {
    navigate('/');
    setOpenEdit(false);
  };

  const { loading, isError, error } = useGetBookQuery({
    variables: params,
    onCompleted: (data) => {
      const { author, category, id, inventory, isbn, notes, title } =
        data.getBook;
      setBookInfo({ author, category, id, inventory, isbn, notes, title });
    },
  });

  if (loading) return <CircularProgress />;
  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <FormComponent formik={formik} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
