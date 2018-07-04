import { SET_CHRONO_RUNNING,
         UPDATE_INTERVAL,
         STOP_CHRONO,
        ACTIVATE_TAB } from './types'


const setChronoRunningSuccess = (dispatch) => {
  dispatch({
    type: SET_CHRONO_RUNNING,
    payload: true
  });
  dispatch({
    type: ACTIVATE_TAB,
    payload: 'chrono'
  });
}
export const setChronoRunning = (dispatch) =>{
  return(dispatch) => {
    setChronoRunningSuccess(dispatch)
  }
}

export const updateInterval = (eventId) => {
  return {
    type: UPDATE_INTERVAL,
    payload: eventId
  }
}
export const stopChrono = (timerValue) => {
  return {
    type: STOP_CHRONO,
    payload: timerValue
  }
}
