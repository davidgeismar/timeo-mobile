import { Actions } from 'react-native-router-flux';
import { DELETE_SELECTED_TASK,
         SET_CURRENT_TASK,
         SAVE_TASK,
         SEARCH_TASK_INIT,
         LOAD_KANBAN_TASKS} from './types'


 const loadKanbanTasksSuccess = (dispatch, projectId) => {
     dispatch({
       type: LOAD_KANBAN_TASKS,
       payload: projectId
     });
     Actions.kanbanList()
 }

 export const loadKanbanTasks= (kanbanId) => {
   console.log('in loadProjectKanbansClient')
   console.log(projectId)
   return(dispatch) => {
     loadKanbanTasksSuccess(dispatch, projectId)
   }
 }

const removeSelectedTaskSuccess = (dispatch) => {
  dispatch({
    type: DELETE_SELECTED_TASK,
    payload: true
  });
  Actions.info()
}


export const removeSelectedTask = () => {
  return(dispatch) => {
    removeSelectedTaskSuccess(dispatch)
  }
}



const setCurrentTaskSuccess = (dispatch, task) => {
  dispatch({
    type: SET_CURRENT_TASK,
    payload: task
  });

}

export const setCurrentTask = (task) => {
  console.log('in setCurrentTask')
  console.log(task)
  return(dispatch) => {
    setCurrentTaskSuccess(dispatch, task)
  }
}

const saveTaskSuccess = (dispatch, eventId, task) => {
  console.log('in saveTaskSuccess')
  console.log(task)
  console.log(eventId)
  dispatch({
    type: SAVE_TASK,
    payload: {eventId: eventId, task: task}
  });
  Actions.info()
}

export const saveTask = (eventId, task) => {
  console.log('in saveTask')
  console.log(eventId)
  console.log(task)
  return(dispatch) => {
    saveTaskSuccess(dispatch,eventId, task)
  }
}


export const updateSearchTaskStatus = (status) => {
  console.log('in updateSearchTaskStatus')
  console.log(status)
  return {
    type: SEARCH_TASK_INIT,
    payload: status
  }
}
