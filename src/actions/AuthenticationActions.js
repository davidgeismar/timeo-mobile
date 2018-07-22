import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { RESET_AUTH_TOKEN, AUTH_UPDATE, GET_USER_INFO, INITIALIZE_USER } from './types'
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
    console.log('in loginUser');
    dispatch(setLoaderState(true))
    const conf = { client_id: 'c84b72377f22fda28d8912acf9feed92fb1178e15eb8709c9a14c16fa180e91f',
                  client_secret: '8463d7894c7531aee91e5dfbb80cffa40fd94fd319b2aa2407ae437ab309c5ce',
                  grant_type: 'password',
                }

    const fullConf = {...creds, ...conf}
    console.log(fullConf)
    API.post('/oauth/token', fullConf)
      .then(response => loginUserSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(dispatch, error));
  };
};

const loginUserSuccess = (dispatch, data) => {
  console.log('in loginUserSuccess');
  console.log(data);
  console.log(data.data.access_token)
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  AsyncStorage.setItem('token', data.data.access_token);
  API.defaults.headers.common['Accept'] = 'application/json'
  API.defaults.headers.common['Authorization'] = 'Bearer ' + data.data.access_token;
  console.log(API.defaults.headers)
  API.get('/internal/timeo/api/v0/me')
    .then(response => getUserInfoSuccess(dispatch, response))
    .catch(error => onRequestErrorCallback(dispatch, error));
};

const getUserInfoSuccess = (dispatch, data) => {
  console.log('in getUserInfoSuccess');
  console.log(data);
  dispatch({
    type: INITIALIZE_USER,
    payload: data.data
  })
  Actions.starter()
}

export const logoutUser = () => {
  console.log('in logoutUser')
  return (dispatch) => {
    AsyncStorage.setItem('token', '')
    API.defaults.headers.common['Authorization'] = '';
    logoutUserSuccess(dispatch)
  }
};

const logoutUserSuccess = (dispatch) => {
  console.log('in logoutUserSuccess')
  Actions.login()
}
