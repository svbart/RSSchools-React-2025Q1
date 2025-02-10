import { FC, ReactNode } from 'react';
import classes from './Layout.module.scss';

interface ILayoutProps {
  children: ReactNode | ReactNode[];
}
const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={classes.Layout}>
      <main className={classes.main}>{children}</main>
    </div>
  );
};

export default Layout;
