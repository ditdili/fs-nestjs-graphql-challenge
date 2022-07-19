import { AppBar, Box, Container, styled, Typography } from '@mui/material';
import logo from '../assets/navy_logo.png';
import { useGetBooksQuery } from '@full-stack-dev-challenge/data-access';
import BookList from './book-list/book-list';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AddBook from './add-book/add-book';
import BookDetail from './book-detail/book-detail';
import FormDialog from './edit-book/edit-book.js';
import { useEffect, useRef, useState } from 'react';
import SearchBar from './search-bar';
import { debounce } from 'lodash';

const BooksLogo = styled('img')(
  ({ theme }) => `
  display: inline-block;
  margin: ${theme.spacing(1, 1, 1, 0)};
  height: 54px;
`
);

export function App() {
  const [openEdit, setOpenEdit] = useState(false);
  const [search, setSearch] = useState('');

  const { data } = useGetBooksQuery({
    variables: { search },
  });

  const debouncedSearch = useRef(
    debounce((val) => {
      setSearch(val);
    }, 800)
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  console.log(search);

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
          <Box>
            <Typography variant="subtitle1">
              Check out all of our great books we have to offer.
            </Typography>
            <Link to="/add-book">Add Book</Link>
          </Box>
          <Box>
            <SearchBar handleChange={handleChange} />
          </Box>
        </Box>

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
