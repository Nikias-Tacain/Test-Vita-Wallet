'use client'
import { createContext, useState, useContext } from 'react';

// Crear el contexto
const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  // Estado global de ejemplo (puedes agregar más estados según lo necesites)
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppContext.Provider
      value={{ user, setUser, balance, setBalance, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useAppContext = () => {
  return useContext(AppContext);
};
