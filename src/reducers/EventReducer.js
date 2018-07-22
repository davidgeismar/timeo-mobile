import { RESET_INFO,
         SAVE_TASK,
         SAVE_KANBAN,
         UPDATE_EVENT,
         UPDATE_CURRENT_EVENT_COMMENT,
         UPDATE_EVENT_PROJECT,
         UPDATE_INTERVAL,
         CREATE_EVENT,
         SET_CURRENT_EVENT,
         UPDATE_EVENT_DURATION,
         UPDATE_EVENT_ACTION,
         EDIT_EVENT_HOUR,
         EDIT_EVENT_MINUTE,
         DELETE_EVENT,
         UPDATE_EVENT_CLIENT,
         LOAD_EVENTS,
         STOP_CHRONO,
         SET_CURRENT_EVENT_TASK,
         SET_EVENT_TO_DELETE
       } from '../actions/types';

const INITIAL_STATE = { events: [],
                        currentEventId: null,
                        currentEventComment: null,
                        currentEventTask: null,
                        eventToDelete: null
                      }


// chaque event devra probablement avoir un tabState pour savoir quelle tabs doivent etre activée
export const EventReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SET_CURRENT_EVENT_TASK:
      console.log('in reducer SET_CURRENT_EVENT_TASK')
      console.log(action.payload)
      return {...state, currentEventTask: action.payload}
    case LOAD_EVENTS:
      console.log('in reducer LOAD_EVENTS')
      console.log(action.payload)
      return {...state, events: action.payload}
    case CREATE_EVENT:
      console.log('in reducer CREATE_EVENT')
      console.log(action.payload)
      console.log([...state.events, action.payload])
      // pushé le payload dans le tableau d'event
      return {...state, events: [...state.events, action.payload]};
    case SET_CURRENT_EVENT:
        console.log('in reducer SET_CURRENT_EVENT');
        console.log(action.payload)
        return { ...state, currentEventId: action.payload, currentEventComment: null}
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
        index = events.findIndex(event => event.id === action.payload)
        events.splice(index, 1);
        console.log(events)
        return {...state, events: events}
    case SET_EVENT_TO_DELETE:
      console.log('in reducer SET_EVENT_TO_DELETE')
      console.log(action.payload)
      return {...state, eventToDelete: action.payload}
    case UPDATE_CURRENT_EVENT_COMMENT:
      console.log('in UPDATE_EVENT_COMMENT')
      console.log(action.payload)
      return {...state, currentEventComment: action.payload}
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
    case UPDATE_EVENT:
      console.log('in reducer UPDATE_EVENT_NEW')
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.id)
      events[index] = action.payload
      console.log(events)
      return {...state, events: events}
    return {...state, events: events}
    case RESET_INFO:
      return  {...state, currentEventId: null}
    default:
      return state;
  }
};
