// TODO modelise Cards in the correct way
import { KanbanReducer } from '../KanbanReducer';
import { RESET_INFO,
         SET_CURRENT_KANBAN,
         LOAD_PROJECT_KANBANS,
         DELETE_SELECTED_KANBAN } from '../../actions/types';

const INITIAL_STATE = {list: [], selectedKanban: null}

it("handles actions of type LOAD_PROJECT_KANBANS", () =>{
  const action = {
    type: LOAD_PROJECT_KANBANS,
    payload: ["do that", "do this"]
  }
    const newState = KanbanReducer(INITIAL_STATE, action);
    expect(newState.list).toEqual(["do that", "do this"])
})

it("handles actions of type SET_CURRENT_KANBAN", () =>{
  const action = {
    type: SET_CURRENT_KANBAN,
    payload: "do this"
  }
    const newState = KanbanReducer({startedAt: 123, stoppedAt: 456}, action);
    expect(newState.selectedKanban).toEqual("do this")
})

it("handles actions of type DELETE_SELECTED_KANBAN", () =>{
  const action = {
    type: DELETE_SELECTED_KANBAN,
  }
    const newState = KanbanReducer(INITIAL_STATE, action);
    expect(newState.selectedKanban).toBeNull()
})

it("handles actions of type RESET_INFO", () =>{
  const action = {
    type: RESET_INFO
  }
    const newState = KanbanReducer(INITIAL_STATE, action);
    expect(newState).toEqual(INITIAL_STATE)

})
