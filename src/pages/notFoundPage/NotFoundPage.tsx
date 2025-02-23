import { Link } from 'react-router';
import Layout from '../../hoc/layout/Layout';
import classes from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className={classes.container}>
        <h2 className={classes.title}>Page Not Found</h2>
        <p>
          Go to the <Link to="/">Homepage</Link>{' '}
        </p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
