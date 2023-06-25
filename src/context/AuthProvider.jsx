'use client';
import axios from '@/api/axios';
import { useLocalStorage } from '@/hook/useLocalStorage';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage(
    process.env.CURRENT_USER_CONTEXT_KEY,
    null
  );
  const [errMsg, setErrMsg] = useState();
  const [auth, setAuth] = useState();

  const router = useRouter();

  useEffect(() => {
    async function LoadUserFromLocalStorage() {
      if (token) {
        axios.defaults.headers.Authorization = `Bearer ${token.accessToken}`;
        try {
          const response = await axios.get('/user/detail', null);
          const user = response?.data?.data;
          setAuth(user);
        } catch (err) {
          if (!err?.response) {
            setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
            setErrMsg('Missing Username or Password');
          } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
          } else {
            setErrMsg('Login Failed');
          }
        }
      }
    }
    LoadUserFromLocalStorage();
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        '/auth/login',
        JSON.stringify({
          username: username,
          password: password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const token = {
        accessToken: response?.data?.data?.token,
        refreshToken: response?.data?.data?.refreshToken,
        expireAt: response?.data?.data?.expireAt,
      };
      setToken(token);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
    router.push('/');
    router.refresh;
  };

  const logout = () => {
    console.log(auth);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!auth, auth, setAuth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  const router = useRouter();
  const pathName = usePathname();

  const signInPath = '/sign-in';
  if (isLoading || (!isAuthenticated && pathName !== signInPath)) {
    router.push(signInPath);
    router.refresh();
  }
  return children;
};
