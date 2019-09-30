import { ActionKindsReducer } from '../ActionKindsReducer';
import { SET_ACTION_KINDS } from '../../actions/types';

it("handles actions of type LOAD_CLIENTS", () =>{
  const action = {
    type: SET_ACTION_KINDS,
    payload: 'tyo'
  }
    const newState = ClientReducer([], action);
    expect(newState.length).toEqual(1)
})


{
  username:
  password:
  token: 
}
