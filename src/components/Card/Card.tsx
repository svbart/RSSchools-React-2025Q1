import { FC, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router';
import classes from './Card.module.scss';
import { PlanetCharacteristics } from '../../common/types/types';
import { getIdFromUrl } from '../../common/utils/utils';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setItemToShowDetails,
  updateSelectedItems,
} from '../../store/storeSlices/app-reducer';
import { useTheme } from '../../contexts/ThemeContext';

interface ICardProps {
  planet: PlanetCharacteristics;
}

const Card: FC<ICardProps> = ({ planet }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedItems, pageNumber } = useAppSelector((state) => state.app);
  const isSelected = selectedItems.some((item) => item.url === planet.url);

  const themeContext = useTheme();
  const darkMode = themeContext?.darkMode;
  const theme = darkMode ? classes.dark : classes.light;

  const handleCardClick = (event: SyntheticEvent) => {
    if ((event.target as HTMLElement).closest("input[type='checkbox']")) {
      return;
    }

    dispatch(setItemToShowDetails(planet));
    navigate(`/planets/${getIdFromUrl(planet.url)}/?page=${pageNumber}`);
  };

  const handleCheckboxChange = (event: SyntheticEvent) => {
    event.stopPropagation();
    dispatch(updateSelectedItems(planet));
  };

  return (
    <div
      onClick={handleCardClick}
      className={`${classes.cardLink} ${theme}`}
      role="button"
    >
      <div className={`${classes.cardVertical} ${theme}`}>
        <div className={classes.cardContent}>
          <div className={classes.planetNameSelect}>
            <div className={classes.planetName}>{planet.name}</div>
            <label>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={handleCheckboxChange}
                className={classes.checkbox}
              />
            </label>
          </div>
          <div className={classes.planetDetails}>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Diameter:</span>
              <span className={classes.detailValue}>{planet.diameter}</span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Climate:</span>
              <span className={classes.detailValue}>{planet.climate}</span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Gravity:</span>
              <span className={classes.detailValue}>{planet.gravity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
