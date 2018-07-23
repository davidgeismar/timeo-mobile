import { SET_ACTION_KINDS } from '../actions/types';

const INITIAL_STATE = null
export const ActionKindsReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTION_KINDS:
      return action.payload.action_kinds
    default:
      return state;
  }
};
