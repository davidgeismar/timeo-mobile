import { Actions } from 'react-native-router-flux';
import { DELETE_SELECTED_KANBAN,
         SET_CURRENT_KANBAN,
         SAVE_KANBAN,
         LOAD_PROJECT_KANBANS} from './types'
import { activateTab, activateTabSuccess } from './TabActions'
import { loadKanbanTasks } from './TaskActions'
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'
import API from './Api';


 export const loadProjectKanbans= (projectId, dispatch) => {
   return (dispatch) => {
     dispatch(setLoaderState(true))
     API.get(`/internal/timeo/api/v0/kameo_kanbans/by-project-id/${projectId}`)
       .then(response => loadProjectKanbansSuccess(dispatch, response))
       .catch(error => onRequestErrorCallback(dispatch, error));
   };
 }

 const loadProjectKanbansSuccess = (dispatch, data) => {
     const kanbans = data.data
     dispatch(setLoaderState(false))
     dispatch({
       type: LOAD_PROJECT_KANBANS,
       payload: kanbans
     });
 }


const removeSelectedKanbanSuccess = (dispatch) => {
  dispatch({
    type: DELETE_SELECTED_KANBAN,
    payload: true
  });
  Actions.info()
}

export const removeSelectedKanban = () => {
  return(dispatch) => {
    removeSelectedKanbanSuccess(dispatch)
  }
}

const setCurrentKanbanSuccess = (dispatch, kanban) => {
  dispatch({
    type: SET_CURRENT_KANBAN,
    payload: kanban
  });
}

export const setCurrentKanban = (kanban) => {
  return(dispatch) => {
    setCurrentKanbanSuccess(dispatch, kanban)
  }
}
