import { FC, ReactNode } from 'react';
import classes from './Layout.module.scss';
import { useTheme } from '../../contexts/ThemeContext';

interface ILayoutProps {
  children: ReactNode | ReactNode[];
}
const Layout: FC<ILayoutProps> = ({ children }) => {
  const themeContext = useTheme();
  const darkMode = themeContext?.darkMode;
  const theme = darkMode ? classes.dark : classes.light;
  return (
    <div className={classes.Layout}>
      <main className={`${classes.main} ${theme}`}>{children}</main>
    </div>
  );
};

export default Layout;
