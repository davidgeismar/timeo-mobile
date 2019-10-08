import moxios from 'moxios'
import { Actions } from 'react-native-router-flux';
import '../../../mocks/fluxActionsMock'
import { makeMockStore } from '../../../mocks/mockStore'
import {
   DELETE_SELECTED_TASK,
   SET_CURRENT_TASK,
   SAVE_TASK,
   SEARCH_TASK_INIT,
   LOAD_KANBAN_TASKS,
   CHANGE_TASKLIST_SCOPE,
   SEARCH_TASK,
   UPDATE_SEARCH_PATTERN,
   SET_CURRENT_EVENT_TASK,
   SET_LOADER,
   SET_ERROR
} from '../types'
import API from '../Api';
import getCardsMock from '../../../mocks/getCardsMock';

import {
  loadKanbanCards,
  searchCards,
  changeCardListScope,
  removeSelectedCard,
  setCurrentCard
} from '../CardActions'



describe('CardActions', () => {
  let store;
  beforeEach(()=>{
    moxios.install(API)
    store = makeMockStore({});
  })

  afterEach(() => {
    moxios.uninstall(API);
  })

  it('loads Cards', () => {
      moxios.stubRequest('/internal/timeo/api/v0/kameo_cards/by-kanban-id/5c7655929f2c83e8dfd527be?limit_to_mine=false', {
        status: 200,
        response: getCardsMock
      });
    const expectedActions = [
      { type: UPDATE_SEARCH_PATTERN, payload: '' },
      { type: SET_LOADER, payload: false },
      { type: SET_ERROR, payload: false },
      { type: LOAD_KANBAN_TASKS, payload: getCardsMock}
    ]

    return store.dispatch(loadKanbanCards('5c7655929f2c83e8dfd527be')).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
     })

  });

  it('search Cards', () => {
      moxios.stubRequest('/internal/timeo/api/v0/kameo_cards/by-kanban-id/5c7655929f2c83e8dfd527be/pattern?pattern=abc&limit_to_mine=false', {
        status: 200,
        response: getCardsMock
      });
    const expectedActions = [
      { type: SET_LOADER, payload: true },
      { type: UPDATE_SEARCH_PATTERN, payload: 'abc' },
      { type: SET_LOADER, payload: false },
      { type: SET_ERROR, payload: false },
      { type: SEARCH_TASK, payload: getCardsMock}
    ]
    return store.dispatch(searchCards('5c7655929f2c83e8dfd527be', 'abc', false)).then(() => {
       expect(store.getActions()).toEqual(expectedActions)
     })
 })
});
