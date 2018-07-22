import { SET_LOADER } from '../actions/types';

const INITIAL_STATE = false

export const LoaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADER:
      return action.payload
    default:
      return state;
  }
};
