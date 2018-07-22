import { RESET_INFO,
         SEARCH_TASK_INIT,
         SET_CURRENT_TASK,
         LOAD_KANBAN_TASKS,
         DELETE_SELECTED_TASK,
         CHANGE_TASKLIST_SCOPE,
         SEARCH_TASK,
         UNSET_CURRENT_TASK
       } from '../actions/types';


// const TASKS = [ {id: 1, description: 'Tester Fonction 31/07', creationDate: '2018-06-11', clientName: 'EDULIB', projectName: 'Edulib 2018', status: 'To Do', taskNumber: 'Edul-2691', kindColor: '#4EBAD1', kanbanId: 1, userId: 1},
//                 {id: 2, description: 'staging > erreur 500 sur...', creationDate: '2018-06-11', clientName: 'EDULIB', projectName: 'Edulib 2018', status: 'To Do', taskNumber: 'Edul-2731', kindColor: '#F8C67A', kanbanId: 1, userId: 1},
//                 {id: 6, description: 'blablabla', creationDate: '2018-06-11', clientName: 'EDULIB', projectName: 'Edulib 2018', status: 'To Do', taskNumber: 'Edul-2731', kindColor: '#F8C67A', kanbanId: 1, userId: 2},
//
//                 {id: 3, description: 'Fichier source rne', creationDate: '2018-06-11', clientName: 'EDULIB', projectName: 'Edulib 2018', status: 'To Fix', taskNumber: 'Edul-2630', kindColor: '#ECA9AD', kanbanId: 1, userId: 1},
//                 {id: 4, description: 'Fichier source rne', creationDate: '2018-06-11', clientName: 'EDULIB', projectName: 'Edulib 2018', status: 'To Fix', taskNumber: 'Edul-2630', kindColor: '#51B8F3', kanbanId: 1, userId: 1},
//                 {id: 5, description: 'Fichier source rne', creationDate: '2018-06-11', clientName: 'EDULIB', projectName: 'Edulib 2018', status: 'To Fix', taskNumber: 'Edul-2630', kindColor: '#51B8F3', kanbanId: 1, userId: 1},
//                 {id: 7, description: 'bloubloublou', creationDate: '2018-06-11', clientName: 'EDULIB', projectName: 'Edulib 2018', status: 'To Fix', taskNumber: 'Edul-2630', kindColor: '#51B8F3', kanbanId: 1, userId: 2}
//               ]
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
        console.log('LOAD_KANBAN_TASKS')
        console.log(action.payload)
        return {...state, list: action.payload}
    case SET_CURRENT_TASK:
        console.log('SET_CURRENT_TASK')
        console.log(action.payload)
        return {...state, selectedTask: action.payload}
    case UNSET_CURRENT_TASK:
        console.log('SET_CURRENT_TASK')
        console.log(action.payload)
        return {...state, selectedTask: null}
    case SEARCH_TASK_INIT:
        console.log('SEARCH_TASK_INIT')
        console.log(action.payload)
        return {...state, searchInit: action.payload}
    case DELETE_SELECTED_TASK:
        console.log('DELETE_SELECTED_KANBAN')
        return {...state, selectedTask: null}
    case CHANGE_TASKLIST_SCOPE:
        console.log('CHANGE_TASKS_SCOPE')
        console.log(action.payload)
        filteredTasks = filterTaskListByScope(TASKS, action.payload.scope, action.payload.currentUserId)
        console.log(filteredTasks)
        return {...state, list: filteredTasks, scope: action.payload.scope}
    case SEARCH_TASK:
      console.log('SEARCH_TASK')
      console.log(action.payload)
      filteredTasks = searchTasks(TASKS, action.payload)
      console.log('filteredTasks')
      console.log(filteredTasks)
      return {...state, list: filteredTasks}
      return INITIAL_STATE
    case RESET_INFO:
      console.log('RESET_INFO')
      return INITIAL_STATE
    default:
      return state;
  }
};
