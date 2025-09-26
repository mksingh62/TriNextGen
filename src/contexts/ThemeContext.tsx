import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
          theme: Theme;
          setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
          const context = useContext(ThemeContext);
          if (context === undefined) {
                    throw new Error('useTheme must be used within a ThemeProvider');
          }
          return context;
};

interface ThemeProviderProps {
          children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
          const [theme, setTheme] = useState<Theme>('light');

          useEffect(() => {
                    const savedTheme = localStorage.getItem('theme') as Theme;
                    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                              setTheme(savedTheme);
                    }
          }, []);

          useEffect(() => {
                    const root = window.document.documentElement;
                    root.classList.remove('light', 'dark');
                    root.classList.add(theme);
          }, [theme]);

          useEffect(() => {
                    localStorage.setItem('theme', theme);
          }, [theme]);

          const value = {
                    theme,
                    setTheme,
          };

          return (
                    <ThemeContext.Provider value={value}>
                              {children}
                    </ThemeContext.Provider>
          );
};
