import { RESET_INFO,
         SELECT_ACTION } from '../actions/types';

const INITIAL_STATE = ''

export const ActionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_ACTION:
      return action.payload
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};
