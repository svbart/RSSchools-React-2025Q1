import { createContext, useContext } from 'react';

export interface IThemeContext {
  darkMode: boolean;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<IThemeContext | null>({
  darkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return;
  }
  return context;
};
