import {SET_AUTH_TOKEN, LOGIN_FAILURE, AUTH_UPDATE, RESET_AUTH_TOKEN} from '../actions/types';

const INITIAL_STATE = { username: '', password: '', token: ''};

export const AuthenticationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_UPDATE:
      return {...state, [action.payload.prop]: action.payload.value}
    case SET_AUTH_TOKEN:
      return {...state, token: action.payload.token };
    case LOGIN_FAILURE:
      return state
    case RESET_AUTH_TOKEN:
      return {...state, token: action.payload };
    default:
      return state;
  }
};
