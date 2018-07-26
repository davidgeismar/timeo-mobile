import { Actions } from 'react-native-router-flux';
import { CREATE_EVENT,
         SET_CURRENT_EVENT,
         UPDATE_EVENT,
         UPDATE_EVENT_CLIENT,
         LOAD_CLIENT_PROJECTS,
         UPDATE_EVENT_ACTION,
         UPDATE_EVENT_DURATION,
         DELETE_EVENT,
         UPDATE_CURRENT_EVENT_COMMENT,
         UPDATE_EVENT_PROJECT,
         LOAD_EVENTS,
         ACTIVATE_TAB,
         DELETE_SELECTED_KANBAN,
         UNSET_CURRENT_TASK,
         SET_CURRENT_EVENT_TASK,
         SET_EVENT_TO_DELETE
       } from './types'
import API from './Api';
import { fetchClients, fetchClientsSuccess } from './ClientActions'
import { loadClientProjects, loadClientProjectsSuccess } from './ProjectActions'
import { loadKanbanTasks } from './TaskActions'
import { activateTab, activateTabSuccess } from './TabActions'
import { loadProjectKanbans } from './KanbanActions'
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'



export const createEvent = ( measure_kind, duration=null) => {
  return (dispatch) => {
    dispatch(setLoaderState(true))
    const data = {action: {duration: duration, measure_kind: measure_kind}}
    API.post('/internal/timeo/api/v0/actions', data)
      .then(response => createEventSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(error));
  }
}

const createEventSuccess = (dispatch, data) => {
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
    dispatch({
      type: CREATE_EVENT,
      payload: data.data
    });
    dispatch({
      type: SET_CURRENT_EVENT,
      payload: data.data.id
    });
    dispatch(fetchClients())
}


export const setCurrentEventTask = (cardId) => {
  return(dispatch, getState) => {
    if (cardId){
      dispatch(setLoaderState(true))
      API.get(`/internal/timeo/api/v0/kameo_cards/${cardId}`)
        .then(response => setCurrentEventTaskSuccess(dispatch, response))
        .catch(error => onRequestErrorCallback(error));
    }
    else {
      dispatch({
        type: SET_CURRENT_EVENT_TASK,
        payload: null
      })
    }
  }
}
const setCurrentEventTaskSuccess = (dispatch, data) => {
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: SET_CURRENT_EVENT_TASK,
    payload: data.data
  });
}

export const setCurrentEvent = (eventId) => {
  return(dispatch, getState) => {
    setCurrentEventSuccess(dispatch, getState, eventId)
  }
}

const setCurrentEventSuccess = (dispatch, getState, eventId) => {
  dispatch({
    type: SET_CURRENT_EVENT,
    payload: eventId
  });
  const currentEvent = getState().eventsData.events.find(event => event.id == eventId)
  if (currentEvent.project_id){
    dispatch(loadProjectKanbans(currentEvent.project_id))
  }

  dispatch(setCurrentEventTask(currentEvent.project_id))

  dispatch(activateTab('info'))
}

export const fetchEvents= () => {
  return (dispatch) => {
    dispatch(setLoaderState(true))
    API.get('/internal/timeo/api/v0/actions')
      .then(response => fetchEventsSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(error));
  };
}

const fetchEventsSuccess = (dispatch, data) => {
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
    dispatch({
      type: LOAD_EVENTS,
      payload: data.data
    });
    dispatch(activateTab('events'))
}

export const updateEvent = (prop, value, duration, measure_kind, eventId, redirect=true, loader=true) => {
  return (dispatch) => {
      const data = {action: {
                        [prop]: value,
                        duration: duration,
                        measure_kind: measure_kind
                      }
                    }
      if (loader){
        dispatch(setLoaderState(true))
      }
      API.patch(`/internal/timeo/api/v0/actions/${eventId}`, data)
        .then(response => updateEventSuccess(dispatch, response, prop, redirect))
        .catch(error => onRequestErrorCallback(error));
  }
}


const updateEventSuccess = (dispatch, data, prop, redirect) => {
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: UPDATE_EVENT,
    payload: data.data
  });
  if (redirect){
    switch(prop) {
    case 'client_id':
      unsetKanbanAndTask(dispatch)
      return dispatch(loadClientProjects(data.data.client_id));
    case 'project_id':
      unsetKanbanAndTask(dispatch)
      return dispatch(activateTab('info'))
    case 'kanban_id':
      return dispatch(loadKanbanTasks(data.data.kanban_id))
    case 'card_id':
      return dispatch(activateTab('info'))
    case 'content':
      return dispatch(fetchEvents())
    case 'duration':
      return dispatch(activateTab('client'))
    case 'kind_id':
      return dispatch(activateTab('info'))
    case 'subject':
      return dispatch(activateTab('events'))
    }
  }
}

const unsetKanbanAndTask = (dispatch) => {
  console.log('in unsetKanbanAndTask')
  dispatch({
    type: DELETE_SELECTED_KANBAN,
    payload: true
  });
  dispatch({
    type: UNSET_CURRENT_TASK,
    payload: true
  });
}

export const setEventToDelete = (event) => {
  return(dispatch) => {
    setEventToDeleteSuccess(dispatch, event)
  }
}

const setEventToDeleteSuccess = (dispatch, event) => {
  dispatch({
    type: SET_EVENT_TO_DELETE,
    payload: event
  })
  Actions.deleteEvent()
}

export const deleteEvent = (eventId) => {
  return(dispatch) => {
    dispatch(setLoaderState(true))
    API.delete(`/internal/timeo/api/v0/actions/${eventId}`)
      .then(response => deleteEventSuccess(dispatch, eventId))
      .catch(error => onRequestErrorCallback(error));
  }
}

const deleteEventSuccess = (dispatch, eventId) => {
    dispatch(setLoaderState(false))
    dispatch(setErrorState(false))
    dispatch({
      type: DELETE_EVENT,
      payload: eventId
    });
    Actions.events()
}

export const sendFileToApi = (eventId, fileTitle, fileKind, file) =>{
  return(dispatch) => {
    dispatch(setLoaderState(true))
    const data = {
      id: eventId,
      action_file: {
        title: fileTitle,
        kind: fileKind,
        file: file
      }

    }
    API.post(`/internal/timeo/api/v0/actions/${eventId}/action-file`)
      .then(response => sendFileToApiSuccess(dispatch, eventId))
      .catch(error => onRequestErrorCallback(error));
  }
}

const sendFileToApiSuccess = (dispatch, eventId) => {
  console.log('sendFileToApiSuccess')
    // dispatch({
    //   type: SET_FILE,
    //   payload: {eventId
    // });
    // Actions.events()
}
// just current state no api call
export const updateEventComment = (comment) => {
  return{
    type: UPDATE_CURRENT_EVENT_COMMENT,
    payload: comment
  };
}
