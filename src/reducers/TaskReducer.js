import { RESET_INFO,
         SEARCH_TASK_INIT,
         SET_CURRENT_TASK,
         LOAD_KANBAN_TASKS,
         DELETE_SELECTED_TASK } from '../actions/types';


const TASKS = [{id: 1, description: 'Tester Fonction 31/07', creationDate: '2018-06-11', clientName: 'EDULIB', projectName: 'Edulib 2018', status: 'To Do', taskNumber: 'Edul-2691', kanbanId: 1},
                {id: 2, description: 'staging > erreur 500 sur...', creationDate: '2018-06-11', clientName: 'EDULIB', projectName: 'Edulib 2018', status: 'To Do', taskNumber: 'Edul-2731', kanbanId: 1},
                {id: 3, description: 'Fichier source rne', creationDate: '2018-06-11', clientName: 'EDULIB', projectName: 'Edulib 2018', status: 'To Fix', taskNumber: 'Edul-2630', kanbanId: 1}
              ]
const INITIAL_STATE = {list: TASKS, selectedTask: null, searchInit: false}
export const TaskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_KANBAN_TASKS:
        console.log('LOAD_KANBAN_TASKS')
        console.log(action.payload)
        tasks = TASKS.filter(task => task.kanbanId == action.payload )
        console.log(tasks)
        return {...state, list: tasks}
    case SET_CURRENT_TASK:
        console.log('SET_CURRENT_TASK')
        console.log(action.payload)
        return {...state, selectedTask: action.payload}
    case SEARCH_TASK_INIT:
        console.log('SEARCH_TASK_INIT')
        console.log(action.payload)
        return {...state, searchInit: action.payload}
    case DELETE_SELECTED_TASK:
        console.log('DELETE_SELECTED_KANBAN')
        return {...state, selectedTask: null}
    case RESET_INFO:
      console.log('RESET_INFO')
      return INITIAL_STATE
    default:
      return state;
  }
};
