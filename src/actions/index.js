import { Actions } from 'react-native-router-flux';
import {RESET_INFO, DELETE_SELECTED_TASK, DELETE_SELECTED_KANBAN, SAVE_TASK, SEARCH_TASK_INIT, LOAD_KANBAN_TASKS, SET_CURRENT_TASK, SAVE_KANBAN, LOAD_PROJECT_KANBANS, SET_CURRENT_KANBAN, UPDATE_EVENT_COMMENT, UPDATE_EVENT_PROJECT, LOAD_CLIENT_PROJECTS, SET_CHRONO_RUNNING, UPDATE_INTERVAL, UPDATE_EVENT_CLIENT, START_CHRONO,STOP_CHRONO, EDIT_EVENT_HOUR, EDIT_EVENT_MINUTE, SELECT_HOUR, SELECT_MINUTE, SELECT_ACTION, CREATE_EVENT, SET_CURRENT_EVENT, UPDATE_EVENT_DURATION, UPDATE_EVENT_ACTION, UPDATE_EVENT_HOUR, UPDATE_EVENT_MINUTE, DELETE_EVENT} from './types'




const getCurrentTime = () => {
  var d = new Date(); // for now
   var hour = d.getHours(); // => 9
   var min = d.getMinutes(); // =>  30
   if(min<10) {
       min = '0'+min
   }
   return time = hour + 'h' + min
}

const getCurrentDate = () =>{
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



export const startChrono = () => {
  return {
    type: START_CHRONO,
    payload: true
  }
}

export const setChronoRunning = () =>{
  return {
    type: SET_CHRONO_RUNNING,
    payload: true
  }
}

export const updateInterval = (eventId) => {
  return {
    type: UPDATE_INTERVAL,
    payload: eventId
  }
}
export const stopChrono = (timerValue) => {
  return {
    type: STOP_CHRONO,
    payload: timerValue
  }
}

const removeSelectedKanbanSuccess = (dispatch) => {
  dispatch({
    type: DELETE_SELECTED_KANBAN,
    payload: true
  });
  Actions.info()
}

const removeSelectedTaskSuccess = (dispatch) => {
  dispatch({
    type: DELETE_SELECTED_TASK,
    payload: true
  });
  Actions.info()
}

export const removeSelectedKanban = () => {
  return(dispatch) => {
    removeSelectedKanbanSuccess(dispatch)
  }

}
export const removeSelectedTask = () => {
  return(dispatch) => {
    removeSelectedTaskSuccess(dispatch)
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

    Actions.client()

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


export const selectEventDuration = (timeCard) => {
  console.log('in selectEventDuration')
  console.log(timeCard)
  if (timeCard.kind == 'hour'){
    return {
      type: SELECT_HOUR,
      payload: timeCard.value
    }
  }
  else {
    console.log('in action minute')
    return {
      type: SELECT_MINUTE,
      payload: timeCard.value
    }
  }
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

const updateEventProjectSuccess = (dispatch, project, eventId) => {
    dispatch({
      type: UPDATE_EVENT_PROJECT,
      payload: {eventId: eventId, project: project}
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
      Actions.project()
    }
    else{
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

const setCurrentEventSuccess = (dispatch, eventId) => {
  dispatch({
    type: SET_CURRENT_EVENT,
    payload: eventId
  });
  Actions.time()
}

export const setCurrentEvent = (eventId) => {
  console.log('in setCurrentEvent')
  console.log(eventId)
  return(dispatch) => {
    setCurrentEventSuccess(dispatch, eventId)
  }
}

const setCurrentKanbanSuccess = (dispatch, kanban) => {
  dispatch({
    type: SET_CURRENT_KANBAN,
    payload: kanban
  });

}

export const setCurrentKanban = (kanban) => {
  console.log('in setCurrentKanban')
  console.log(kanban)
  return(dispatch) => {
    setCurrentKanbanSuccess(dispatch, kanban)
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

export const updateEventComment = (comment, eventId) => {
  console.log('in updateEventComment')
  console.log(comment)
  console.log(eventId)
  return{
    type: UPDATE_EVENT_COMMENT,
    payload: {eventId: eventId, comment: comment}
  };
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

const saveKanbanSuccess = (dispatch, eventId, kanban) => {
  console.log('in saveKanbanSuccess')
  console.log(kanban)
  console.log(eventId)
  dispatch({
    type: SAVE_KANBAN,
    payload: {eventId: eventId, kanban: kanban}
  });
  dispatch({
    type: LOAD_KANBAN_TASKS,
    payload: kanban.id
  });
  Actions.taskList()
}

export const saveKanban = (eventId, kanban) => {
  console.log('in saveKanban')
  console.log(eventId)
  console.log(kanban)
  return(dispatch) => {
    saveKanbanSuccess(dispatch,eventId, kanban)
  }
}


export const selectTimeCard = (timeCard) => {
  console.log('in selectTimeCard')
  console.log(timeCard)
  if (timeCard.kind == 'hour'){
    return {
      type: SELECT_HOUR,
      payload: timeCard.value
    }
  }
  else {
    console.log('in action minute')
    return {
      type: SELECT_MINUTE,
      payload: timeCard.value
    }
  }
};

const loadProjectKanbansSuccess = (dispatch, projectId) => {
    dispatch({
      type: LOAD_PROJECT_KANBANS,
      payload: projectId
    });
    Actions.kanbanList()
}

export const loadProjectKanbans= (projectId) => {
  console.log('in loadProjectKanbansClient')
  console.log(projectId)
  return(dispatch) => {
    loadProjectKanbansSuccess(dispatch, projectId)
  }
}

const loadKanbanTasksSuccess = (dispatch, projectId) => {
    dispatch({
      type: LOAD_PROJECT_KANBANS,
      payload: projectId
    });
    Actions.kanbanList()
}

export const loadKanbanTasksKanbans= (kanbanId) => {
  console.log('in loadProjectKanbansClient')
  console.log(projectId)
  return(dispatch) => {
    loadProjectKanbansSuccess(dispatch, projectId)
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

const resetAppInfoSuccess = (dispatch) => {
  console.log('in resetAppInfoSuccess')
  dispatch({
    type: RESET_INFO,
    payload: null
  })
  Actions.starter()
}
export const resetAppInfo = () => {
  console.log('in resetAppInfo')
  return(dispatch) => {
    resetAppInfoSuccess(dispatch)
  }
}
