// TODO CHEck this initial_state (test shouldnt always start with INITIAL_STATE)

import { ChronoReducer } from '../ChronoReducer';
import { RESET_INFO,
         RESET_CHRONO,
         START_TIMER,
         STOP_TIMER,
         SET_CURRENT_CHRONO_BASETIME } from '../../actions/types';

 const INITIAL_STATE = {
   isRunning: false,
   hasRun: false,
   timerValue: 0,
   baseTime: 0,
   startedAt: undefined,
   stoppedAt: undefined,
   isSaved: false,
   isOnHold: false
 };
it("handles actions of type RESET_INFO", () =>{
  const action = {
    type: RESET_INFO,
    payload: ["do that", "do this"]
  }
    const newState = ChronoReducer(INITIAL_STATE, action);
    expect(newState).toEqual(INITIAL_STATE)
})

it("handles actions of type RESET_CHRONO", () =>{
  const action = {
    type: RESET_CHRONO,
    payload: "hammond"
  }
    const newState = ChronoReducer({startedAt: 123, stoppedAt: 456}, action);
    expect(newState.startedAt).toBeUndefined()
    expect(newState.stoppedAt).toBeUndefined()
})

it("handles actions of type START_TIMER", () =>{
  const action = {
    type: START_TIMER,
    payload: {
      now: 123,
      baseTime: 456
    }
  }
    const newState = ChronoReducer(INITIAL_STATE, action);
    expect(newState.baseTime).toEqual(456)
    expect(newState.startedAt).toEqual(123)
    expect(newState.isRunning).toBeTruthy()
    expect(newState.hasRun).toBeTruthy()
})

it("handles actions of type STOP_TIMER", () =>{
  const action = {
    type: STOP_TIMER,
    payload: {
      baseTime: 789
    }
  }
    const newState = ChronoReducer(INITIAL_STATE, action);
    expect(newState.baseTime).toEqual(789)
    expect(newState.isRunning).toBeFalsy()
    expect(newState.isOnHold).toBeTruthy()
})

it("handles actions of type SET_CURRENT_CHRONO_BASETIME", () =>{
  const action = {
    type: SET_CURRENT_CHRONO_BASETIME,
    payload: 123
  }
    const newState = ChronoReducer(INITIAL_STATE, action);
    expect(newState.baseTime).toEqual(123)
    expect(newState.startedAt).toBeUndefined()
    expect(newState.stoppedAt).toBeUndefined()
})
