// cleanup ok
import { Actions } from 'react-native-router-flux';
import { SET_AUTH_TOKEN,
         INITIALIZE_USER,
         LOAD_EVENTS,
         LOAD_CLIENTS,
         SET_RESOURCES,
         RESET_INFO,
         AUTH_UPDATE } from './types'
import API from './Api';
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'

// front update of loginform
export const authUpdate = ({ prop, value }) => {
  return {
    type: AUTH_UPDATE,
    payload: { prop, value }
  };
};

// API CALL TO LOGIN USER
export const loginUser = (creds) => {
  return (dispatch) => {
    dispatch(setLoaderState(true))
    const conf = { client_id: 'c84b72377f22fda28d8912acf9feed92fb1178e15eb8709c9a14c16fa180e91f',
                  client_secret: '8463d7894c7531aee91e5dfbb80cffa40fd94fd319b2aa2407ae437ab309c5ce',
                  grant_type: 'password',
                }
    const creds = {
      username: 'd.sylla@xair.fr',
      password: 'whazaaz313'
    }
    const fullConf = {...creds, ...conf}
    API.post('/oauth/token', fullConf)
      .then(response => loginUserSuccess(dispatch, response))
      .catch(error => onRequestErrorCallbackLogin(dispatch, error));
  };
};

// on successfull login first I fetch the user info with API call
const loginUserSuccess = (dispatch, data) => {
  dispatch(setErrorState(false))
  API.defaults.headers.common['Accept'] = 'application/json'
  API.defaults.headers.common['Authorization'] = 'Bearer ' + data.data.access_token;
  dispatch({
    type: SET_AUTH_TOKEN,
    payload: {token: data.data.access_token}
  })
  API.get('/internal/timeo/api/v0/me')
    .then(response => getUserInfoSuccess(dispatch, response))
    .catch(error => onRequestErrorCallback(dispatch, error));
};

// callback for error during login
export const onRequestErrorCallbackLogin = (dispatch, error) => {
  dispatch(setLoaderState(false))
  dispatch(setErrorState(error.message))
};

// after I successfully fetched user info I load all the resources linked to the user
const getUserInfoSuccess = (dispatch, data) => {
  dispatch({
    type: INITIALIZE_USER,
    payload: data.data
  })
  dispatch(loadResources())
  dispatch(setLoaderState(false))
  Actions.chrono()
}

// we load events, clients and resources we load them concurrently (we dont use dispatch)
const loadResources = () => {
  return (dispatch) => {
    dispatch(setLoaderState(true))
    // events
    API.get('/internal/timeo/api/v0/actions')
      .then(response => initialFetchEventsSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(dispatch, error));
    // clients
    API.get('/internal/timeo/api/v0/clients')
      .then(response => initialFetchClientsSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(dispatch, error));
    // resources
    API.get('/internal/obeya/api/v0/resources')
        .then(response => getRessourcesSuccess(dispatch, response))
        .catch(error => onRequestErrorCallback(dispatch, error));
  }
}

// on successfull fetch we dispatch data to the store
const initialFetchEventsSuccess = (dispatch, data) => {
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: LOAD_EVENTS,
    payload: data.data
  });
}

// on successfull fetch we dispatch data to the store
const initialFetchClientsSuccess = (dispatch, data) => {
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: LOAD_CLIENTS,
    payload: data.data
  })
}

// on successfull fetch we dispatch data to the store
const getRessourcesSuccess = (dispatch, data) => {
  dispatch({
    type: SET_RESOURCES,
    payload: data.data
  })
}

// user logout
export const logoutUser = () => {
  return (dispatch) => {
    API.defaults.headers.common['Authorization'] = '';
    logoutUserSuccess(dispatch)
  }
};

// resetting app to ALMOST initial state and redirecting to login
const logoutUserSuccess = (dispatch) => {
  dispatch({
    type: RESET_INFO,
    payload: true
  })
  Actions.login()
}
