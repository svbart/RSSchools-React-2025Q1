import { useState, ReactNode } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleTheme = () => setDarkMode((prev) => !prev);
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
