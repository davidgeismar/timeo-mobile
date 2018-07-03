import {RESET_INFO, SAVE_TASK, SAVE_KANBAN, UPDATE_EVENT_COMMENT, UPDATE_EVENT_PROJECT, UPDATE_INTERVAL, CREATE_EVENT, SET_CURRENT_EVENT, UPDATE_EVENT_DURATION, UPDATE_EVENT_ACTION, EDIT_EVENT_HOUR, EDIT_EVENT_MINUTE, DELETE_EVENT, UPDATE_EVENT_CLIENT, STOP_CHRONO} from '../actions/types';

const INITIAL_STATE = { events: [], currentEventId: null}


// chaque event devra probablement avoir un tabState pour savoir quelle tabs doivent etre activée
export const EventReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case CREATE_EVENT:
      console.log('in reducer CREATE_EVENT')
      // pushé le payload dans le tableau d'event
      return {...state, events: [...state.events, action.payload]};
    case SET_CURRENT_EVENT:
        console.log('in reducer SET_CURRENT_EVENT');
        return {...state, currentEventId: action.payload}
    case UPDATE_EVENT_DURATION:
      console.log('in reducer UPDATE_EVENT_DURATION')
      let events = [...state.events];
      const index = events.findIndex(event => event.id === action.payload.eventId)
      let event = {...events[index]}
      event.duration = action.payload.duration
      events[index] = event
      return {...state, events: events}
    case UPDATE_EVENT_ACTION:
      console.log('in reducer UPDATE_EVENT_ACTION')
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.action = action.payload.action
      events[index] = event
      return {...state, events: events}
    case EDIT_EVENT_HOUR:
      console.log('in reducer EDIT_EVENT_HOUR')
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.duration.selectedHour = action.payload.value
      events[index] = event
      return {...state, events: events}
    case EDIT_EVENT_MINUTE:
      console.log('in reducer EDIT_EVENT_MINUTE')
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.duration.selectedMinute = action.payload.value
      events[index] = event
      return {...state, events: events}
    case DELETE_EVENT:
        console.log('in reducer DELETE_EVENT')
        console.log(action.payload)
        events = [...state.events];
        index = events.findIndex(event => event.id === action.payload.eventId)
        events.splice(index, 1);
        console.log(events)
        return {...state, events: events}
    case UPDATE_EVENT_CLIENT:
      console.log('in reducer UPDATE_EVENT_ACTION')
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.client = action.payload.client
      events[index] = event
      return {...state, events: events}
    case UPDATE_EVENT_PROJECT:
      console.log('in UPDATE_EVENT_PROJECT')
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.project = action.payload.project
      events[index] = event
      console.log(event)
      return {...state, events: events}
    case UPDATE_EVENT_COMMENT:
      console.log('in UPDATE_EVENT_COMMENT')
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.comment = action.payload.comment
      events[index] = event
      console.log(event)
      return {...state, events: events}
    case SAVE_KANBAN:
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.kanban = action.payload.kanban
      events[index] = event
      console.log(event)
      return {...state, events: events}
    case SAVE_TASK:
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.task = action.payload.task
      events[index] = event
      console.log(event)
      return {...state, events: events}
    // case UPDATE_EVENT_TABBAR_STATE:
    //   console.log('in UPDATE_EVENT_TABBAR_STATE')
    //   console.log(action.payload)
    //   events = [...state.events];
    //   index = events.findIndex(event => event.id === action.payload.currentEventId)
    //   event = {...events[index]}
    //   console.log(event)
    //   event.tabs = action.payload.tabs
    //   events[index] = event
    //   console.log(event)
    return {...state, events: events}
    case RESET_INFO:
      return  {...state, currentEventId: null}
    default:
      return state;
  }
};
