import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import PlanetsSearchPage from './pages/searchPage/PlanetsSearchPage.tsx';
import ErrorBoundary from './hoc/errorBoundary/ErrorBoundary.tsx';
import ItemDetailsCard from './components/itemDetailsCard/ItemDetailsCard.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<PlanetsSearchPage />}>
            <Route
              path="planet/:id"
              element={<ItemDetailsCard key={location.pathname} />}
            />
          </Route>
          <Route path="*" element={<PlanetsSearchPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
