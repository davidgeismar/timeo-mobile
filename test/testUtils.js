import { createStore, applyMiddleware }from 'redux';
import reducers from '../src/reducers';
import ReduxThunk from 'redux-thunk';



const middlewares = [ReduxThunk]
export const storeFactory = (initialState) => {
  const createStoreWithMiddlewares = applyMiddleware(...middlewares)(createStore)
  return createStoreWithMiddlewares(reducers, initialState)
}
