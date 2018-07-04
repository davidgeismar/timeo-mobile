import { Actions } from 'react-native-router-flux';
import { CREATE_EVENT,
         SET_CURRENT_EVENT,
         UPDATE_EVENT_CLIENT,
         LOAD_CLIENT_PROJECTS,
         UPDATE_EVENT_ACTION,
         UPDATE_EVENT_DURATION,
         DELETE_EVENT,
         UPDATE_EVENT_COMMENT,
         UPDATE_EVENT_PROJECT,
         ACTIVATE_TAB
       } from './types'
export


const activateTabSuccess = (dispatch,  tabLabel) => {
  console.log('in activateTabSuccess')
  console.log(tabLabel)
  dispatch({
    type: ACTIVATE_TAB,
    payload: tabLabel
  });

  switch(tabLabel) {
    case 'chrono':
      return Actions.chrono()
    case 'time':
      console.log('in time')
      return Actions.time()
    case 'project':
      return Actions.project()
    case 'client':
      return Actions.client()
    case 'events':
      return Actions.events()
    }
}

export const activateTab = (tabLabel) => {
  console.log('in activateTab')
  console.log(tabLabel)
  return(dispatch) => {
    activateTabSuccess(dispatch, tabLabel)
  }
}

export const getCurrentTime = () => {
 var d = new Date(); // for now
  var hour = d.getHours(); // => 9
  var min = d.getMinutes(); // =>  30
  if(min<10) {
      min = '0'+min
  }
  return time = hour + 'h' + min
}

export const getCurrentDate = () =>{
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  }

  if(mm<10) {
      mm = '0'+mm
  }

  return today = mm + '/' + dd + '/' + yyyy;
 }

 const generateEventId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
 }

export const createEvent = (kind, timerValue=null) => {
  console.log('in createEvent')
  console.log(timerValue)
  let duration
  if (kind == "chrono"){
    duration = {kind: kind, timerValue: timerValue}
  }
  else {

    duration = Object.assign({kind: kind}, timerValue)
  }

  let event = { id: generateEventId(),
                  duration: duration,
                  creationDate: getCurrentDate(),
                  creationTime: getCurrentTime(),
                  action: '',
                }

  console.log('in createEvent')
  console.log(event)
  return(dispatch) => {
    createEventSuccess(dispatch, event, kind)
  }
}

const createEventSuccess = (dispatch, event, kind) => {
    dispatch({
      type: CREATE_EVENT,
      payload: event
    });
    dispatch({
      type: SET_CURRENT_EVENT,
      payload: event.id
    });
    dispatch({
      type: ACTIVATE_TAB,
      payload: 'client'
    });
    Actions.client()
}

const setCurrentEventSuccess = (dispatch, eventId) => {
  dispatch({
    type: SET_CURRENT_EVENT,
    payload: eventId
  });
  dispatch(activateTab('time'))
}

export const setCurrentEvent = (eventId) => {
  console.log('in setCurrentEvent')
  console.log(eventId)
  return(dispatch) => {
    setCurrentEventSuccess(dispatch, eventId)
  }
}

const updateEventClientSuccess = (dispatch, getState, client, eventId) => {
    dispatch({
      type: UPDATE_EVENT_CLIENT,
      payload: {eventId: eventId, client: client}
    });
    dispatch({
      type: LOAD_CLIENT_PROJECTS,
      payload: client.id
    });

    const { projects } = getState();

    console.log('in updateEventClientSuccess')
    console.log(projects)
    if (projects.length > 0) {
      dispatch({
        type: ACTIVATE_TAB,
        payload: 'project'
      })
      Actions.project()
    }
    else{
      dispatch({
        type: ACTIVATE_TAB,
        payload: 'info'
      })
      Actions.info()
    }
}

export const updateEventClient = (client, eventId) => {
  console.log('in updateEventClient')
  console.log(client)
  console.log(eventId)
  return(dispatch, getState) => {
    updateEventClientSuccess(dispatch,getState, client, eventId)
  }
}

export const updateEventAction = (action, eventId) => {
  console.log('in updateEventAction')
  console.log(action)
  console.log(eventId)
  return(dispatch) => {
    updateEventActionSuccess(dispatch, action, eventId)
  }
}

const updateEventActionSuccess = (dispatch, action, eventId) => {
    dispatch({
      type: UPDATE_EVENT_ACTION,
      payload: {eventId: eventId, action: action}
    });
    Actions.info()
}


const updateEventDurationSuccess = (dispatch,kind, duration, eventId) => {
  console.log(duration)
  console.log(eventId)
    dispatch({
      type: UPDATE_EVENT_DURATION,
      payload: {eventId: eventId, duration: duration}
    });
    Actions.info()
}

export const updateEventDuration = (kind, duration, eventId) => {
  console.log('in updateEventDuration')
  console.log(duration)
  console.log(kind)
  console.log(eventId)
  return(dispatch) => {
    updateEventDurationSuccess(dispatch, kind, duration, eventId)
  }
}

const deleteEventSuccess = (dispatch, eventId) => {
    dispatch({
      type: DELETE_EVENT,
      payload: eventId
    });
    Actions.events()
}

export const deleteEvent = (eventId) => {
  console.log('in deleteEvent')
  console.log(eventId)
  return(dispatch) => {
    deleteEventSuccess(dispatch, eventId)
  }
}

export const updateEventComment = (comment, eventId) => {
  console.log('in updateEventComment')
  console.log(comment)
  console.log(eventId)
  return{
    type: UPDATE_EVENT_COMMENT,
    payload: {eventId: eventId, comment: comment}
  };
}

const updateEventProjectSuccess = (dispatch, project, eventId) => {
    dispatch({
      type: UPDATE_EVENT_PROJECT,
      payload: {eventId: eventId, project: project}
    });
    dispatch({
      type: ACTIVATE_TAB,
      payload: 'info'
    });
    Actions.info()
}

export const updateEventProject = (project, eventId) => {
  console.log('in updateEventProject')
  console.log(project)
  console.log(eventId)
  return(dispatch) => {
    updateEventProjectSuccess(dispatch, project, eventId)
  }
}
