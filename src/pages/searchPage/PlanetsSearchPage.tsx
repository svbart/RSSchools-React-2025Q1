import Flyout from '../../components/flyout/Flyout';
import PlanetsSearch from '../../components/planetsSearch/PlanetsSearch';
import ThemeBtn from '../../components/themeBtn/ThemeBtn';
import Layout from '../../hoc/layout/Layout';
import classes from './PlanetsSearchPage.module.scss';

const PlanetsSearchPage = () => {
  return (
    <Layout>
      <h1 className={classes.header}>Star Wars Planets</h1>
      <ThemeBtn />
      <PlanetsSearch />
      <Flyout />
    </Layout>
  );
};

export default PlanetsSearchPage;
