import { Actions } from 'react-native-router-flux';
import { CREATE_EVENT,
         RESET_CHRONO,
         SET_CURRENT_EVENT_TASK,
         UNSET_CURRENT_TASK,
         SET_CURRENT_EVENT,
         SET_CURRENT_CHRONO_BASETIME,
         LOAD_EVENTS,
         UPDATE_EVENT,
         DELETE_SELECTED_KANBAN,
         SET_EVENT_TO_DELETE,
         DELETE_EVENT,
         UPDATE_CURRENT_EVENT_COMMENT
       } from './types'
import API from './Api';
import { loadClientProjects, loadClientProjectsSuccess } from './ProjectActions'
import { loadKanbanTasks } from './TaskActions'
import { activateTab, activateTabSuccess } from './TabActions'
import { loadProjectKanbans } from './KanbanActions'
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'
import * as RNFS from 'react-native-fs'
import axios from 'axios';
// import * as RNFS from 'react-native-fs'

// creates an event with API call(called an "action" on API)
export const createEvent = ( measure_kind, duration=null) => {
  return (dispatch) => {
    // dispatch(setLoaderState(true))
    const data = {action: {duration: duration, measure_kind: measure_kind}}
    dispatch(activateTab('client'))

    API.post('/internal/timeo/api/v0/actions', data)
      .then(response => createEventSuccess(dispatch, response))
      .catch(error => onRequestErrorCallbackCreation(dispatch, error));
  }
}

const onRequestErrorCallbackCreation = (dispatch, error) => {
  dispatch(setErrorState(error.message))
  dispatch(activateTab('time'))
}
// updates redux store
const createEventSuccess = (dispatch, data) => {
  // dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  //  API sends back the event/action
  dispatch({
    type: CREATE_EVENT,
    payload: data.data
  });
  // resets chrono startedAt and stoppedAt
  dispatch({
    type: RESET_CHRONO,
    payload: true
  })
}

// fetching task of current event/action
// event/action only stores card_id, so we need to go fetch the card info
const fetchCard = (cardId) => {
  return(dispatch, getState) => {
    if (cardId){
      dispatch(setLoaderState(true))
      API.get(`/internal/timeo/api/v0/kameo_cards/${cardId}`)
        .then(response => fetchCardSuccess(dispatch, response))
        .catch(error => onRequestErrorCallback(dispatch, error));
    }
    else {
      dispatch({
        type: SET_CURRENT_EVENT_TASK,
        payload: null
      })
    }
  }
}

// updates current event card in redux store
const fetchCardSuccess = (dispatch, data) => {
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: SET_CURRENT_EVENT_TASK,
    payload: data.data
  });
}

export const setCurrentEvent = (eventId) => {
  return(dispatch, getState) => {
    dispatch({
      type: SET_CURRENT_EVENT,
      payload: eventId
    });

    const currentEvent = getState().eventsData.events.find(event => event.id == eventId)
    dispatch({
      type: SET_CURRENT_CHRONO_BASETIME,
      payload: currentEvent.duration
    })
      dispatch(activateTab('info'))
    loadEventContext(dispatch, currentEvent)
  }
}

// loads projects, kanbans and card for current event/action
const loadEventContext = (dispatch, currentEvent) => {
    if (currentEvent.client_id){
      dispatch(loadClientProjects(currentEvent.client_id))
    }
    if (currentEvent.project_id){
      dispatch(loadProjectKanbans(currentEvent.project_id))
    }
    if (currentEvent.card_id){
      dispatch(fetchCard(currentEvent.project_id))
    }
}

// fetch events from api
export const fetchEvents= () => {
  return (dispatch) => {
    dispatch(setLoaderState(true))
    API.get('/internal/timeo/api/v0/actions')
      .then(response => fetchEventsSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(dispatch, error));
  };
}

// updates store
const fetchEventsSuccess = (dispatch, data) => {
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: LOAD_EVENTS,
    payload: data.data
  });
}


// preparing Data to send to API for updating event/action
const preparingData = (prop, value, duration, measureKind) => {
  let data = {action: {
                   [prop]: value,
                   duration: duration,
                   measure_kind: measureKind
                 }
               }
  switch (prop){
    case 'client_id':
      return Object.assign(data, {project_id: null, kanban_id: null, card_id: null})
    case 'project_id':
      return Object.assign(data, {kanban_id: null, card_id: null})
    default:
      return data
  }
}

