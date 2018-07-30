import { START_TIMER,
         STOP_TIMER,
         UPDATE_INTERVAL,
         STOP_CHRONO,
        ACTIVATE_TAB,
        UPDATE_TIMERVALUE} from './types'




export const startTimer = (baseTime = 0) => {
  console.log('in startimers')
  console.log(baseTime)
  return(dispatch) => {
      dispatch({
        type: ACTIVATE_TAB,
        payload: 'chrono'
      });
      dispatch({
        type: START_TIMER,
        payload: {  baseTime: baseTime,
                    now: new Date().getTime() }
      })
  };
}
export const stopTimer = (baseTime) => {
  return {
    type: STOP_TIMER,
    payload: {now: new Date().getTime(), baseTime: baseTime}
  };
}

// function resetTimer() {
//   return {
//     type: "RESET_TIMER",
//     now: new Date().getTime()
//   }
// }


// const setChronoRunningSuccess = (dispatch) => {
//   dispatch({
//     type: SET_CHRONO_RUNNING,
//     payload: true
//   });
//   dispatch({
//     type: ACTIVATE_TAB,
//     payload: 'chrono'
//   });
// }
// export const setChronoRunning = (dispatch) =>{
//   return(dispatch) => {
//     setChronoRunningSuccess(dispatch)
//   }
// }
//
// export const updateChronoTimerValue = (timerValue) => {
//   return {
//     type: UPDATE_TIMERVALUE,
//     payload: timerValue
//   }
// }
// export const stopChrono = (timerValue) => {
//   return {
//     type: STOP_CHRONO,
//     payload: timerValue
//   }
// }
