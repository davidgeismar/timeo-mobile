// SET_CURRENT_EVENT_TABBAR_STATE ?

import { TabReducer } from '../TabReducer';
import { SET_CURRENT_EVENT_TABBAR_STATE,
         ACTIVATE_TAB,
         RESET_INFO,
         DISABLE_TABS } from '../../actions/types';

 const INITIAL_STATE = {
   activeTab: null,
   disabledTabs: ['chrono', 'time', 'client', 'project', 'info']
 };

it("handles actions of type ACTIVATE_TAB", () =>{
  const action = {
    type: ACTIVATE_TAB,
    payload: "project"
  }
  const newState = TabReducer(INITIAL_STATE, action);
  expect(newState.activeTab).toEqual("project")
  expect(newState.disabledTabs).toEqual(expect.not.arrayContaining(["project"]));
})

it("handles actions of type DISABLE_TABS", () =>{
  const action = {
    type: DISABLE_TABS,
    payload: ['project', 'chrono']
  }
  const newState = TabReducer(INITIAL_STATE, action);
  expect(newState.disabledTabs).toEqual(['project', 'chrono'])
})

it("handles actions of type RESET_INFO", () =>{
  const action = {
    type: RESET_INFO,
    payload: "bla"
  }
  const newState = TabReducer({}, action);
  expect(newState).toEqual(INITIAL_STATE)
})
