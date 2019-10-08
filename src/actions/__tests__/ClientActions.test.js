// import { makeMockStore } from '../../../mocks/mockStore'
// import { LOAD_CLIENTS, ACTIVATE_TAB } from '../types'
// import { fetchClients } from '../ChronoActions'
// import moxios from 'moxios'
// import getClientsMock from '../../../mocks/getClientsMock';
//
//
// describe('ClientActions', async () => {
//   beforeEach(()=>{
//     moxios.install(API)
//   })
//   afterEach(() => {
//     moxios.uninstall(API);
//   })
//
//   it('fetches clients', () => {
//     moxios.stubRequest('/internal/timeo/api/v0/clients', {
//       status: 200,
//       response: getClientsMock
//     });
//
//     const store = makeMockStore({})
//
//     await store.dispatch(fetchClients())
//   })
//
// })
