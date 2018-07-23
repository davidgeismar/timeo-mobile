import { RESET_INFO,
         SET_CURRENT_KANBAN,
         LOAD_PROJECT_KANBANS,
         DELETE_SELECTED_KANBAN
       } from '../actions/types';
const INITIAL_STATE = {list: [], selectedKanban: null}
export const KanbanReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PROJECT_KANBANS:
        return {...state, list: action.payload}
    case SET_CURRENT_KANBAN:
        return {...state, selectedKanban: action.payload}
    case DELETE_SELECTED_KANBAN:
        return {...state, selectedKanban: null}
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};
