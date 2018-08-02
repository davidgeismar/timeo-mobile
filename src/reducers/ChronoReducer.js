import { RESET_INFO,
         RESET_CHRONO,
         START_TIMER,
         STOP_TIMER,
         SET_CURRENT_CHRONO_BASETIME
      } from '../actions/types';

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

export const ChronoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_TIMER:
      return {
         ...state,
         baseTime: action.payload.baseTime,
         startedAt: action.payload.now,
         stoppedAt: undefined,
         isRunning: true,
         hasRun: true,
       };
    case STOP_TIMER:
      return  {
        ...state,
        stoppedAt: undefined,
        startedAt: undefined,
        baseTime: action.payload.baseTime,
        isRunning: false,
        isOnHold: true
      }
    case RESET_CHRONO:
      return {
        ...state,
        startedAt: undefined,
        stoppedAt: undefined
      }
    case SET_CURRENT_CHRONO_BASETIME:
      return {
        ...state,
        baseTime: action.payload,
        startedAt: undefined,
        stoppedAt: undefined
      }
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};
