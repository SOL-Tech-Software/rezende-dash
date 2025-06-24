'use client'

import * as React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

interface NavbarThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const NavbarThemeContext = createContext<NavbarThemeContextType | undefined>(undefined);

export function useNavbarTheme() {
  const context = useContext(NavbarThemeContext);
  if (context === undefined) {
    throw new Error('useNavbarTheme must be used within a NavbarThemeProvider');
  }
  return context;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'light'
}: { 
  children: React.ReactNode;
  defaultTheme?: string;
}) {
  const [theme, setThemeState] = useState<string>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Função para definir o tema e salvar no localStorage
  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('navbar-theme', newTheme);
    }
  };

  // Recuperar tema do localStorage na montagem
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('navbar-theme');
    if (savedTheme) {
      setThemeState(savedTheme);
    }
  }, []);

  const value = {
    theme,
    setTheme
  };

  return (
    <NavbarThemeContext.Provider value={value}>
      {children}
    </NavbarThemeContext.Provider>
  );
} 