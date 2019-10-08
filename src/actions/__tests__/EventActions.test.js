import moxios from 'moxios'
import { Actions } from 'react-native-router-flux';
import '../../../mocks/fluxActionsMock'
import { makeMockStore } from '../../../mocks/mockStore'
import {
   ACTIVATE_TAB,
   CREATE_EVENT,
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
   ADD_FILE_TO_CURRENT_EVENT,
   SET_ERROR
} from '../types'
import API from '../Api';
import postEventMock from '../../../mocks/postEventMock';
import {
  createEvent,
  setCurrentEvent,
  updateEvent
} from '../EventActions'



describe('EventActions', () => {
  let store;
  beforeEach(()=>{
    moxios.install(API)
    store = makeMockStore({});
  })

  afterEach(() => {
    moxios.uninstall(API);
  })

  it('createEvent', () => {
    moxios.stubRequest('/internal/timeo/api/v0/actions', {
      status: 200,
      response: postEventMock
    });
    const expectedActions = [
      { type: ACTIVATE_TAB, payload: 'client' },
      { type: SET_ERROR, payload: false },
      { type: CREATE_EVENT, payload: postEventMock},
      { type: RESET_CHRONO, payload: true}
    ]

    return store.dispatch(createEvent('automatic', 575)).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
     })

  });
  // 
  // it('updateEvent', () => {
  //   moxios.stubRequest('/internal/timeo/api/v0/actions/5d9c32122c7e94086bc62d12', {
  //     status: 200,
  //     response: patchEventMock
  //   });
  //   const expectedActions = [
  //     { type: ACTIVATE_TAB, payload: 'client' },
  //     { type: SET_ERROR, payload: false },
  //     { type: CREATE_EVENT, payload: postEventMock},
  //     { type: RESET_CHRONO, payload: true}
  //   ]
  //
  //   return store.dispatch(createEvent('automatic', 575)).then(() => {
  //      expect(store.getActions()).toEqual(expectedActions)
  //    })
  //
  // });

  it('sets current event automatic', () => {
    store = makeMockStore({
      eventsData: {
        currentEvent: {
          cardId: null
        },
        events: [
          {
            id: '5d9c32122c7e94086bc62d12',
            measure_kind: 'automatic',
            duration: 575,
            cardId: null
          },
          {
            id: '5d9c32122c7e94086bc62d13',
            measure_kind: 'manual',
            duration: 19567899,
            cardId: null
          }

        ]
      }
    });
    const expectedActionsAutomatic = [
      { type: SET_CURRENT_EVENT, payload: '5d9c32122c7e94086bc62d12' },
      { type: SET_CURRENT_CHRONO_BASETIME, payload: 575 },
      { type: ACTIVATE_TAB, payload: 'info'},
    ]

    store.dispatch(setCurrentEvent('5d9c32122c7e94086bc62d12'))
    expect(store.getActions()).toEqual(expectedActionsAutomatic)
  });
  it('sets current event manual', () => {
    store = makeMockStore({
      eventsData: {
        currentEvent: {
          cardId: null
        },
        events: [
          {
            id: '5d9c32122c7e94086bc62d12',
            measure_kind: 'automatic',
            duration: 575,
            cardId: null
          },
          {
            id: '5d9c32122c7e94086bc62d13',
            measure_kind: 'manual',
            duration: 19567899,
            cardId: null
          }

        ]
      }
    });

    const expectedActionsManual = [
      { type: SET_CURRENT_EVENT, payload: '5d9c32122c7e94086bc62d13' },
      { type: SET_CURRENT_MANUAL_DURATION, payload: {selectedHour: "05", selectedMinute: 26} },
      { type: ACTIVATE_TAB, payload: 'info'},
    ]

    store.dispatch(setCurrentEvent('5d9c32122c7e94086bc62d13'))
    expect(store.getActions()).toEqual(expectedActionsManual)
  });
});
