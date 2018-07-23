import { Actions } from 'react-native-router-flux';
import { DELETE_SELECTED_TASK,
         SET_CURRENT_TASK,
         SAVE_TASK,
         SEARCH_TASK_INIT,
         LOAD_KANBAN_TASKS,
         CHANGE_TASKLIST_SCOPE,
         SEARCH_TASK
       } from './types'
import API from './Api';
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'

 export const loadKanbanTasks= (kanbanId) => {
   return (dispatch) => {
     dispatch(setLoaderState(true))
     API.get(`/internal/timeo/api/v0/kameo_cards/by-kanban-id/${kanbanId}?limit_to_mine=true`)
       .then(response => loadKanbanTasksSuccess(dispatch, response))
       .catch(error => onRequestErrorCallback(dispatch, error));
   };
 }

 const loadKanbanTasksSuccess = (dispatch, data) => {
   const tasks = data.data
   dispatch(setLoaderState(false))
   dispatch(setErrorState(false))
   dispatch({
     type: LOAD_KANBAN_TASKS,
     payload: tasks
   });
   Actions.taskList()
 }

export const searchTasks= (query)=> {
  return {
    type: SEARCH_TASK,
    payload: query
  }

}

const removeSelectedTaskSuccess = (dispatch) => {
  dispatch({
    type: DELETE_SELECTED_TASK,
    payload: true
  });
  Actions.info()
}

export const changeTaskListScope = (switchValue) => {
  const scope = switchValue ? 'all' : 'current_user'
  return(dispatch, getState) => {
    changeTaskListScopeSuccess(dispatch, getState, scope)
  }
}

export const changeTaskListScopeSuccess = (dispatch, getState, scope) => {
  const currentUserId = getState().user.id
  dispatch({
    type: CHANGE_TASKLIST_SCOPE,
    payload: { scope: scope,
               currentUserId: currentUserId }
  })
}


export const removeSelectedTask = () => {
  return(dispatch) => {
    removeSelectedTaskSuccess(dispatch)
  }
}

export const setCurrentTask = (task) => {
  return(dispatch) => {
    setCurrentTaskSuccess(dispatch, task)
  }
}

const setCurrentTaskSuccess = (dispatch, task) => {
  dispatch({
    type: SET_CURRENT_TASK,
    payload: task
  });
}

const saveTaskSuccess = (dispatch, eventId, task) => {
  dispatch({
    type: SAVE_TASK,
    payload: {eventId: eventId, task: task}
  });
  Actions.info()
}

export const saveTask = (eventId, task) => {
  return(dispatch) => {
    saveTaskSuccess(dispatch,eventId, task)
  }
}


export const updateSearchTaskStatus = (status) => {
  return {
    type: SEARCH_TASK_INIT,
    payload: status
  }
}
