import apiClient, { promiseToObservable } from '../config';

export const login = async(
  { channel, username, password } : { username : string, channel : string, password : string }
) => {
  const data = new FormData();
  data.set('channel', channel);
  data.set('loginId', username);
  data.set('password', password);
  return apiClient({
    method: 'POST',
    url: '/insm/auth-access/auth/login',
    data,
    headers: {'Content-Type': 'multipart/form-data' }
  })
};

export default {
  login: promiseToObservable<{ username : string, channel : string, password : string }>(login),
};
