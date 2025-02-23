import PlanetsSearchPage from './pages/searchPage/PlanetsSearchPage';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  return;
  <Provider store={store}>
    <PlanetsSearchPage />
  </Provider>;
};

export default App;
