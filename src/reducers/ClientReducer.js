import { LOAD_CLIENTS } from '../actions/types';

const INITIAL_STATE = []

export const ClientReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_CLIENTS:
      return action.payload
    default:
      return state;
  }
};
