import { RESET_INFO,
         SEARCH_TASK_INIT,
         SET_CURRENT_TASK,
         LOAD_KANBAN_TASKS,
         DELETE_SELECTED_TASK,
         CHANGE_TASKLIST_SCOPE,
         SEARCH_TASK,
         UNSET_CURRENT_TASK,
         UPDATE_SEARCH_PATTERN
       } from '../actions/types';


const INITIAL_STATE = { list: [],
                        selectedCard: null,
                        searchInit: false,
                        limitToMine: false,
                        searchPattern: ''
                      }

export const CardReducer = (state = INITIAL_STATE, action) => {
  let filteredCards
  switch (action.type) {
    case LOAD_KANBAN_TASKS:
        return {...state, list: action.payload}
    case UPDATE_SEARCH_PATTERN:
        return { ...state, searchPattern: action.payload}
    case SET_CURRENT_TASK:
        return {...state, selectedCard: action.payload}
    case UNSET_CURRENT_TASK:
        return {...state, selectedCard: null}
    case SEARCH_TASK_INIT:
        return {...state, searchInit: action.payload}
    case DELETE_SELECTED_TASK:
        return {...state, selectedCard: null}
    case CHANGE_TASKLIST_SCOPE:
        return {  ...state,
                  list: action.payload.cards,
                  limitToMine: action.payload.limitToMine }
    case SEARCH_TASK:
      return {  ...state,
                list: action.payload,
               }
      return INITIAL_STATE
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};
