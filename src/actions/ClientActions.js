import { LOAD_CLIENTS, ACTIVATE_TAB } from './types'
import API from './Api';
import { activateTab } from './TabActions'
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'

export const fetchClients = () => {
  return (dispatch) => {
    dispatch(setLoaderState(true))
    API.get('/internal/timeo/api/v0/clients')
      .then(response => fetchClientsSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(dispatch, error));
    };
};

const fetchClientsSuccess = (dispatch, data) => {
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: LOAD_CLIENTS,
    payload: data.data
  })
  dispatch(activateTab('client'));


}
