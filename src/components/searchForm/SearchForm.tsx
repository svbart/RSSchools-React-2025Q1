import { FC, SyntheticEvent } from 'react';
import SearchButton from '../searchButton/SearchButton';
import classes from './SearchForm.module.scss';

interface ISearchFormProps {
  handleSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
}

const SearchForm: FC<ISearchFormProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="input"
        defaultValue={localStorage.getItem('searchValue') ?? ''}
        placeholder="Search"
        className={classes.searchField}
      />
      <SearchButton />
    </form>
  );
};
export default SearchForm;
