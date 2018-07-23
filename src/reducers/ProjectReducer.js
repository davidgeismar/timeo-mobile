import { RESET_INFO,
         LOAD_CLIENT_PROJECTS,
         SELECT_ACTION } from '../actions/types';
const INITIAL_STATE = []
export const ProjectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_CLIENT_PROJECTS:
        return action.payload
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};
