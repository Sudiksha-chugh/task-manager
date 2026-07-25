import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const socketRef = useRef(null);
  const [, setSocketReady] = useState(false);

  useEffect(() => {
    if (!token) return;

    const { userId } = JSON.parse(atob(token.split('.')[1]));
    const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001');
    socket.on('connect', () => {
      socket.emit('join', userId);
    });
    socketRef.current = socket;
    setSocketReady(true);

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, socket: socketRef.current }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
