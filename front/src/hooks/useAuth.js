import { useSelector } from 'react-redux';

export const useAuth = () => {
  const isAuth = useSelector(state => state.auth.token);

  return isAuth;
};
