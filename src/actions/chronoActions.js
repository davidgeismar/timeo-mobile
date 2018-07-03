import {START_CHRONO, SET_CHRONO_RUNNING, UPDATE_INTERVAL, STOP_CHRONO} from './types'

export const startChrono = () => {
  return {
    type: START_CHRONO,
    payload: true
  }
}

export const setChronoRunning = () =>{
  return {
    type: SET_CHRONO_RUNNING,
    payload: true
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
