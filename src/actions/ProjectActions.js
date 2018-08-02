import { Actions } from 'react-native-router-flux';
import { LOAD_CLIENT_PROJECTS } from './types'
import API from './Api';
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'



export const loadClientProjects = (clientId) => {
  return (dispatch) => {
    // dispatch(setLoaderState(true))
    API.get(`/internal/timeo/api/v0/projects/by-client-id/${clientId}`)
      .then(response => loadClientProjectsSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(dispatch, error));
  };
}

const loadClientProjectsSuccess = (dispatch, data) => {
    console.log('loadClientProjectsSuccess')
    const projects = data.data
    dispatch(setLoaderState(false))
    dispatch(setErrorState(false))
    dispatch({
      type: LOAD_CLIENT_PROJECTS,
      payload: projects
    });
}
