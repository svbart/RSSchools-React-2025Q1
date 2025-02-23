import { useEffect } from 'react';
import { PlanetCharacteristics } from '../../common/types/types';
import classes from './ItemDetailsCard.module.scss';
import Spinner from '../../common/spinner/Spinner';
import { useGetPlanetByIdQuery } from '../../services/planetsApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getIdFromUrl, normalizeDataOfPlanet } from '../../common/utils/utils';
import {
  setItemToShowDetails,
  setPageNumber,
} from '../../store/storeSlices/app-reducer';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate, useSearchParams } from 'react-router';

const ItemDetailsCard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { itemToShowDetails, pageNumber } = useAppSelector(
    (state) => state.app
  );
  const { data, error, isLoading } = useGetPlanetByIdQuery(
    itemToShowDetails ? getIdFromUrl(itemToShowDetails.url) : 0
  );
  const [searchParams] = useSearchParams();

  const themeContext = useTheme();
  const darkMode = themeContext?.darkMode;
  const theme = darkMode ? classes.dark : classes.light;

  const handleCloseButtonClick = () => {
    dispatch(setItemToShowDetails(null));

    const pageFromUrl = Number(searchParams.get('page')) || pageNumber;

    dispatch(setPageNumber(pageFromUrl));
    navigate(`/?page=${pageFromUrl}`);
  };
  useEffect(() => {
    if (data) {
      const normalizedResults: PlanetCharacteristics =
        normalizeDataOfPlanet(data);
      dispatch(setItemToShowDetails(normalizedResults));
    }
  }, [data, dispatch]);

  return (
    <>
      <>
        <div className={`${classes.detailsHeader} ${theme}`}>
          <div>Details</div>
          <button onClick={handleCloseButtonClick} className={classes.closeBtn}>
            X
          </button>
        </div>
        <div className={classes.detailsContent}>
          {isLoading && <Spinner />}
          {error && (
            <div className={classes.error}>Error in details fetching</div>
          )}
          {itemToShowDetails && (
            <>
              <div>Planet: {itemToShowDetails.name}</div>
              <div>Population: {itemToShowDetails.population}</div>
              <div>Terrain: {itemToShowDetails.terrain}</div>
            </>
          )}
        </div>
      </>
    </>
  );
};

export default ItemDetailsCard;
