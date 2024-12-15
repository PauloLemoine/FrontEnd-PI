import { createContext, useEffect, useMemo, useState } from 'react';

import useNavigation from '../lib/navigate';

import { IAuthProvider } from '../interfaces/IAuthProvider';
import { IContext } from '../interfaces/IContext';
import { ILoggedUSerData } from '../interfaces/ILoggedUSerData';
import {
  addToken,
  getUserLocalStorage,
  loginRequest,
  removeToken,
  removeUserLocalStorage,
  setUserLocalStorage,
} from './utils';

export const AuthContext = createContext<IContext>({
  user: {
    cpf: '',
    senha: '',
    id: '',
  },
  token: '',
  handleLogin: async () => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [loggedUserData, setLoggedUserData] = useState<ILoggedUSerData>({
    user: {
      cpf: '',
      senha: '',
      id: '',
    },
    token: '',
  });
  const navigate = useNavigation();

  useEffect(() => {
    const userLocalStorage = getUserLocalStorage();

    if (userLocalStorage) {
      setLoggedUserData(userLocalStorage);
      addToken(userLocalStorage.token);

      navigate('/conta');
    } else {
      navigate('/home');
    }
  }, []);

  async function handleLogin(cpf: string, senha: string) {
    const response = await loginRequest(cpf, senha);

    if (response && response.user && response.token) {
      setLoggedUserData(response);
      addToken(response.token);
      setUserLocalStorage(response);
      navigate('/conta');
    } else {
      console.error('Failed to log in: Invalid response');
    }
  }

  function handleLogout() {
    setLoggedUserData({
      user: {
        cpf: '',
        senha: '',
        id: '',
      },
      token: '',
    });
    if (loggedUserData?.user) removeToken();
    removeUserLocalStorage();
    navigate('/login');
  }

  const contextValue = useMemo(
    () => ({
      ...loggedUserData,
      handleLogin,
      handleLogout,
    }),
    [loggedUserData]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
