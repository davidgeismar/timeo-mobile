//TODO   SET_CURRENT_EVENT// change this test to add to INITIAL_STATE a list of events


import { EventReducer } from '../EventReducer';
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
         SET_EVENT_TO_DELETE,
         ADD_FILE_TO_CURRENT_EVENT } from '../../actions/types';

 const INITIAL_STATE = { events: [],
                         currentEventId: null,
                         currentEventComment: null,
                         currentEventCard: null,
                         currentEvent: null,
                         eventToDelete: null,
                         currentEventFiles: []
                       }

it("handles actions of type SET_CURRENT_EVENT_TASK", () =>{
  const action = {
    type: SET_CURRENT_EVENT_TASK,
    payload: "une carte de kanban"
  }
  const newState = EventReducer(INITIAL_STATE, action);
  expect(newState.currentEventCard).toEqual("une carte de kanban")
})

it("handles actions of type UNSET_CURRENT_TASK", () =>{
  const action = {
    type: UNSET_CURRENT_TASK,
  }
    const newState = EventReducer(INITIAL_STATE, action);
    expect(newState.currentEventCard).toBeNull()
})

it("handles actions of type LOAD_EVENTS", () =>{
  const action = {
    type: LOAD_EVENTS,
    payload: ["un event", "un autre event"]
  }
    const newState = EventReducer(INITIAL_STATE, action);
    expect(newState.events).toEqual(["un event", "un autre event"])
})

it("handles actions of type CREATE_EVENT", () =>{
  const action = {
    type: CREATE_EVENT,
    payload: {
      id: 123,
      content: "un event"
    }
  }
    const newState = EventReducer(INITIAL_STATE, action);
    expect(newState.events).toHaveLength(1)
    expect(newState.currentEventId).toEqual(123)
    expect(newState.currentEvent).toEqual({id: 123, content: "un event"})
})

it("handles actions of type SET_CURRENT_EVENT", () =>{
  const action = {
    type: SET_CURRENT_EVENT,
    payload: 789
  }
  // change this test to add to INITIAL_STATE a list of events
  const newState = EventReducer(INITIAL_STATE, action);
  expect(newState.currentEventId).toEqual(789)
  expect(newState.currentEventComment).toBeNull()
})
// change this test
it("handles actions of type DELETE_EVENT", () =>{
  const action = {
    type: DELETE_EVENT,
    payload: 789
  }
    const newState = EventReducer(INITIAL_STATE, action);
    // expect(newState.selectedHour).toEqual(17)
})

it("handles actions of type SET_EVENT_TO_DELETE", () =>{
  const action = {
    type: SET_EVENT_TO_DELETE,
    payload: {id: 123, content: "event to delete"}
  }
    const newState = EventReducer(INITIAL_STATE, action);
    expect(newState.eventToDelete).toEqual({id: 123, content: "event to delete"})
})

it("handles actions of type UPDATE_CURRENT_EVENT_COMMENT", () =>{
  const action = {
    type: UPDATE_CURRENT_EVENT_COMMENT,
    payload: "Un update de comment"
  }
    const newState = EventReducer(INITIAL_STATE, action);
    expect(newState.currentEventComment).toEqual("Un update de comment")
})

it("handles actions of type ADD_FILE_TO_CURRENT_EVENT", () =>{
  const action = {
    type: ADD_FILE_TO_CURRENT_EVENT,
    payload: {type: "image", title: "file"}
  }
    const newState = EventReducer(INITIAL_STATE, action);
    expect(newState.currentEventFiles).toHaveLength(1)
})

it("handles actions of type UPDATE_EVENT", () =>{
  const action = {
    type: UPDATE_EVENT,
    payload: {
      id: 456,
      content: "un update d'event"
    }
  }
    const newState = EventReducer(INITIAL_STATE, action);
    // expect(newState.currentEvent).toEqual({id: 456, content: "un update d'event"})
    // expect(newState.events)...
})

it("handles actions of type RESET_INFO", () =>{
  const action = {
    type: RESET_INFO
  }
    const newState = EventReducer(INITIAL_STATE, action);
    expect(newState.currentEventId).toBeNull()
    expect(newState.currentEvent).toBeNull()
})
