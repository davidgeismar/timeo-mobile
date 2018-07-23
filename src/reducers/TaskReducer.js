import { RESET_INFO,
         SEARCH_TASK_INIT,
         SET_CURRENT_TASK,
         LOAD_KANBAN_TASKS,
         DELETE_SELECTED_TASK,
         CHANGE_TASKLIST_SCOPE,
         SEARCH_TASK,
         UNSET_CURRENT_TASK
       } from '../actions/types';


const INITIAL_STATE = {list: [], selectedTask: null, searchInit: false, scope: 'current_user'}

const searchTasks = (tasks, query) => {
  var results = [];
  if (query == "") {
    return tasks
  }
  var re = new RegExp(query, "i");
  for(var i=0; i<tasks.length; i++) {
    for(key in tasks[i]) {
      if (typeof(tasks[i][key]) == 'string') {
        if(tasks[i][key].search(re)!=-1) {
          results.push(tasks[i]);
        }
      }
    }
  }
  return results
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
    case SET_CURRENT_TASK:
        return {...state, selectedTask: action.payload}
    case UNSET_CURRENT_TASK:
        return {...state, selectedTask: null}
    case SEARCH_TASK_INIT:
        return {...state, searchInit: action.payload}
    case DELETE_SELECTED_TASK:
        return {...state, selectedTask: null}
    case CHANGE_TASKLIST_SCOPE:
        filteredTasks = filterTaskListByScope(TASKS, action.payload.scope, action.payload.currentUserId)
        return {...state, list: filteredTasks, scope: action.payload.scope}
    case SEARCH_TASK:
      filteredTasks = searchTasks(TASKS, action.payload)
      return {...state, list: filteredTasks}
      return INITIAL_STATE
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};
