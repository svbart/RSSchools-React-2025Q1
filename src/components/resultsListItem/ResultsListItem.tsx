import { FC, SyntheticEvent } from 'react';
import classes from './ResultsListItem.module.scss';
import { PlanetCharacteristics } from '../../common/types/types';
import { getIdFromUrl } from '../../common/utils/utils';
import { Link } from 'react-router';

interface ResultsListProps {
  planet: PlanetCharacteristics;
  setSelectedPlanetId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ResultsListItem: FC<ResultsListProps> = ({
  planet,
  setSelectedPlanetId,
}) => {
  const handleClick = (_event: SyntheticEvent) => {
    const id = getIdFromUrl(planet.url);
    setSelectedPlanetId(Number(id));
  };

  return (
    <Link to={`/planet/${getIdFromUrl(planet.url)}`} onClick={handleClick}>
      <div className={classes.ResultsListItem}>
        <div className={classes.item}>
          <div className={classes.col1}>{planet.name}</div>
          <div className={classes.col2}>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Rotation period</div>
              <div className={classes.rowCol2}>{planet.rotationPeriod}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Orbital period</div>
              <div className={classes.rowCol2}>{planet.orbitalPeriod}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Diameter</div>
              <div className={classes.rowCol2}>{planet.diameter}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Climate</div>
              <div className={classes.rowCol2}>{planet.climate}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Gravity</div>
              <div className={classes.rowCol2}>{planet.gravity}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Surface water</div>
              <div className={classes.rowCol2}>{planet.surfaceWater}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ResultsListItem;
