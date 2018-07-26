import { SET_RESOURCES, RESET_INFO } from '../actions/types';
const INITIAL_STATE = []
export const ResourceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_RESOURCES:
        return action.payload
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};
