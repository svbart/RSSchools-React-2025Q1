import { useTheme } from '../../contexts/ThemeContext';
import classes from './Spinner.module.scss';

const Spinner = () => {
  const themeContext = useTheme();
  const darkMode = themeContext?.darkMode;
  const theme = darkMode ? classes.dark : classes.light;

  return <div className={`${classes.spinner} ${theme}`}></div>;
};

export default Spinner;
