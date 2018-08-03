import { Actions } from 'react-native-router-flux';
import { DELETE_SELECTED_TASK,
         SET_CURRENT_TASK,
         SAVE_TASK,
         SEARCH_TASK_INIT,
         LOAD_KANBAN_TASKS,
         CHANGE_TASKLIST_SCOPE,
         SEARCH_TASK,
         UPDATE_SEARCH_PATTERN
       } from './types'
import API from './Api';
import { setLoaderState, setErrorState, onRequestErrorCallback } from './LoaderActions'

 export const loadKanbanCards= (kanbanId, loader=false) => {
   return (dispatch) => {
     if (loader) {
       dispatch(setLoaderState(true))
     }
     dispatch(updateSearchPattern(''))
     API.get(`/internal/timeo/api/v0/kameo_cards/by-kanban-id/${kanbanId}?limit_to_mine=false`)
       .then(response => loadKanbanCardsSuccess(dispatch, response))
       .catch(error => onRequestErrorCallback(dispatch, error));
   };
 }

 const loadKanbanCardsSuccess = (dispatch, data) => {
   console.log('in loadKanbanCardsSuccess')
   const cards = data.data
   dispatch(setLoaderState(false))
   dispatch(setErrorState(false))
   dispatch({
     type: LOAD_KANBAN_TASKS,
     payload: cards
   });
 }

const updateSearchPattern = (pattern) => {
  return {
    type: UPDATE_SEARCH_PATTERN,
    payload: pattern
  }
}



export const searchCards= (kanbanId, pattern, limitToMine)=> {
  if (pattern == ""){
    return (dispatch) => {
      dispatch(setLoaderState(true))
      dispatch(loadKanbanCards(kanbanId))
    }
  }
  else {
    return (dispatch) => {
      dispatch(setLoaderState(true))
      dispatch(updateSearchPattern(pattern))
      API.get(`/internal/timeo/api/v0/kameo_cards/by-kanban-id/${kanbanId}/pattern?pattern=${pattern}&limit_to_mine=${limitToMine}`)
        .then(response => searchCardsSuccess(dispatch, response))
        .catch(error => onRequestErrorCallback(dispatch, error));
    };
  }
}

const searchCardsSuccess = (dispatch, data) => {
  const cards = data.data
  dispatch(setLoaderState(false))
  dispatch(setErrorState(false))
  dispatch({
    type: SEARCH_TASK,
    payload: cards
  });
}

export const changeCardListScope = (switchValue, searchPattern, kanbanId) => {
  const limitToMine = switchValue ? false : true
  return(dispatch) => {
    dispatch(setLoaderState(true))
    const url = searchPattern == '' ? `/internal/timeo/api/v0/kameo_cards/by-kanban-id/${kanbanId}?limit_to_mine=${limitToMine}` : `/internal/timeo/api/v0/kameo_cards/by-kanban-id/${kanbanId}/pattern?pattern=${pattern}&limit_to_mine=${limitToMine}`

    API.get(url)
      .then(response => changeCardListScopeSuccess(dispatch, response, limitToMine))
      .catch(error => onRequestErrorCallback(dispatch, error));
  }
}

export const changeCardListScopeSuccess = (dispatch, data, limitToMine) => {
  dispatch({
    type: CHANGE_TASKLIST_SCOPE,
    payload: { limitToMine: limitToMine,
               cards: data.data }
  })
}


export const removeSelectedCard = () => {
  return(dispatch) => {
    dispatch({
      type: DELETE_SELECTED_TASK,
      payload: true
    });
    Actions.info()
  }
}

export const setCurrentCard = (card) => {
  return(dispatch) => {
    dispatch({
      type: SET_CURRENT_TASK,
      payload: card
    });
  }
}

export const updateSearchCardStatus = (status) => {
  return {
    type: SEARCH_TASK_INIT,
    payload: status
  }
}
