import moxios from 'moxios'
import { Actions } from 'react-native-router-flux';
import './fluxActionsMock'
import { makeMockStore } from './mockStore'
import { SET_AUTH_TOKEN,
         INITIALIZE_USER,
         LOAD_EVENTS,
         LOAD_CLIENTS,
         SET_RESOURCES,
         RESET_INFO,
         AUTH_UPDATE } from '../types'
import API from '../Api';
import getActionsMock from '../../../mocks/getActionsMock';
import getClientsMock from '../../../mocks/getClientsMock';
import getResourcesMock from '../../../mocks/getResourcesMock';
import getMeMock from '../../../mocks/getMeMock';

import {
  loginUser,
} from '../AuthenticationActions'


beforeEach(()=>{
  moxios.install(API)
})

afterEach(() => {
  moxios.uninstall(API);
})

it('loginUser', () => {
    moxios.stubRequest('/oauth/token', {
      status: 200,
      response: { access_token: "123" }
    });
    moxios.stubRequest('/internal/obeya/api/v0/me', {
      status: 200,
      response: {first_name: "David", last_name: "GEISMAR"}
    });
    moxios.stubRequest('/internal/timeo/api/v0/actions', {
      status: 200,
      response: getActionsMock
    });
    moxios.stubRequest('/internal/timeo/api/v0/clients', {
      status: 200,
      response: getClientsMock
    });
    moxios.stubRequest('/internal/timeo/api/v0/resources', {
      status: 200,
      response: getResourcesMock
    });
  const expectedActions = [
     { type: LOAD_EVENTS, payload: getActionsMock},
     { type: LOAD_CLIENTS, payload: getClientsMock},
     { type: SET_RESOURCES, payload: getResourcesMock},
  ]
  const store = makeMockStore({});
  const creds = {
   username: 'admin@serenis-groupe.fr',
   password: 'password'
  }

  // await store.dispatch(loginUser(creds));

  return store.dispatch(loginUser(creds)).then(() => {
     console.log(store.getActions())
     expect(store.getActions()).toEqual(expectedActions)
   })

});
