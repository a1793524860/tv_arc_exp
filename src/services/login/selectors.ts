import { useSelector } from 'react-redux';
import { SCOPE_NAME } from './constants';

export const useIsLoggedIn = () : { [code : string] : { code : string, localName : string } } =>
  useSelector((state : any) => state[SCOPE_NAME].get('isLoggedIn'));

export const useUserProfile = () => useSelector((state : any) => state[SCOPE_NAME]);

export const useIsUwEnable = () =>
useSelector((state : any) => {
  const login = state[SCOPE_NAME];
  return login.get('isUserUwAuth') === 'Y'
});

