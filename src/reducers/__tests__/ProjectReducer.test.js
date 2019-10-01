import { ProjectReducer } from '../ProjectReducer';
import{  RESET_INFO,
         LOAD_CLIENT_PROJECTS,
         SELECT_ACTION,
         RESET_PROJECTS
       } from '../../actions/types';

const INITIAL_STATE = []

it("handles actions of type LOAD_CLIENT_PROJECTS", () =>{
  const action = {
    type: LOAD_CLIENT_PROJECTS,
    payload: ["project 1", "project 2"]
  }
  const newState = ProjectReducer(INITIAL_STATE, action);
  expect(newState).toEqual(["project 1", "project 2"])
})

it("handles actions of type RESET_PROJECTS", () =>{
  const action = {
    type: RESET_PROJECTS,
  }
    const newState = ProjectReducer(INITIAL_STATE, action);
    expect(newState).toEqual([])
})

it("handles actions of type RESET_INFO", () =>{
  const action = {
    type: RESET_INFO
  }
    const newState = ProjectReducer(INITIAL_STATE, action);
    expect(newState).toEqual(INITIAL_STATE)
})
