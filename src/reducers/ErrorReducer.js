import { SET_ERROR } from '../actions/types';

const INITIAL_STATE = null

export const ErrorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload
    default:
      return state;
  }
};
