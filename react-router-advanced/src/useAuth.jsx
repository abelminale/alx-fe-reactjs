
import { useState } from 'react';

// Simulate an authentication hook
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate a login function
  const login = () => setIsAuthenticated(true);

  // Simulate a logout function
  const logout = () => setIsAuthenticated(false);

  return { isAuthenticated, login, logout };
}

export default useAuth;
