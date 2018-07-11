import {LOGIN_USER, LOGOUT_USER} from '../actions/types';


const USER = {id: 1, firstName: 'David', lastName: 'GEISMAR'}
const INITIAL_STATE = {}


export const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
        console.log('LOGIN_USER')
        return USER
    case LOGOUT_USER:
      console.log('LOGOUT_USER')
      return {}
    default:
      return state;
  }
};
