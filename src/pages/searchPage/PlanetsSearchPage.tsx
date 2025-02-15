import Flyout from '../../components/flyout/Flyout';
import PlanetsSearch from '../../components/planetsSearch/PlanetsSearch';
import Layout from '../../hoc/layout/Layout';
import classes from './PlanetsSearchPage.module.scss';

const PlanetsSearchPage = () => {
  return (
    <Layout>
      <h1 className={classes.header}>Star Wars Planets</h1>
      <PlanetsSearch />
      <Flyout />
    </Layout>
  );
};

export default PlanetsSearchPage;
