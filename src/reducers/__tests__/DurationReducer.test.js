import { DurationReducer } from '../DurationReducer';
import { RESET_INFO,
         SELECT_HOUR,
         SELECT_MINUTE,
         START_CHRONO,
         SET_CURRENT_MANUAL_DURATION } from '../../actions/types';

 const INITIAL_STATE = {
   selectedHour: null,
   selectedMinute: null,
   chrono: false
 };

it("handles actions of type RESET_INFO", () =>{
  const action = {
    type: RESET_INFO,
  }
  const newState = DurationReducer(INITIAL_STATE, action);
  expect(newState).toEqual(INITIAL_STATE)
})

it("handles actions of type SELECT_HOUR", () =>{
  const action = {
    type: SELECT_HOUR,
    payload: 17
  }
    const newState = DurationReducer(INITIAL_STATE, action);
    expect(newState.selectedHour).toEqual(17)
})

it("handles actions of type SELECT_MINUTE", () =>{
  const action = {
    type: SELECT_MINUTE,
    payload: 5
  }
    const newState = DurationReducer(INITIAL_STATE, action);
    expect(newState.selectedMinute).toEqual(5)
})

it("handles actions of type SET_CURRENT_MANUAL_DURATION", () =>{
  const action = {
    type: SET_CURRENT_MANUAL_DURATION,
    payload: {
      selectedHour: 12,
      selectedMinute: 10
    }
  }
    const newState = DurationReducer(INITIAL_STATE, action);
    expect(newState.selectedMinute).toEqual(10)
    expect(newState.selectedHour).toEqual(12)
})
