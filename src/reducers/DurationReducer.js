// ok
import { RESET_INFO,
         SELECT_HOUR,
         SELECT_MINUTE,
         START_CHRONO } from '../actions/types';

const INITIAL_STATE = {
  selectedHour: null,
  selectedMinute: null,
  chrono: false
};

export const DurationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_HOUR:
      return {...state, selectedHour: action.payload}
    case SELECT_MINUTE:
      return {...state, selectedMinute: action.payload}
    case START_CHRONO:
      return {...state, chrono: action.payload}
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};
