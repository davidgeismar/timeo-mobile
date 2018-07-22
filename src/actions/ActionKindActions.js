import { SET_ACTION_KINDS } from './types'
import { Actions } from 'react-native-router-flux';
import API from './Api';
import { activateTab } from './TabActions'
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'

export const fetchActionKinds = () => {
  return (dispatch) => {
    console.log('in fetchActionKinds');
    setLoaderState(dispatch, true)
    API.get('/internal/timeo/api/v0/action_kinds')
      .then(response => fetchActionKindsSuccess(dispatch, response))
      .catch(error => onRequestErrorCallback(dispatch, error));
    };
};

const fetchActionKindsSuccess = (dispatch, data) => {
  console.log('in fetchActionKindsSuccess');
  console.log(data);
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: SET_ACTION_KINDS,
    payload: data.data
  })
  return Actions.actionList()
}
