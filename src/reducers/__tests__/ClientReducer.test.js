import { ClientReducer } from '../ClientReducer';
import { LOAD_CLIENTS } from '../../actions/types';

it("handles actions of type LOAD_CLIENTS", () =>{
  const action = {
    type: LOAD_CLIENTS,
    payload: [{
      name: "SERENIS"
    }]
  }
    const newState = ClientReducer([], action);
    expect(newState.length).toEqual(1)
})
