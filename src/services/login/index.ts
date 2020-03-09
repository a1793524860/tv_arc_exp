import {
  LOGIN, LoginAction, ReceivedUserProfileAction,
  RECEIVED_USER_PROFILE,
  LOGOUT, LogoutAction
} from './actions';

export const login = (channel : string, username : string, password : string) : LoginAction => ({
  type: LOGIN,
  payload: { channel, username, password },
});

export const receivedUserProfile = (payload : any) : ReceivedUserProfileAction => ({
  type: RECEIVED_USER_PROFILE,
  payload,
});

export const logout = () : LogoutAction => ({
  type: LOGOUT,
  payload: undefined
});