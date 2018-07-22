import { SET_ACTION_KINDS } from '../actions/types';

const INITIAL_STATE = null
export const ActionKindsReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTION_KINDS:
      console.log('in SET_ACTION_KINDS reducer')
      console.log(action.payload)
      console.log(action.payload.action_kinds)
      return action.payload.action_kinds
    default:
      return state;
  }
};
