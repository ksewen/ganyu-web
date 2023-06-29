import axios from '@/api/axios';
import { useAuthContext } from '@/context/AuthProvider';

const useRefreshToken = () => {
  const { token, setToken } = useAuthContext();

  const refresh = async () => {
    try {
      axios.defaults.headers.Authorization = `Bearer ${token.accessToken}`;
      const response = await axios.post('/token-refresh');
      setToken((prev) => {
        console.log(JSON.stringify(prev));
        console.log(response.data.data.token);
        return { ...prev, accessToken: response.data.data.token };
      });
      return response.data.data.token;
    } catch (err) {
      setToken(null);
    }
  };
  return refresh;
};

export default useRefreshToken;
