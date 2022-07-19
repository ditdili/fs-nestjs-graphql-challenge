import { TextField, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

const SearchBar = ({ handleChange }: Record<any, any>) => {
  return (
    <TextField
      id="standard-bare"
      variant="outlined"
      name="search"
      label="Search"
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <IconButton>
            <SearchOutlined />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchBar;
