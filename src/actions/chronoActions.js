import { SET_CHRONO_RUNNING,
         UPDATE_INTERVAL,
         STOP_CHRONO,
        ACTIVATE_TAB,
        UPDATE_TIMERVALUE} from './types'


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

export const updateChronoTimerValue = (timerValue) => {
  return {
    type: UPDATE_TIMERVALUE,
    payload: timerValue
  }
}
export const stopChrono = (timerValue) => {
  return {
    type: STOP_CHRONO,
    payload: timerValue
  }
}
