import { Actions } from 'react-native-router-flux';
import { DELETE_SELECTED_KANBAN,
         SET_CURRENT_KANBAN,
         LOAD_PROJECT_KANBANS} from './types'
import { activateTab, activateTabSuccess } from './TabActions'
import { loadKanbanCards } from './CardActions'
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'
import API from './Api';


 // fetching kanban from api
 export const loadProjectKanbans= (projectId, dispatch) => {
   return (dispatch) => {
     // dispatch(setLoaderState(true))
     API.get(`/internal/timeo/api/v0/kameo_kanbans/by-project-id/${projectId}`)
       .then(response => loadProjectKanbansSuccess(dispatch, response))
       .catch(error => onRequestErrorCallback(dispatch, error));
   };
 }

 // updating store
 const loadProjectKanbansSuccess = (dispatch, data) => {
     const kanbans = data.data
     // dispatch(setLoaderState(false))
     dispatch({
       type: LOAD_PROJECT_KANBANS,
       payload: kanbans
     });
 }

 export const removeSelectedKanban = () => {
   return(dispatch) => {
     dispatch({
       type: DELETE_SELECTED_KANBAN,
       payload: true
     });
     Actions.info()
   }
 }

export const loadSelectedKanban = (kanbanId) => {
  console.log('loadSelectedKanban')
  return (dispatch) => {
    API.get(`/internal/timeo/api/v0/kameo_kanbans/${kanbanId}`)
    .then(response => dispatch(setCurrentKanban(response.data)))
    .catch(error => onRequestErrorCallback(dispatch, error));
  }
}
export const setCurrentKanban = (kanban) => {
  console.log('in setCurrentKanban')
  return {
          type: SET_CURRENT_KANBAN,
          payload: kanban
        }
}
