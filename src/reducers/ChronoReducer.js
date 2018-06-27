import {RESET_INFO, START_CHRONO, STOP_CHRONO, UPDATE_INTERVAL, SET_CHRONO_RUNNING } from '../actions/types';

const INITIAL_STATE = {
  isRunning: false,
  timerValue: 0,
  startDate: null,
  stopDate: null,
  isSaved: false,
  isOnHold: false
};

export const ChronoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_CHRONO:
      return {...state, startDate: action.payload, isRunning: true}
    case STOP_CHRONO:
      return {...state, stopDate: action.payload, timerValue: action.payload, isRunning: false, isOnHold: true}
    case UPDATE_INTERVAL:
      return {...state, interval: state.startDate - action.payload}
    case SET_CHRONO_RUNNING:
      return {...state, isRunning: action.payload}
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};
