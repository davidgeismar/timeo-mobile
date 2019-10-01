import { LoaderReducer } from '../LoaderReducer';
import { SET_LOADER } from '../../actions/types';

 const INITIAL_STATE = null

it("handles actions of type SET_LOADER", () =>{
  const action = {
    type: SET_LOADER,
    payload: true
  }
  const newState = LoaderReducer(INITIAL_STATE, action);
  expect(newState).toBeTruthy()
})
