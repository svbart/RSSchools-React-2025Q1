import { ChangeEvent, Component } from 'react';
import SearchField from '../../components/searchField/SearchField';
import SearchButton from '../../components/searchButton/SearchButton';
import Results from '../../components/results/Results';
import ResultsList from '../../components/resultsList/ResultsList';
import { PlanetCharacteristics } from '../../common/types/types';
import { getBaseUrl, normalizeData } from '../../common/utils/utils';
import classes from './PlanetsSearch.module.scss';
import CreateErrorButton from '../../components/createErrorButton/CreateErrorButton';

interface PlanetsSearchState {
  searchValue: string;
  results: PlanetCharacteristics[];
  isLoading: boolean;
  requestError: string;
}

export default class PlanetsSearch extends Component {
  initialInputValue = localStorage.getItem('searchValue') || '';

  state: PlanetsSearchState = {
    searchValue: this.initialInputValue,
    results: [],
    isLoading: false,
    requestError: '',
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };
  handelClick = () => {
    localStorage.setItem('searchValue', this.state.searchValue);
    const url = `${getBaseUrl()}/?search=${this.state.searchValue}`;
    this.fetchData(url);
  };

  fetchData = async (url: string) => {
    this.setState({ requestError: '', isLoading: true });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      const result = await response.json();
      const normalizedData: PlanetCharacteristics[] = normalizeData(
        result.results
      );
      this.setState({ results: normalizedData, isLoading: false });
    } catch (error: unknown) {
      this.setState({
        isLoading: false,
        requestError:
          error instanceof Error ? error.message : 'Неизвестная ошибка',
      });
      console.error(error);
    }
  };

  componentDidMount() {
    const prevQuery = localStorage.getItem('searchValue');
    if (prevQuery) {
      const url = `${getBaseUrl()}/?search=${prevQuery}`;
      this.fetchData(url);
    } else {
      const url = `${getBaseUrl()}/?page=1`;
      this.fetchData(url);
    }
  }

  render() {
    return (
      <>
        <div className={classes.SearchSection}>
          <SearchField
            onInputChange={this.handleChange}
            searchValue={this.state.searchValue}
          />
          <SearchButton onButtonClick={this.handelClick} />
          <CreateErrorButton />
        </div>

        {this.state.requestError.length && (
          <div className={classes.errorMessage}>{this.state.requestError}</div>
        )}

        {this.state.isLoading && (
          <div className={classes.loadingMessage}>Loading...</div>
        )}

        {!this.state.isLoading &&
          !this.state.requestError &&
          this.state.results.length > 0 && (
            <>
              <Results />
              <ResultsList planets={this.state.results} />
            </>
          )}
      </>
    );
  }
}
