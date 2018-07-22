import { SET_LOADER, SET_ERROR, SET_BACKGROUND_IMAGE } from './types'
import axios from 'axios';

export const setLoaderState = (loaderState) => {
  console.log('in setLoaderState')
  console.log(loaderState)
  return {
          type: SET_LOADER,
          payload: false
        }

}

export const setErrorState = (errorMessage) => {
  console.log('in setErrorState')
  console.log(errorMessage)
  return {
      type: SET_ERROR,
      payload: errorMessage
    }
}

export const fetchImageOfTheDay = () =>{
  return (dispatch) => {
    console.log('in fetchImageOfTheDay');
    axios.get('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1')
      .then(response => fetchImageOfTheDaySuccess(dispatch, response))
      .catch(error => console.log(error));
    };
}

const fetchImageOfTheDaySuccess = (dispatch, data) => {
  console.log('in fetchImageOfTheDaySuccess');
  console.log(data.data)
  console.log(data.data.images[0].url);
  dispatch({
    type: SET_BACKGROUND_IMAGE,
    payload: data.data.images[0].url
  })
}

export const onRequestErrorCallback = (dispatch, error) => {
  console.log('in onRequestErrorCallback');
  dispatch(setLoaderState(false))
  dispatch(setErrorState(error.message))
  console.log(dispatch)
  console.log(error)
  if (error.message){
    console.log(error.message)
  }
};
