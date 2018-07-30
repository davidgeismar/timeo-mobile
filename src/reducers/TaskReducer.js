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
                        selectedTask: null,
                        searchInit: false,
                        limitToMine: false,
                        searchPattern: ''
                      }

const filterTaskListByScope = (tasks, scope, currentUserId) => {
  var results = []
  for(var i=0; i<tasks.length; i++) {
    if (scope == 'all'){
      return tasks
    }
    else if (scope == 'current_user'){
      if (tasks[i]['userId'] == currentUserId){
        results.push(tasks[i])
      }
    }
  }
  return results
}
export const TaskReducer = (state = INITIAL_STATE, action) => {
  let filteredTasks
  switch (action.type) {
    case LOAD_KANBAN_TASKS:
        return {...state, list: action.payload}
    case UPDATE_SEARCH_PATTERN:
        return { ...state, searchPattern: action.payload}
    case SET_CURRENT_TASK:
        return {...state, selectedTask: action.payload}
    case UNSET_CURRENT_TASK:
        return {...state, selectedTask: null}
    case SEARCH_TASK_INIT:
        return {...state, searchInit: action.payload}
    case DELETE_SELECTED_TASK:
        return {...state, selectedTask: null}
    case CHANGE_TASKLIST_SCOPE:
        return {  ...state,
                  list: action.payload.tasks,
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
