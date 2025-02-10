import { FC, useState, SyntheticEvent, useEffect, useRef } from 'react';
import Results from '../../components/results/Results';
import ResultsList from '../../components/resultsList/ResultsList';
import { PlanetCharacteristics } from '../../common/types/types';
import { getBaseUrl, normalizeData } from '../../common/utils/utils';
import classes from './PlanetsSearch.module.scss';
import CreateErrorButton from '../../components/createErrorButton/CreateErrorButton';
import Pagination from '../../components/pagination/Pagination';
import { PageContext } from '../../contexts/pageContext';
import SearchForm from '../../components/searchForm/SearchForm';
import Spinner from '../../common/spinner/Spinner';
import { Outlet, useSearchParams } from 'react-router';

export interface PlanetsSearchState {
  searchValue: string;
  results: PlanetCharacteristics[];
  isLoading: boolean;
  requestError: string;
}

const PlanetsSearch: FC = () => {
  const savedSearch = localStorage.getItem('searchValue') || '';
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearchValue = searchParams.get('search') || savedSearch;
  const [pageNumber, setPageNumber] = useState(
    Number(searchParams.get('page')) || 1
  );
  const [thereIsNext, setThereIsNext] = useState<boolean>(true);
  const [selectedPlanetId, setSelectedPlanetId] = useState<number | null>(null);

  const [state, setState] = useState<PlanetsSearchState>({
    searchValue: initialSearchValue,
    results: [],
    isLoading: true,
    requestError: '',
  });
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get('input') as string;

    setPageNumber(1);
    setSearchParams({ search: searchValue, page: '1' });
    setState((prev) => ({ ...prev, searchValue }));

    if (searchValue) {
      localStorage.setItem('searchValue', searchValue);
    } else {
      localStorage.removeItem('searchValue');
    }
  };

  useEffect(() => {
    const fetchData = async (url: string) => {
      setState((prev) => ({ ...prev, requestError: '', isLoading: true }));
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const result = await response.json();
        if (result.results.length === 0) {
          localStorage.removeItem('searchValue');
        }
        const normalizedData: PlanetCharacteristics[] = normalizeData(
          result.results
        );
        setThereIsNext(Boolean(result.next));
        setState((prev) => ({
          ...prev,
          results: normalizedData,
          isLoading: false,
        }));
      } catch (error: unknown) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          requestError:
            error instanceof Error ? error.message : 'Unknown error',
        }));
        console.error(error);
      }
    };
    if (state.searchValue) {
      const url = `${getBaseUrl()}/?search=${state.searchValue}&page=${pageNumber}`;
      fetchData(url);
    } else {
      const url = `${getBaseUrl()}/?page=${pageNumber}`;
      fetchData(url);
    }
  }, [pageNumber, state.searchValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSelectedPlanetId(null);
        const lastSearch = localStorage.getItem('searchValue') || '';
        const currentPage = pageNumber.toString();
        setSearchParams(
          lastSearch
            ? { search: lastSearch, page: currentPage }
            : { page: currentPage }
        );
      }
    };
    window.addEventListener('click', handleClickOutside, true);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [setSearchParams, setSelectedPlanetId, pageNumber]);

  return (
    <>
      {/* <> */}
      <div className={classes.SearchSection}>
        <SearchForm handleSubmit={handleSubmit} />
        <CreateErrorButton />
      </div>
      <Results />
      {state.requestError.length && (
        <div className={classes.errorMessage}>{state.requestError}</div>
      )}

      {state.isLoading ? <Spinner /> : null}
      {!state.isLoading && !state.requestError && state.results.length < 1 && (
        <div className={classes.loading}>Nothing found</div>
      )}

      {!state.isLoading && !state.requestError && state.results.length > 0 && (
        <>
          <PageContext.Provider
            value={{
              pageNumber,
              setPageNumber,
              thereIsNext,
            }}
          >
            <Pagination />
          </PageContext.Provider>

          <div className={classes.resultsSection}>
            <div
              style={selectedPlanetId ? { width: '60%' } : { width: '100%' }}
            >
              <ResultsList
                planets={state.results}
                setSelectedPlanetId={setSelectedPlanetId}
              />
            </div>

            {selectedPlanetId && (
              <div id="details" ref={ref} className={classes.details}>
                <Outlet />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PlanetsSearch;
