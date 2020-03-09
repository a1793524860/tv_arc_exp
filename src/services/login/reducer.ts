import { fromJS } from 'immutable';
import {
  RECEIVED_USER_PROFILE,
  LoginActionTypesForReducer,
  LOGOUT,
} from './actions';
import { SCOPE_NAME } from './constants';


const initialState = fromJS({
  agentCode: undefined,
  agentName: undefined,
  branchCode: undefined,
  brokerCode: undefined,
  brokerName: undefined,
  createdUserCom: undefined,
  createdUserId: undefined,
  solicitor: undefined,
  isLoggedIn: false,
  email: undefined,
  username: undefined,
  motorOnly: undefined,
});

const reducer = (state = initialState, action : LoginActionTypesForReducer) => {

  const { payload, type } = action;

  switch (type) {

    case RECEIVED_USER_PROFILE:
      return state
        .set('isLoggedIn', true)
        .set('channelType', payload.channelType)
        .set('channelCode', payload.channelCode)
        .set('channel', payload.channelCode)
        .set('loginId', payload.loginId)
        .set('agentCode', payload.agentCode)
        .set('agentName', payload.agentName)
        .set('branchCode', payload.branchCode)
        .set('brokerCode', payload.brokerCode)
        .set('brokerName', payload.brokerName)
        .set('createdUserCom', payload.createdUserCom)
        .set('createdUserId', payload.createdUserId)
        .set('solicitor', payload.solicitor)
        .set('email', payload.email)
        .set('name', payload.name)
        .set('username', payload.username)
        .set('motorOnly', payload.motorOnly)
        .set('isUserUwAuth', payload.isUserUwAuth);

    case LOGOUT:
        return initialState;

    default:
      return state;
  }

}

export default {
  name: SCOPE_NAME,
  reducer
}