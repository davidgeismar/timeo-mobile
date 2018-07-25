import { Actions } from 'react-native-router-flux';
import { DELETE_SELECTED_TASK,
         SET_CURRENT_TASK,
         SAVE_TASK,
         SEARCH_TASK_INIT,
         LOAD_KANBAN_TASKS,
         CHANGE_TASKLIST_SCOPE,
         SEARCH_TASK,
         UPDATE_SEARCH_PATTERN
       } from './types'
import API from './Api';
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'

 export const loadKanbanTasks= (kanbanId) => {
   return (dispatch) => {
     dispatch(setLoaderState(true))
     dispatch(updateSearchPattern(''))
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

const updateSearchPattern = (pattern) => {
  return {
    type: UPDATE_SEARCH_PATTERN,
    payload: pattern
  }
}



export const searchTasks= (kanbanId, pattern, limitToMine)=> {
  console.log('in searchTasks')
  console.log(kanbanId)
  console.log(pattern)
  console.log(limitToMine)
  if (pattern == ""){
    return (dispatch) => {
      dispatch(setLoaderState(true))
      dispatch(loadKanbanTasks(kanbanId))
    }
  }
  else {
    return (dispatch) => {
      dispatch(setLoaderState(true))
      dispatch(updateSearchPattern(pattern))
      API.get(`/internal/timeo/api/v0/kameo_cards/by-kanban-id/${kanbanId}/pattern?pattern=${pattern}&limit_to_mine=${limitToMine}`)
        .then(response => searchTasksSuccess(dispatch, response))
        .catch(error => onRequestErrorCallback(dispatch, error));
    };
  }
}

const searchTasksSuccess = (dispatch, data) => {
  console.log('in searchTasksSuccess')
  const tasks = data.data
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: SEARCH_TASK,
    payload: tasks
  });
}

const removeSelectedTaskSuccess = (dispatch) => {
  dispatch({
    type: DELETE_SELECTED_TASK,
    payload: true
  });
  Actions.info()
}


export const changeTaskListScope = (switchValue, searchPattern, kanbanId) => {
  console.log('changeTaskListScope')
  const limitToMine = switchValue ? false : true
  console.log(switchValue)
  console.log(limitToMine)
  console.log(searchPattern)
  console.log(kanbanId)
  return(dispatch) => {
    dispatch(setLoaderState(true))
    const url = searchPattern == '' ? `/internal/timeo/api/v0/kameo_cards/by-kanban-id/${kanbanId}?limit_to_mine=${limitToMine}` : `/internal/timeo/api/v0/kameo_cards/by-kanban-id/${kanbanId}/pattern?pattern=${pattern}&limit_to_mine=${limitToMine}`
    console.log(url)
    API.get(url)
      .then(response => changeTaskListScopeSuccess(dispatch, response, limitToMine))
      .catch(error => onRequestErrorCallback(dispatch, error));
  }
}

export const changeTaskListScopeSuccess = (dispatch, data, limitToMine) => {
  console.log('changeTaskListScopeSuccess')
  console.log(data.data)
  dispatch({
    type: CHANGE_TASKLIST_SCOPE,
    payload: { limitToMine: limitToMine,
               tasks: data.data }
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
