// diff between INIT LOGIN and LOGOUT
import {LOGIN_USER, LOGOUT_USER, INITIALIZE_USER} from '../actions/types';


const INITIAL_STATE = {}


export const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIALIZE_USER:
      return action.payload
    case LOGIN_USER:
        return state
    case LOGOUT_USER:
      return {}
    default:
      return state;
  }
};
