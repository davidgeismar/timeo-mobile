import {LOGIN_SUCCESS, LOGIN_FAILURE, AUTH_UPDATE, RESET_AUTH_TOKEN} from '../actions/types';

const INITIAL_STATE = { username: '', password: '', token: ''};

export const AuthenticationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_UPDATE:
      console.log('ARTICLE_UPDATE');
      console.log(action.payload)
      return {...state, [action.payload.prop]: action.payload.value}
    case LOGIN_SUCCESS:
    console.log('in LOGIN SUCCESS');
    console.log(action.payload)
      return {...state, token: action.payload.token };
    case LOGIN_FAILURE:
      console.log('in LOGIN FAILURE');
      console.log(action.payload)
      return state
    case RESET_AUTH_TOKEN:
      return {...state, token: action.payload };
    default:
      return state;
  }
};
