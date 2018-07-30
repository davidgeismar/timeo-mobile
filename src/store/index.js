import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import { persistStore, autoRehydrate, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import axios from 'axios';

const persistConfig = {
 key: 'root',
 storage: AsyncStorage,
 stateReconciler: autoMergeLevel2,// see "Merge Process" section for details.
 blacklist: ['error', 'loading', 'backgroundImage']
};
const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
        pReducer,
        {},
        compose(
          applyMiddleware(ReduxThunk)
      )
);

export const persistor = persistStore(store);