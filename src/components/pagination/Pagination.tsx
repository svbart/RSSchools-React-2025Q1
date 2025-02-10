import { FC, SyntheticEvent, useContext } from 'react';
import classes from './Pagination.module.scss';
import { useSearchParams } from 'react-router';
import { PageContext, IPageContext } from '../../contexts/pageContext';

const Pagination: FC = () => {
  const context: IPageContext | null = useContext(PageContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    if (!context) {
      return;
    }
    const target = event.target as HTMLButtonElement;
    let newPage = context.pageNumber;
    if (target.textContent === 'Previous') newPage = context.pageNumber - 1;
    if (target.textContent === 'Next') newPage = context.pageNumber + 1;

    context.setPageNumber(newPage);
    const searchValue = searchParams.get('search') || '';
    setSearchParams(
      searchValue
        ? { search: searchValue, page: newPage.toString() }
        : { page: newPage.toString() }
    );
  };

  return (
    <div className={classes.pagination}>
      <button
        className={classes.button}
        onClick={handleButtonClick}
        disabled={context?.pageNumber === 1}
      >
        Previous
      </button>{' '}
      <span className={classes.pageNumber}>{context?.pageNumber}</span>{' '}
      <button
        className={classes.button}
        onClick={handleButtonClick}
        disabled={!context?.thereIsNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
