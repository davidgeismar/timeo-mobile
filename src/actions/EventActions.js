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
         SET_EVENT_TO_DELETE,
         RESET_CHRONO,
         SET_CURRENT_CHRONO_BASETIME
       } from './types'
import API from './Api';
import { fetchClients, fetchClientsSuccess } from './ClientActions'
import { loadClientProjects, loadClientProjectsSuccess } from './ProjectActions'
import { loadKanbanTasks } from './TaskActions'
import { activateTab, activateTabSuccess } from './TabActions'
import { loadProjectKanbans } from './KanbanActions'
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'
import * as RNFS from 'react-native-fs'
import axios from 'axios';
// import * as RNFS from 'react-native-fs'


export const createEvent = ( measure_kind, duration=null) => {
  return (dispatch) => {
    dispatch(setLoaderState(true))
    const data = {action: {duration: duration, measure_kind: measure_kind}}
    API.post('/internal/timeo/api/v0/actions', data)
      .then(response => createEventSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(dispatch, error));
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
    dispatch({
      type: RESET_CHRONO,
      payload: true
    })
    dispatch(activateTab('client'))
}


export const setCurrentEventTask = (cardId) => {
  return(dispatch, getState) => {
    if (cardId){
      dispatch(setLoaderState(true))
      API.get(`/internal/timeo/api/v0/kameo_cards/${cardId}`)
        .then(response => setCurrentEventTaskSuccess(dispatch, response))
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
const setCurrentEventTaskSuccess = (dispatch, data) => {
  console.log('setCurrentEventTaskSuccess')
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
  dispatch({
    type: SET_CURRENT_CHRONO_BASETIME,
    payload: currentEvent.duration
  })
  dispatch(activateTab('info'))
  loadEventContext(dispatch, currentEvent)
}

const loadEventContext = (dispatch, currentEvent) => {
    if (currentEvent.client_id){
      dispatch(loadClientProjects(currentEvent.client_id))
    }

    if (currentEvent.project_id){
      dispatch(loadProjectKanbans(currentEvent.project_id))
    }

    if (currentEvent.card_id){
      dispatch(setCurrentEventTask(currentEvent.project_id))
    }
}
export const fetchEvents= () => {
  return (dispatch) => {
    dispatch(setLoaderState(true))
    API.get('/internal/timeo/api/v0/actions')
      .then(response => fetchEventsSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(dispatch, error));
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
  var start = new Date();
  return (dispatch, getState) => {
    const event = getState().eventsData.events.find(event => event.id == eventId)
    let data
    if (prop == 'client_id' && event.client_id != value){
       data = {action: {
                        [prop]: value,
                        duration: duration,
                        measure_kind: measure_kind,
                        project_id: null,
                        kanban_id: null,
                        card_id: null
                      }
                    }
    }
    else if (prop == 'project_id' && event.project_id != value){
       data = {action: {
                        [prop]: value,
                        duration: duration,
                        measure_kind: measure_kind,
                        kanban_id: null,
                        card_id: null
                      }
                    }
    }
    else {
       data = {action: {
                        [prop]: value,
                        duration: duration,
                        measure_kind: measure_kind
                      }
                    }
    }
      if (loader){
        dispatch(setLoaderState(true))
      }
      console.log(data)
      var end = new Date();
      console.log('updateEvent takes :')
      console.log(end - start)
      API.patch(`/internal/timeo/api/v0/actions/${eventId}`, data)
        .then(response => updateEventSuccess(dispatch, response, prop, redirect))
        .catch(error => onRequestErrorCallback(dispatch, error));
  }
}


const updateEventSuccess = (dispatch, data, prop, redirect) => {
  var start = new Date();
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: UPDATE_EVENT,
    payload: data.data
  });
  if (redirect){
    switch(prop) {
    case 'client_id':
      console.log('in client id')
      dispatch(loadClientProjects(data.data.client_id));
      unsetKanbanAndTask(dispatch)
      return dispatch(activateTab('projects'))
    case 'project_id':
      unsetKanbanAndTask(dispatch)
      dispatch(loadProjectKanbans(data.data.project_id))
      return  dispatch(activateTab('info'))
    case 'kanban_id':
      return dispatch(loadKanbanTasks(data.data.kanban_id))
    case 'card_id':
     console.log('in card_id')
     dispatch(setCurrentEventTask(data.data.card_id))
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
      .catch(error => onRequestErrorCallback(dispatch, error));
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

//

    // let url = fileUrl; //The url you received from the DocumentPicker



    // I STRONGLY RECOMMEND ADDING A SMALL SETTIMEOUT before uploading the url you just got.
    // const token = getState().authentication.token
    // const split = url.split('/');
    // const name = split.pop();
    // const inbox = split.pop();
    // const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;


    // console.log(split, name, inbox, realPath)
    // const uploadBegin = (response) => {
    //   const jobId = response.jobId;
    //   console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
    // };
    //
    // const uploadProgress = (response) => {
    //   const percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
    //   console.log('UPLOAD IS ' + percentage + '% DONE!');
    // };
    //
    // // upload files
    // console.log(uploadUrl)
    // console.log(RNFS)
    // RNFS.uploadFiles({
    //    toUrl: uploadUrl,
    //    method: 'POST',
    //    files: [{
    //      name,
    //      filename: name,
    //      filepath: realPath,
    //    }],
    //    headers: {
    //       'Accept': 'application/json',
    //       'Authorization': 'Bearer ' + token
    //    },
    //    fields: {
    //      id: eventId,
    //      action_file: {
    //        title: fileTitle,
    //        kind: fileKind,
    //        file: realPath
    //      }
    //    },
    //    begin: uploadBegin,
    //    beginCallback: uploadBegin, // Don't ask me, only way I made it work as of 1.5.1
    //    progressCallback: uploadProgress,
    //    progress: uploadProgress
    //  }).promise.then((response) => {
    //  console.log(response,"<<< Response");
    //  if (response.statusCode == 200) { //You might not be getting a statusCode at all. Check
    //     console.log('FILES UPLOADED!');
    //   } else {
    //     console.log('SERVER ERROR');
    //     console.log(response)
    //    }
    //  })
    //  .catch((err) => {
    //    if (err.description) {
    //      switch (err.description) {
    //        case "cancelled":
    //          console.log("Upload cancelled");
    //          break;
    //        case "empty":
    //          console.log("Empty file");
    //        default:
    //         //Unknown
    //      }
    //    } else {
    //     //Weird
    //    }
    //    console.log(err);
    // });
  // }

  //   dispatch(setLoaderState(true))
  //   const data = {
  //     id: eventId,
  //     action_file: {
  //       title: fileTitle,
  //       kind: fileKind,
  //       file: file
  //     }
  //
  //   }
  //   API.post(`/internal/timeo/api/v0/actions/${eventId}/action-file`)
  //     .then(response => sendFileToApiSuccess(dispatch, eventId))
  //     .catch(error => onRequestErrorCallback(dispatch, error));
  // }
// }

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
