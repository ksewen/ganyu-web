import axios from '@/api/axios';
import { useAuthContext } from '@/context/AuthProvider';

const useRefreshToken = () => {
  const { token, setToken } = useAuthContext();

  const refresh = async () => {
    try {
      axios.defaults.headers.Authorization = `Bearer ${token.accessToken}`;
      const response = await axios.post('/token-refresh');
      const token = {
        accessToken: response?.data?.data?.token,
        refreshToken: response?.data?.data?.refreshToken,
        expireAt: response?.data?.data?.expireAt,
      };
      setToken(token);
      return response.data.data.token;
    } catch (err) {
      setToken(null);
    }
  };
  return refresh;
};

export default useRefreshToken;
