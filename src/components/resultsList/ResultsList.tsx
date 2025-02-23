import Card from '../Card/Card';
import classes from './ResultsList.module.scss';
import { useAppSelector } from '../../store/hooks';
import { PlanetCharacteristics } from '../../common/types/types';

const ResultsList = () => {
  const { currentPageData } = useAppSelector((state) => state.app);
  const planets: PlanetCharacteristics[] = currentPageData.results;
  console.log('planets', planets);
  return (
    <div className={classes.ResultsList}>
      {planets.length ? (
        planets.map((planet, index) => {
          return <Card key={index} planet={planet} />;
        })
      ) : (
        <div className={classes.noResults}>No results</div>
      )}
    </div>
  );
};
export default ResultsList;
