import styled from '@emotion/styled';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { GetBooksQuery } from '../../../../../libs/data-access/src';

/* eslint-disable-next-line */
export interface BookListProps {
  data?: GetBooksQuery;
}

const StyledBookList = styled.div`
  color: pink;
`;

export function BookList(props: BookListProps) {
  const { data } = props;

  return (
    <StyledBookList>
      {data?.getBooks.map((book) => (
        <Card key={book.id} sx={{ marginTop: 1 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography color="text.secondary" variant="caption">
                  Title
                </Typography>
                <Link to={`/book/${book.id}`}>
                  <Typography>{book.title}</Typography>
                </Link>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography color="text.secondary" variant="caption">
                  Author
                </Typography>
                <Typography>{book.author}</Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography color="text.secondary" variant="caption">
                  Category
                </Typography>
                <Typography>{book.category}</Typography>
              </Grid>
              <Grid item xs={6} sm={1}>
                <Typography color="text.secondary" variant="caption">
                  Inventory
                </Typography>
                <Typography>{book.inventory}</Typography>
              </Grid>
              {!!book.notes && (
                <Grid item xs={12}>
                  <Typography color="text.secondary" variant="caption">
                    Notes
                  </Typography>
                  <Typography>{book.notes}</Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </StyledBookList>
  );
}

export default BookList;
