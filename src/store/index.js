import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import { persistStore, autoRehydrate, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import axios from 'axios';
import API from '../actions/Api';


async function checkStoredTokenValidity(){
                  const data = await AsyncStorage.getItem('persist:root')
                  console.log('checkStoredTokenValidity')
                  console.log(data)
                  return JSON.parse(data)
}

async function checkAuthTokenValidity(resp){
 console.log('in checkAuthTokenValidity')
 const token = JSON.parse(resp.authentication).token
 const config = {
   method: 'GET',
   url: 'http://staging.obeya.xair.cloud/internal/timeo/api/v0/auth/ping',
   headers: {
     Accept: 'application/json',
     Authorization: 'Bearer ' + token
   }
  }

  return await axios(config)
}

const authTokenCheckSuccess = (resp, token) => {
  // return new Promise((resolve, reject) => {
     console.log(resp)
     console.log('authTokenCheckSuccess')
     console.log(resp.data.message)
     if (resp.data.message === 'pong'){
       console.log('token valid')
       API.defaults.headers.common['Accept'] = 'application/json'
       API.defaults.headers.common['Authorization'] = 'Bearer ' + token
       // return resolve(true)
     }
     else {
       API.defaults.headers.common['Accept'] = 'application/json'
       API.defaults.headers.common['Authorization'] = null
       // return reject(false)
     }
  // })
}


const authTokenCheckError = (err) => {
   console.log('authTokenCheckError')
   console.log(err)
   API.defaults.headers.common['Accept'] = 'application/json'
   API.defaults.headers.common['Authorization'] = null
}

const createReduxStore = () => {
    console.log('in createReduxStore')
    const persistConfig = {
       key: 'root',
       storage: AsyncStorage,
       stateReconciler: autoMergeLevel2,// see "Merge Process" section for details.
       blacklist: ['error', 'loading', 'backgroundImage']
      };
   const pReducer = persistReducer(persistConfig, reducers);
   const store =  createStore(
                      pReducer,
                      {},
                      compose(
                        applyMiddleware(ReduxThunk)
                    )
                  )
   console.log(store)
   return store
}


const persistConfig = {
   key: 'root',
   storage: AsyncStorage,
   stateReconciler: autoMergeLevel2,// see "Merge Process" section for details.
   blacklist: ['error', 'loading', 'backgroundImage']
  };
const pReducer = persistReducer(persistConfig, reducers);
export const store =  createStore(
                   pReducer,
                   {},
                   compose(
                     applyMiddleware(ReduxThunk)
                 )
               )


export const persistor = persistStore(store);
console.log(store)




// API.get('/url')
// .then(
//   stor.kfkf
//
// )



// console.log(store.getState())
// persistor.purge()
