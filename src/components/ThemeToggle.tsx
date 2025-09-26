import React from 'react';
import { Button } from '@/components/ui/button';
import {
          Sun,
          Moon
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
          const { theme, setTheme } = useTheme();

          const toggleTheme = () => {
                    setTheme(theme === 'light' ? 'dark' : 'light');
          };

          return (
                    <Button
                              variant="outline"
                              size="sm"
                              onClick={toggleTheme}
                              className="w-12 h-10 p-0 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                              {theme === 'light' ? (
                                        <Moon className="w-4 h-4" />
                              ) : (
                                        <Sun className="w-4 h-4" />
                              )}
                    </Button>
          );
};

export default ThemeToggle;
