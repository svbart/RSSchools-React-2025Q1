import { FC } from 'react';
import { Link } from 'react-router';
import Layout from '../../hoc/layout/Layout';

const NotFoundPage: FC = () => {
  return (
    <Layout>
      <div
        style={{
          width: '500px',
          marginTop: '10%',
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          borderRadius: '5px',
          backgroundColor: '#fff',
        }}
      >
        <h2 style={{ margin: '10px 0' }}>Page Not Found</h2>
        <p>
          {' '}
          Go to the <Link to="/">Homepage</Link>{' '}
        </p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
