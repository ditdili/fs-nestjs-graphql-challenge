import styled from '@emotion/styled';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useGetBookQuery } from '../../../../../libs/data-access/src';

/* eslint-disable-next-line */
export interface BookDetailProps {}

const StyledBookDetail = styled.div`
  color: pink;
`;

const BookLogo = styled('img')(
  ({ theme }) => `
  display: inline-block;
  width: 100%;
`
);

export function BookDetail(props: BookDetailProps) {
  const { id } = useParams();
  const { data } = useGetBookQuery({
    variables: { id: id || '' },
    skip: !id,
  });

  const {
    author,
    category,
    inventory,
    isbn,
    notes,
    title,
    id: _id,
  } = data?.getBook || {};

  return (
    <StyledBookDetail>
      <Card key={_id} sx={{ marginTop: 1 }}>
        <CardContent>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={6} sm={6}>
              <Typography color="text.secondary" variant="caption">
                Title
              </Typography>
              <Typography>{title}</Typography>
              <Typography color="text.secondary" variant="caption">
                Author
              </Typography>
              <Typography>{author}</Typography>
              <Typography color="text.secondary" variant="caption">
                Category
              </Typography>
              <Typography>{category}</Typography>
              <Typography color="text.secondary" variant="caption">
                Inventory
              </Typography>
              <Typography>{inventory}</Typography>
              <Typography color="text.secondary" variant="caption">
                ISBN
              </Typography>
              <Typography>{isbn}</Typography>
              {!!notes && (
                <>
                  <Typography color="text.secondary" variant="caption">
                    Notes
                  </Typography>
                  <Typography>{notes}</Typography>
                </>
              )}
            </Grid>
            <Grid item xs={6} sm={1} justifyItems="flex-end">
              <BookLogo
                src={`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`}
                alt={title}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </StyledBookDetail>
  );
}

export default BookDetail;
