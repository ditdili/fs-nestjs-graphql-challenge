import { AppBar, Box, Container, styled, Typography } from '@mui/material';
import logo from '../assets/navy_logo.png';
import { useGetBooksQuery } from '@full-stack-dev-challenge/data-access';
import BookList from './book-list/book-list';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AddBook from './add-book/add-book';
import BookDetail from './book-detail/book-detail';
import FormDialog from './edit-book/edit-book.js';
import { useState } from 'react';

const BooksLogo = styled('img')(
  ({ theme }) => `
  display: inline-block;
  margin: ${theme.spacing(1, 1, 1, 0)};
  height: 54px;
`
);

export function App() {
  const { data } = useGetBooksQuery();
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <BrowserRouter>
      <AppBar position="static" component="nav">
        <Container>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <BooksLogo src={logo} alt="Books-R-Us Logo" />
            <Link to="/" style={{ marginTop: '20px', marginLeft: '20px' }}>
              Home
            </Link>
          </Box>
        </Container>
      </AppBar>
      <Container>
        <Typography variant="h2" component="h1">
          Welcome to Books-R-Us!
        </Typography>
        <Typography variant="subtitle1">
          Check out all of our great books we have to offer.
        </Typography>
        <Link to="/add-book">Add Book</Link>
        <Routes>
          <Route
            path="/"
            element={<BookList data={data} setOpenEdit={setOpenEdit} />}
          >
            <Route
              path="/edit-book/:id"
              element={<FormDialog open={openEdit} setOpenEdit={setOpenEdit} />}
            />
          </Route>
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
