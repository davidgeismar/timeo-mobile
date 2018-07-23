import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import { persistStore, autoRehydrate, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const persistConfig = {
 key: 'root',
 storage: AsyncStorage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};
const pReducer = persistReducer(persistConfig, reducers);
const store = createStore(
        pReducer,
        {},
        compose(
          applyMiddleware(ReduxThunk)
      )
);
persistStore(store, {storage: AsyncStorage, whitelist: [ 'authentication']})

export default store;








export const store = createStore(pReducer);
export const persistor = persistStore(store);
