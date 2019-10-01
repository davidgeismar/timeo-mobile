import { ActionKindsReducer } from '../ActionKindsReducer';
import { SET_ACTION_KINDS } from '../../actions/types';

const INITIAL_STATE = null
it("handles actions of type SET_ACTION_KINDS", () =>{
  const action = {
    type: SET_ACTION_KINDS,
    payload: { action_kinds: ['telephone', 'reunion'] }
  }
    const newState = ClientReducer(INITIAL_STATE, action);
    expect(newState).toEqual(['telephone', 'reunion'])
})
