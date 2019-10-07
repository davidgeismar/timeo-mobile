import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)
export const makeMockStore = (state = {}) => {
  return mockStore({
    ...state
  })
}
