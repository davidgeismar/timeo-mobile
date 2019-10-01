//

import { UserReducer } from '../UserReducer';
import { LOGIN_USER, LOGOUT_USER, INITIALIZE_USER } from '../../actions/types';

const INITIAL_STATE = {}

it("handles actions of type INITIALIZE_USER", () =>{
  const action = {
    type: INITIALIZE_USER,
    payload: {firstName: "David", lastName: "Geismar"}
  }
  const newState = UserReducer(INITIAL_STATE, action);
  expect(newState).toEqual({firstName: "David", lastName: "Geismar"})
})

it("handles actions of type LOGIN_USER", () =>{
  const action = {
    type: LOGIN_USER,
    payload: {firstName: "David", lastName: "Geismar"}
  }
  const newState = UserReducer(INITIAL_STATE, action);
  expect(newState).toEqual({})
})

it("handles actions of type LOGOUT_USER", () =>{
  const action = {
    type: LOGOUT_USER,
    payload: {firstName: "David", lastName: "Geismar"}
  }
  const newState = UserReducer({}, action);
  expect(newState).toEqual({})
})
