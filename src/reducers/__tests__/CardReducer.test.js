import { CardReducer } from '../CardReducer';
import {  RESET_INFO,
         SEARCH_TASK_INIT,
         SET_CURRENT_TASK,
         LOAD_KANBAN_TASKS,
         DELETE_SELECTED_TASK,
         CHANGE_TASKLIST_SCOPE,
         SEARCH_TASK,
         UNSET_CURRENT_TASK,
         UPDATE_SEARCH_PATTERN } from '../../actions/types';

 const INITIAL_STATE = { list: [],
                         selectedCard: null,
                         searchInit: false,
                         limitToMine: false,
                         searchPattern: ''
                       }
it("handles actions of type LOAD_KANBAN_TASKS", () =>{
  const action = {
    type: LOAD_KANBAN_TASKS,
    payload: ["do that", "do this"]
  }
    const newState = CardReducer(INITIAL_STATE, action);
    console.log(newState.list)
    expect(newState.list).toEqual(["do that", "do this"])
})

it("handles actions of type UPDATE_SEARCH_PATTERN", () =>{
  const action = {
    type: UPDATE_SEARCH_PATTERN,
    payload: "hammond"
  }
    const newState = CardReducer(INITIAL_STATE, action);
    expect(newState.searchPattern).toEqual('hammond')
})

it("handles actions of type SET_CURRENT_TASK", () =>{
  const action = {
    type: SET_CURRENT_TASK,
    payload: "hammond"
  }
    const newState = CardReducer(INITIAL_STATE, action);
    expect(newState.selectedCard).toEqual('hammond')
})

it("handles actions of type UNSET_CURRENT_TASK", () =>{
  const action = {
    type: UNSET_CURRENT_TASK,
    payload: "/john.hamond"
  }
    const newState = CardReducer(INITIAL_STATE, action);
    expect(newState.selectedCard).toEqual(null)
})

it("handles actions of type SEARCH_TASK_INIT", () =>{
  const action = {
    type: SEARCH_TASK_INIT,
    payload: "hamond"
  }
    const newState = CardReducer(INITIAL_STATE, action);
    expect(newState.searchInit).toEqual("hamond")
})

it("handles actions of type DELETE_SELECTED_TASK", () =>{
  const action = {
    type: DELETE_SELECTED_TASK,
    payload: "/john.hamond"
  }
    const newState = CardReducer(INITIAL_STATE, action);
    expect(newState.selectedCard).toEqual(null)
})

it("handles actions of type CHANGE_TASKLIST_SCOPE", () =>{
  const action = {
    type: CHANGE_TASKLIST_SCOPE,
    payload: { cards: ["do that", "do this"],limitToMine: true }
  }
    const newState = CardReducer(INITIAL_STATE, action);
    expect(newState.list).toEqual(["do that", "do this"])
    expect(newState.limitToMine).toEqual(true)
})

it("handles actions of type SEARCH_TASK", () =>{
  const action = {
    type: SEARCH_TASK,
    payload: ["do that", "do this"]
  }
    const newState = CardReducer(INITIAL_STATE, action);
    expect(newState.list).toEqual(["do that", "do this"])
})

it("handles actions of type RESET_INFO", () =>{
  const action = {
    type: RESET_INFO,
  }
    const newState = CardReducer(INITIAL_STATE, action);
    expect(newState).toEqual(INITIAL_STATE)
})
