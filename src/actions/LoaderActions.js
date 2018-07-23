import { SET_LOADER, SET_ERROR, SET_BACKGROUND_IMAGE } from './types'
import axios from 'axios';

export const setLoaderState = (loaderState) => {
  return {
          type: SET_LOADER,
          payload: false
        }

}

export const setErrorState = (errorMessage) => {
  return {
      type: SET_ERROR,
      payload: errorMessage
    }
}

export const fetchImageOfTheDay = () =>{
  return (dispatch) => {
    axios.get('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1')
      .then(response => fetchImageOfTheDaySuccess(dispatch, response))
      .catch(error => console.log(error));
    };
}

const fetchImageOfTheDaySuccess = (dispatch, data) => {
  dispatch({
    type: SET_BACKGROUND_IMAGE,
    payload: data.data.images[0].url
  })
}

export const onRequestErrorCallback = (dispatch, error) => {
  dispatch(setLoaderState(false))
  dispatch(setErrorState(error.message))
};
