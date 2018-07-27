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
      return {...state, currentEventTask: action.payload}
    case LOAD_EVENTS:
      return {...state, events: action.payload}
    case CREATE_EVENT:
      // pushé le payload dans le tableau d'event
      return {...state, events: [...state.events, action.payload]};
    case SET_CURRENT_EVENT:
        const currentEvent = state.events.find(event => event.id == action.payload)
        return { ...state, currentEventId: action.payload, currentEventComment: null, currentEvent: currentEvent}
    case UPDATE_EVENT_ACTION:
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.action = action.payload.action
      events[index] = event
      return {...state, events: events}
    case EDIT_EVENT_HOUR:
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.duration.selectedHour = action.payload.value
      events[index] = event
      return {...state, events: events}
    case EDIT_EVENT_MINUTE:
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.duration.selectedMinute = action.payload.value
      events[index] = event
      return {...state, events: events}
    case DELETE_EVENT:
        events = [...state.events];
        index = events.findIndex(event => event.id === action.payload)
        events.splice(index, 1);
        return {...state, events: events}
    case SET_EVENT_TO_DELETE:
      return {...state, eventToDelete: action.payload}
    case UPDATE_CURRENT_EVENT_COMMENT:
      return {...state, currentEventComment: action.payload}
    case SAVE_KANBAN:
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.kanban = action.payload.kanban
      events[index] = event
      return {...state, events: events}
    case SAVE_TASK:
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.eventId)
      event = {...events[index]}
      event.task = action.payload.task
      events[index] = event
      return {...state, events: events}
    case UPDATE_EVENT:
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.id)
      events[index] = action.payload
      return {...state, events: events, currentEvent: action.payload}
    case RESET_INFO:
      return  {...state, currentEventId: null}
    default:
      return state;
  }
};