// check if value has changed
const valueHasChanged = (prop, value, event) => {
  return event[prop] != value
}

const preUpdateActions = (dispatch, prop, value, eventNeedsUpdate) => {
  switch (prop){
    case 'client_id':
      if (eventNeedsUpdate){
        dispatch(loadClientProjects(value));
      }
      return dispatch(activateTab('projects'))
    case 'project_id':
      return dispatch(activateTab('info'))
  }
}
// main function to update an action
export const updateEvent = (prop, value, duration, measureKind, eventId, redirect=true, loader=true) => {
  return (dispatch, getState) => {
    // fetching current event from store
    const event = getState().eventsData.currentEvent
    const eventNeedsUpdate = valueHasChanged(prop, value, event)
    let data

    if (eventNeedsUpdate) {
      data = preparingData(prop, value, duration, measureKind)
    }
    // mainly activating tabs and fetching data if necessary
    preUpdateActions(dispatch, prop, value, eventNeedsUpdate)

    if (eventNeedsUpdate){
      API.patch(`/internal/timeo/api/v0/actions/${eventId}`, data)
        .then(response => updateEventSuccess(dispatch, response, prop, redirect, eventNeedsUpdate))
        .catch(error => onRequestErrorCallbackUpdateEvent(dispatch, error, prop));
    }
  }
}

// error callback gets you back to where you need with error popup
const onRequestErrorCallbackUpdateEvent = (dispatch, error, prop) => {
  dispatch(setErrorState(error.message))
  switch (prop){
    case 'client_id':
      dispatch(activateTab('client'))
    case 'project_id':
      dispatch(activateTab('projects'))
  }

}


const updateEventSuccess = (dispatch, data, prop, redirect, eventNeedsUpdate) => {
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
    case 'project_id':
      unsetKanbanAndTask(dispatch)
      return  dispatch(loadProjectKanbans(data.data.project_id))
    case 'kanban_id':
      return dispatch(loadKanbanTasks(data.data.kanban_id))
    case 'card_id':
     dispatch(fetchCard(data.data.card_id))
     return dispatch(activateTab('info'))
    case 'duration':
      return dispatch(activateTab('client'))
    case 'kind_id':
      return dispatch(activateTab('info'))
    case 'subject':
      return dispatch(activateTab('events'))
    }
  }
}

// unsets the kanban and task when for instance client or project is updated
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
  return(dispatch) => {
    dispatch({
      type: SET_EVENT_TO_DELETE,
      payload: event
    })
    Actions.deleteEvent()
  }
}

// deletes event on API
export const deleteEvent = (eventId) => {
  return(dispatch) => {
    dispatch(setLoaderState(true))
    API.delete(`/internal/timeo/api/v0/actions/${eventId}`)
      .then(response => deleteEventSuccess(dispatch, eventId))
      .catch(error => onRequestErrorCallback(dispatch, error));
  }
}

// updates redux store
const deleteEventSuccess = (dispatch, eventId) => {
    dispatch(setLoaderState(false))
    dispatch(setErrorState(false))
    dispatch({
      type: DELETE_EVENT,
      payload: eventId
    });
    Actions.events()
}

export const sendFileToApi = (eventId, fileTitle, fileKind, fileUrl) =>{
  return(dispatch, getState) => {
    console.log('in sendFileToApi')

    var doc = {
      	uri: fileUrl,
      	type: 'image/png',
      	name: fileTitle,
      };
    console.log(doc)
//
    var fileData = new FormData();
    fileData.append('file', doc)
    console.log(fileData)
    var data = {   'action_file': {
                   'title': fileTitle,
                   'kind': 'image/png',
                    fileData
                 }
              }
    console.log(data)
    const uploadUrl = `http://staging.obeya.xair.cloud/internal/timeo/api/v0/actions/${eventId}/action-file`
    const config = {
      method: 'POST',
      url: uploadUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
        Authorization: 'Bearer ' + getState().authentication.token
      },
      body: data
    };
    console.log(config)
    axios(config)
      .then(resp => console.log(resp))
    // fetch(uploadUrl, config)
    //   .then(responseData => {
    //     console.log(responseData);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // }
  }
}

const sendFileToApiSuccess = (dispatch, eventId) => {
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
