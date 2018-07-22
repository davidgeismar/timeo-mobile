import {LOGIN_USER, LOGOUT_USER, INITIALIZE_USER} from '../actions/types';



const INITIAL_STATE = {}


export const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIALIZE_USER:
      console.log('in INITIALIZE_USER reducer')
      console.log(action.payload)
      return action.payload
    case LOGIN_USER:
        console.log('LOGIN_USER')
        return state
    case LOGOUT_USER:
      console.log('LOGOUT_USER')
      return {}
    default:
      return state;
  }
};
