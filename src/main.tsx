import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import PlanetsSearchPage from './pages/searchPage/PlanetsSearchPage.tsx';
import ErrorBoundary from './hoc/errorBoundary/ErrorBoundary.tsx';
import ItemDetailsCard from './components/itemDetailsCard/ItemDetailsCard.tsx';
import ThemeProvider from './hoc/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import NotFoundPage from './pages/notFoundPage/NotFoundPage.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ErrorBoundary>
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<PlanetsSearchPage />}>
                <Route
                  path="planets/:id"
                  element={<ItemDetailsCard key={location.pathname} />}
                />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Provider>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
