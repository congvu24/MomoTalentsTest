import {AuthState} from '@/redux/reducer/auth.slice';
import {useSelector} from 'react-redux';

const useAuth = (): boolean => {
  const token = useSelector((state: {auth: AuthState}) => state.auth.token);
  return token !== null && token !== undefined;
};

export default useAuth;
