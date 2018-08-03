import { RESET_INFO,
         UNSET_CURRENT_TASK,
         UPDATE_EVENT,
         UPDATE_CURRENT_EVENT_COMMENT,
         CREATE_EVENT,
         SET_CURRENT_EVENT,
         UPDATE_EVENT_DURATION,
         UPDATE_EVENT_ACTION,
         DELETE_EVENT,
         LOAD_EVENTS,
         SET_CURRENT_EVENT_TASK,
         SET_EVENT_TO_DELETE
       } from '../actions/types';
const INITIAL_STATE = { events: [],
                        currentEventId: null,
                        currentEventComment: null,
                        currentEventCard: null,
                        currentEvent: null,
                        eventToDelete: null
                      }


// chaque event devra probablement avoir un tabState pour savoir quelle tabs doivent etre activée
export const EventReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case SET_CURRENT_EVENT_TASK:
      return {...state, currentEventCard: action.payload}
    case UNSET_CURRENT_TASK:
        return {...state, currentEventCard: null}
    case LOAD_EVENTS:
      return {...state, events: action.payload}
    case CREATE_EVENT:
      // pushé le payload dans le tableau d'event and sets the currentEvent
      return {...state, events: [...state.events, action.payload], currentEventId: action.payload.id , currentEvent: action.payload};
    case SET_CURRENT_EVENT:
        const currentEvent = state.events.find(event => event.id == action.payload)
        return { ...state, currentEventId: action.payload, currentEventComment: null, currentEvent: currentEvent}
    case DELETE_EVENT:
        events = [...state.events];
        index = events.findIndex(event => event.id === action.payload)
        events.splice(index, 1);
        return {...state, events: events}
    case SET_EVENT_TO_DELETE:
      return {...state, eventToDelete: action.payload}
    case UPDATE_CURRENT_EVENT_COMMENT:
      return {...state, currentEventComment: action.payload}
    case UPDATE_EVENT:
      events = [...state.events];
      index = events.findIndex(event => event.id === action.payload.id)
      events[index] = action.payload
      return {...state, events: events, currentEvent: action.payload}
    case RESET_INFO:
      return  {...state, currentEventId: null, currentEvent: null}
    default:
      return state;
  }
};
