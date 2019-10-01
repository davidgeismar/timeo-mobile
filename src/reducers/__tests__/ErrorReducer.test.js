import { ErrorReducer } from '../ErrorReducer';
import { SET_ERROR } from '../../actions/types';

 const INITIAL_STATE = null

it("handles actions of type SET_ERROR", () =>{
  const action = {
    type: SET_ERROR,
    payload: "Error 404"
  }
  const newState = ErrorReducer(INITIAL_STATE, action);
  expect(newState).toEqual("Error 404")
})
