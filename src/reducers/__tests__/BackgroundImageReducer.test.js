import { BackgroundImageReducer } from '../BackgroundImageReducer';
import {  SET_BACKGROUND_IMAGE } from '../../actions/types';

const INITIAL_STATE = null
it("handles actions of type SET_BACKGROUND_IMAGE", () =>{
  const action = {
    type: SET_BACKGROUND_IMAGE,
    payload: "/john.hamond"
  }
    const newState = BackgroundImageReducer(INITIAL_STATE, action);
    expect(newState).toEqual('https://www.bing.com/john.hamond')
})
