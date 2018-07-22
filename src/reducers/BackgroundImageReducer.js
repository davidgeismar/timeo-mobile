import { SET_BACKGROUND_IMAGE } from '../actions/types';

const INITIAL_STATE = null
export const BackgroundImageReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BACKGROUND_IMAGE:
      console.log('in SET_BACKGROUND_IMAGE reducer')
      console.log(action.payload)
      return 'https://www.bing.com' + action.payload
    default:
      return state;
  }
};
