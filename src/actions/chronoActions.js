// clean up ok
// actions related to my chrono timer
import { START_TIMER,
         STOP_TIMER,
        ACTIVATE_TAB,
        } from './types'

// starts timer
export const startTimer = (baseTime = 0) => {
  return(dispatch) => {
      dispatch({
        type: ACTIVATE_TAB,
        payload: 'chrono'
      });
      // basetime is the time with which the chrono is starting (for instance if the chrono has never run before it starts at 0)
      // now is the timestamp when the chrono starts
      dispatch({
        type: START_TIMER,
        payload: {  baseTime: baseTime,
                    now: new Date().getTime()
                  }
      })
  };
}
// stops timer
export const stopTimer = (baseTime) => {
  return {
    type: STOP_TIMER,
    payload: {  now: new Date().getTime(),
                baseTime: baseTime
              }
  };
}
