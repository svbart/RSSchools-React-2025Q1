import { useTheme } from '../../contexts/ThemeContext';
import classes from './ThemeBtn.module.scss';

const ThemeBtn = () => {
  const themeContext = useTheme();
  const darkMode = themeContext?.darkMode;
  const toggleTheme = themeContext?.toggleTheme;
  const theme = darkMode ? classes.dark : classes.light;

  return (
    <div className={classes.themeBtnContainer}>
      <button
        onClick={toggleTheme}
        className={`${classes.themeButton} ${theme}`}
      >
        {darkMode ? 'Light Theme' : 'Dark Theme'}
      </button>
    </div>
  );
};
export default ThemeBtn;
