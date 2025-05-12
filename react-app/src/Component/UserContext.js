import React, { createContext, useContext, useEffect, useState } from 'react';

// Create Context
const UserContext = createContext();

// Provide Context to Entire App
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
export const useUser = () => useContext(UserContext);
