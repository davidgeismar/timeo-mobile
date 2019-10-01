import { ResourceReducer } from '../ResourceReducer';
import {  SET_RESOURCES, RESET_INFO } from '../../actions/types';

const INITIAL_STATE = null

it("handles actions of type SET_RESOURCES", () =>{
  const action = {
    type: SET_RESOURCES,
    payload: "bla"
  }
  const newState = ResourceReducer(INITIAL_STATE, action);
  expect(newState).toEqual("bla")
})
