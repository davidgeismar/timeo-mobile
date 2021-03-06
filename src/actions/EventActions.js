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
         UPDATE_CURRENT_EVENT_COMMENT,
         SET_CURRENT_MANUAL_DURATION,
         RESET_PROJECTS,
         UPDATE_CARD_INFOS,
         ADD_FILE_TO_CURRENT_EVENT
       } from './types'
import API from './Api';
import { loadClientProjects, loadClientProjectsSuccess } from './ProjectActions'
import { loadKanbanCards, fetchCard } from './CardActions'
import { activateTab, activateTabSuccess } from './TabActions'
import { loadProjectKanbans, loadSelectedKanban } from './KanbanActions'
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'
import * as RNFS from 'react-native-fs'
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
// import * as RNFS from 'react-native-fs'

// creates an event with API call(called an "action" on API)
export const createEvent = ( measure_kind, duration=null) => {
  return (dispatch) => {
    // dispatch(setLoaderState(true))
    const data = {action: {duration, measure_kind}}
    dispatch(activateTab('client'))

    API.post('/internal/timeo/api/v0/actions', data)
      .then(response => createEventSuccess(dispatch, response))
      .catch(error => onRequestErrorCallbackCreation(dispatch, error, measure_kind));
  }
}

const onRequestErrorCallbackCreation = (dispatch, error, measure_kind) => {
  dispatch(setErrorState(error.message))
  if (measure_kind == 'manual'){
    dispatch(activateTab('time'))
  }
  else {
    dispatch(activateTab('chrono'))
  }
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

const spitHourMinute = (millis) => {
  const time = new Date(millis)
  const hours = time.getUTCHours() < 10 ? `0${time.getUTCHours()}` : time.getUTCHours();
  const minutes = time.getUTCMinutes() < 10 ? `0${time.getUTCMinutes()}` : time.getUTCMinutes();
  return {selectedHour: hours , selectedMinute: minutes }
}

export const setCurrentEvent = (eventId) => {
  return(dispatch, getState) => {
    // sets currentEvent in store
    dispatch({
      type: SET_CURRENT_EVENT,
      payload: eventId
    });

    const currentEvent = getState().eventsData.events.find(event => event.id == eventId)
    if (currentEvent.measure_kind == 'automatic'){
      dispatch({
        type: SET_CURRENT_CHRONO_BASETIME,
        payload: currentEvent.duration
      })
    }
    else {
      dispatch({
        type: SET_CURRENT_MANUAL_DURATION,
        payload: spitHourMinute(currentEvent.duration)
      })
    }
    dispatch(activateTab('info'))
    loadEventContext(dispatch, currentEvent)
  }
}

// loads projects, kanbans and card for current event/action
// should be done concurrently
// just remove dispatch !!
const loadEventContext = (dispatch, currentEvent) => {
    if (currentEvent.client_id){
      dispatch(loadClientProjects(currentEvent.client_id))
    }
    if (currentEvent.project_id){
      dispatch(loadProjectKanbans(currentEvent.project_id))
    }
    if (currentEvent.kanban_id){
      dispatch(loadSelectedKanban(currentEvent.kanban_id))
      dispatch(loadKanbanCards(currentEvent.kanban_id))
    }
    if (currentEvent.card_id){
      dispatch(fetchCard(currentEvent.card_id))
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
// fetch event from api
export const fetchEvent= (eventId) => {
  return (dispatch) => {
    API.get(`/internal/timeo/api/v0/actions/${eventId}`)
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
  let data =  { [prop]: value,
                duration: duration,
                measure_kind: measureKind
              }

  switch (prop){
    case 'client_id':
      return {action: Object.assign(data,  {project_id: null, kanban_id: null, card_id: null})}
    case 'project_id':
      return {action: Object.assign(data,{kanban_id: null, card_id: null})}
    case 'kanban_id':
      return {action: Object.assign(data, {card_id: null})}
    default:
      return {action: data}
  }
}

// check if value has changed
const valueHasChanged = (prop, value, event) => {
  return event[prop] != value
}

const preUpdateActions = (dispatch, prop, value, eventNeedsUpdate, cardInfos=null) => {
  switch (prop){
    case 'client_id':
      if (eventNeedsUpdate){
        dispatch({
          type: RESET_PROJECTS,
          payload: null
        })
        dispatch(loadClientProjects(value));
        unsetKanbanAndCard(dispatch)
      }
      return dispatch(activateTab('projects'))
    case 'project_id':
      unsetKanbanAndCard(dispatch)
      return dispatch(activateTab('info'))
    case 'duration':
      return dispatch(activateTab('info'))
    case 'card_id':
      if (eventNeedsUpdate){
        dispatch(updateCardInfos(cardInfos))
      }
      return dispatch(activateTab('info'))
    case 'kanban_id':
      if (eventNeedsUpdate){
        dispatch(loadKanbanCards(value, true))
      }
      return Actions.cardList()

  }
}


const updateCardInfos = (cardInfos) => {
  return {
    type: SET_CURRENT_EVENT_TASK,
    payload: cardInfos
  }
}


// main function to update an action
//
//  * Summary. updates an action on API and updates redux state accordingly
//  *
//  * Description. this function is generic, it works for updating any param of action

//  * @param {string}        prop            the prop to update.
//  * @param {string, int}   value           the value of the prop to update
//  * @param {int}           duration        duration checked in by user
//  * @param {string}        measureKind     type of measurement for duration (auto or manual)
//  * @param {int}           eventId         mongoid id of action to update
//  * @param {bool}          [redirect=true] if there should be a redirection after updateEvent
//  * @param {bool}          [loader=true]   if a loader should be displayed during updateEvent

//  * @return {function}   (dispatch, getState)
//  */

export const updateEvent = (prop, value, duration, measureKind, eventId, redirect=true, loader=true, cardInfos=null) => {
  return (dispatch, getState) => {
    // fetching current event from store
    const event = getState().eventsData.currentEvent
    const eventNeedsUpdate = valueHasChanged(prop, value, event)
    let data

    if (eventNeedsUpdate) {
      data = preparingData(prop, value, duration, measureKind)
    }
    // mainly activating tabs and fetching data if necessary
    preUpdateActions(dispatch, prop, value, eventNeedsUpdate, cardInfos)

    if (eventNeedsUpdate){
      API.patch(`/internal/timeo/api/v0/actions/${eventId}`, data)
        .then(response => updateEventSuccess(dispatch, response, prop, redirect, eventNeedsUpdate))
        .catch(error => onRequestErrorCallbackUpdateEvent(dispatch, error, prop, measureKind));
    }
    else if (prop === 'subject'){
      Actions.events();
    }
  }
}

// error callback gets you back to where you need with error popup
const onRequestErrorCallbackUpdateEvent = (dispatch, error, prop, measureKind) => {
  dispatch(setErrorState(error.message))
  switch (prop){
    case 'client_id':
      return dispatch(activateTab('client'))
    case 'project_id':
      return dispatch(activateTab('projects'))
    case 'duration':
      if (measureKind == 'manual'){
        return dispatch(activateTab('time'))
      }
      else {
        return dispatch(activateTab('chrono'))
      }
    case 'card_id':
       return Actions.cardList()
  }
}

//
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
      // unsetKanbanAndCard(dispatch)
      return true
    case 'project_id':
      // unsetKanbanAndCard(dispatch)
      return  dispatch(loadProjectKanbans(data.data.project_id))
    case 'card_id':
     return dispatch(fetchCard(data.data.card_id, false))
    case 'duration':
      return dispatch(activateTab('info'))
    case 'kind_id':
      return dispatch(activateTab('info'))
    case 'subject':
      return dispatch(activateTab('events'))
    case 'kanban_id':
      return   dispatch({
                  type: SET_CURRENT_EVENT_TASK,
                  payload: null
                })
    }
  }
}

// unsets the kanban and card when for instance client or project is updated
const unsetKanbanAndCard = (dispatch) => {
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

export const deleteActionFile = (eventId, fileId) => {
  return(dispatch) => {
    API.delete(`/internal/timeo/api/v0/actions/${eventId}/action-file/${fileId}`)
      .then(response => deleteActionFileSuccess(dispatch, eventId))
      .catch(error => onRequestErrorCallback(dispatch, error));
  }
}
// updates redux store
const deleteActionFileSuccess = (dispatch, eventId) => {
    API.get(`/internal/timeo/api/v0/actions/${eventId}`)
      .then(response => updateEventSuccess(dispatch, response, null, false, false))
      .catch(error => onRequestErrorCallback(dispatch, error));
}

export const sendFileToApi = (eventId, res) =>{
  return(dispatch, getState) => {
    // const uploadUrl = `https://staging.obeya.io/internal/timeo/api/v0/actions/${eventId}/action-file`
    const uploadUrl = `http://192.168.43.92:3000/internal/timeo/api/v0/actions/${eventId}/action-file`
    const filename = res.fileName
    fileConfig = {uri: res.uri, type: res.type, name: res.fileName}
    // -F "action_file[title]=som title" -F "action_file[kind]=file" -F "action_file[file]=@IMG_20190218_180358.jpg;type=image/jpeg"
    headersData = {
      'Authorization': 'Bearer ' + getState().authentication.token
    }

    const data = new FormData();
    data.append('action_file[title]', res.fileName); // you can append anyone.
    data.append('action_file[kind]', 'file');
    data.append('action_file[file]', fileConfig);

    fetch(uploadUrl, {
      headers: headersData,
      method: 'post',
      body: data
    }).then(res => {
      API.get(`/internal/timeo/api/v0/actions/${eventId}`)
        .then(response => updateEventSuccess(dispatch, response, null, false, false))
        .catch(error => onRequestErrorCallback(dispatch, error));
    }).catch(err => {
        alert('error : ', err);
      });

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
