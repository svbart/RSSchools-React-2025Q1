import { SyntheticEvent } from 'react';
import classes from './Pagination.module.scss';
import { useSearchParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setItemToShowDetails,
  setPageNumber,
} from '../../store/storeSlices/app-reducer';
import { useTheme } from '../../contexts/ThemeContext';

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { currentPageData, pageNumber } = useAppSelector((state) => state.app);

  const themeContext = useTheme();
  const darkMode = themeContext?.darkMode;
  const theme = darkMode ? classes.dark : classes.light;

  const handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.target as HTMLButtonElement;

    let newPageNumber = pageNumber;
    if (target.textContent === 'Previous') newPageNumber = pageNumber - 1;
    if (target.textContent === 'Next') newPageNumber = pageNumber + 1;

    dispatch(setPageNumber(newPageNumber));
    dispatch(setItemToShowDetails(null));
    const searchValue = searchParams.get('search') || '';

    setSearchParams(
      searchValue
        ? { search: searchValue, page: newPageNumber.toString() }
        : { page: newPageNumber.toString() }
    );
  };

  return (
    <div className={classes.pagination}>
      <button
        className={classes.button}
        onClick={handleButtonClick}
        disabled={!currentPageData.previous}
      >
        Previous
      </button>
      <span className={`${classes.pageNumber} ${theme}`}>{pageNumber}</span>
      <button
        className={classes.button}
        onClick={handleButtonClick}
        disabled={!currentPageData.next}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
