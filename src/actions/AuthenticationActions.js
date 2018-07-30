import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {SET_RESOURCES, RESET_INFO, RESET_AUTH_TOKEN, AUTH_UPDATE, GET_USER_INFO, INITIALIZE_USER, SET_AUTH_TOKEN } from './types'
import API from './Api';
import { AsyncStorage } from 'react-native'
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'

export const authUpdate = ({ prop, value }) => {
  return {
    type: AUTH_UPDATE,
    payload: { prop, value }
  };
};

export const loginUser = (creds) => {
  return (dispatch) => {
    dispatch(setLoaderState(true))
    const conf = { client_id: 'c84b72377f22fda28d8912acf9feed92fb1178e15eb8709c9a14c16fa180e91f',
                  client_secret: '8463d7894c7531aee91e5dfbb80cffa40fd94fd319b2aa2407ae437ab309c5ce',
                  grant_type: 'password',
                }
    // const creds = {
    //   username: 'd.sylla@xair.fr',
    //   password: 'whazaaz313'
    // }
    const fullConf = {...creds, ...conf}
    API.post('/oauth/token', fullConf)
      .then(response => loginUserSuccess(dispatch, response))
      .catch(error => onRequestErrorCallbackLogin(dispatch, error));
  };
};

const loginUserSuccess = (dispatch, data) => {
  dispatch(setLoaderState(false))
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

export const onRequestErrorCallbackLogin = (dispatch, error) => {
  console.log('onRequestErrorCallback')
  console.log(error.message)
  dispatch(setLoaderState(false))

  dispatch(setErrorState(error.message))
};

const getUserInfoSuccess = (dispatch, data) => {
  dispatch({
    type: INITIALIZE_USER,
    payload: data.data
  })
  dispatch(getResources())
  Actions.chrono()
}

export const getResources = () => {
  return (dispatch) => {
    API.get('/internal/obeya/api/v0/resources')
            .then(response => getRessourcesSuccess(dispatch, response))
            .catch(error => onRequestErrorCallback(dispatch, error));
  }
}

const getRessourcesSuccess = (dispatch, data) => {
  console.log('getRessourcesSuccess')
  dispatch({
    type: SET_RESOURCES,
    payload: data.data
  })
}

export const logoutUser = () => {
  return (dispatch) => {
    API.defaults.headers.common['Authorization'] = '';
    logoutUserSuccess(dispatch)
  }
};

const logoutUserSuccess = (dispatch) => {
  dispatch({
    type: RESET_INFO,
    payload: true
  })
  Actions.login()
}