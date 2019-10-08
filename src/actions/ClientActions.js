// cleanup ok

import { LOAD_CLIENTS, ACTIVATE_TAB } from './types'
import API from './Api';
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'


// fetches clients from API
// NOT USED
export const fetchClients = () => {
  return (dispatch) => {
    dispatch(setLoaderState(true))
    API.get('/internal/obeya/api/v0/clients')
      .then(response => fetchClientsSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(dispatch, error));
    };
};

// updates redux store
const fetchClientsSuccess = (dispatch, data) => {
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: LOAD_CLIENTS,
    payload: data.data
  })
}
