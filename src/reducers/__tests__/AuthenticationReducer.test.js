import { AuthenticationReducer } from '../AuthenticationReducer';
import {  SET_AUTH_TOKEN,
          LOGIN_FAILURE,
          AUTH_UPDATE,
          RESET_AUTH_TOKEN } from '../../actions/types';

const INITIAL_STATE = { username: '', password: '', token: ''}
it("handles actions of type SET_AUTH_TOKEN", () =>{
  const action = {
    type: SET_AUTH_TOKEN,
    payload: { token: 'xyzw' }
  }
    const newState = AuthenticationReducer(INITIAL_STATE, action);
    expect(newState.token).toEqual('xyzw')
})

it("handles actions of type AUTH_UPDATE", () =>{
  const action = {
    type: AUTH_UPDATE,
    payload: { prop: 'username', value: "serenis_admin" }
  }
    const newState = AuthenticationReducer(INITIAL_STATE, action);
    expect(newState.username).toEqual('serenis_admin')
})

it("handles actions of type RESET_AUTH_TOKEN", () =>{
  const action = {
    type: RESET_AUTH_TOKEN,
    payload: 'new_token'
  }
    const newState = AuthenticationReducer(INITIAL_STATE, action);
    expect(newState.token).toEqual('new_token')
})

it("handles actions of type LOGIN_FAILURE", () =>{
  const action = {
    type: LOGIN_FAILURE,
  }
    const newState = AuthenticationReducer(INITIAL_STATE, action);
    console.log(newState)
    expect(newState.token).toEqual('')
    expect(newState.username).toEqual('')
    expect(newState.password).toEqual('')
})
