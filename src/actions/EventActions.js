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
    console.log('in createEvent actions event')
    console.log(duration)
    dispatch(setLoaderState(true))
    const data = {action: {duration: duration, measure_kind: measure_kind}}
    API.post('/internal/timeo/api/v0/actions', data)
      .then(response => createEventSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(error));
  }
}

const createEventSuccess = (dispatch, data) => {
  console.log('createEventSuccess')
  console.log(data)
  console.log(data.data)
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
    console.log('before dispatch')
    dispatch(fetchClients())
}


export const setCurrentEventTask = (cardId) => {
  console.log('in setCurrentEventTask')
  console.log(cardId)
  return(dispatch, getState) => {
    dispatch(setLoaderState(true))
    API.get(`/internal/timeo/api/v0/kameo_cards/${cardId}`)
      .then(response => setCurrentEventTaskSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(error));
  }
}
const setCurrentEventTaskSuccess = (dispatch, data) => {
  console.log('in setCurrentEventTaskSuccess')
  console.log(data.data)
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: SET_CURRENT_EVENT_TASK,
    payload: data.data
  });
}

export const setCurrentEvent = (eventId) => {
  console.log('in setCurrentEvent')
  console.log(eventId)
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
  dispatch(activateTab('info'))
}

export const fetchEvents= () => {
  return (dispatch) => {
    console.log('in fetchEvents')
    // console.log(kanbanId)
    console.log('/internal/timeo/api/v0/actions')
    dispatch(setLoaderState(true))
    API.get('/internal/timeo/api/v0/actions')
      .then(response => fetchEventsSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(error));
  };
}

const fetchEventsSuccess = (dispatch, data) => {
  console.log('fetchEventsSuccess')
  console.log(data.data)
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
    dispatch({
      type: LOAD_EVENTS,
      payload: data.data
    });
    dispatch(activateTab('events'))
}

export const updateEvent = (prop, value, duration, measure_kind, eventId) => {
  return (dispatch) => {
      console.log('in updateEvent')
      console.log(eventId)
      const data = {action: {
                        [prop]: value,
                        duration: duration,
                        measure_kind: measure_kind
                      }
                    }
      console.log(data)
      console.log(`/internal/timeo/api/v0/actions/${eventId}`)
      dispatch(setLoaderState(true))
      API.patch(`/internal/timeo/api/v0/actions/${eventId}`, data)
        .then(response => updateEventSuccess(dispatch, response, prop))
        .catch(error => onRequestErrorCallback(error));
  }
}


const updateEventSuccess = (dispatch, data, prop) => {
  console.log('updateEventSuccess')
  console.log(data.data)
  console.log(prop)
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: UPDATE_EVENT,
    payload: data.data
  });
  switch(prop) {
    case 'client_id':
      console.log('in client_id')
      unsetKanbanAndTask(dispatch)
      return dispatch(loadClientProjects(data.data.client_id));
    case 'project_id':
      console.log('in project_id')
      unsetKanbanAndTask(dispatch)
      return dispatch(activateTab('info'))
    case 'kanban_id':
      console.log('in kanban_id')
      return dispatch(loadKanbanTasks(data.data.kanban_id))
    case 'card_id':
      return dispatch(activateTab('info'))
    case 'content':
      return dispatch(fetchEvents())
    case 'duration':
      return dispatch(activateTab('client'))
    case 'kind_id':
      console.log('in kind id')
      return dispatch(activateTab('info'))
    case 'subject':
      console.log('in subject')
      return dispatch(activateTab('events'))
    }
}

const unsetKanbanAndTask = (dispatch) => {
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
  console.log('setEventToDelete')
  console.log(event)
  return(dispatch) => {
    setEventToDeleteSuccess(dispatch, event)
  }
}

const setEventToDeleteSuccess = (dispatch, event) => {
  console.log('in setEventToDeleteSuccess')
  console.log(event)
  dispatch({
    type: SET_EVENT_TO_DELETE,
    payload: event
  })
  Actions.deleteEvent()
}

export const deleteEvent = (eventId) => {
  return(dispatch) => {
    console.log('in deleteEvent')
    console.log(eventId)
    dispatch(setLoaderState(true))
    API.delete(`/internal/timeo/api/v0/actions/${eventId}`)
      .then(response => deleteEventSuccess(dispatch, eventId))
      .catch(error => onRequestErrorCallback(error));
  }
}

const deleteEventSuccess = (dispatch, eventId) => {
    console.log('in deleteEventSuccess')
    console.log(eventId)
    dispatch(setLoaderState(false))
    dispatch(setErrorState(false))
    dispatch({
      type: DELETE_EVENT,
      payload: eventId
    });
    Actions.events()
}


// just current state no api call
export const updateEventComment = (comment) => {
  console.log('in updateEventComment')
  console.log(comment)
  return{
    type: UPDATE_CURRENT_EVENT_COMMENT,
    payload: comment
  };
}
