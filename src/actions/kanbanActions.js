import { Actions } from 'react-native-router-flux';
import { DELETE_SELECTED_KANBAN,
         SET_CURRENT_KANBAN,
         SAVE_KANBAN,
         LOAD_KANBAN_TASKS } from './types'


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
  console.log('in setCurrentKanban')
  console.log(kanban)
  return(dispatch) => {
    setCurrentKanbanSuccess(dispatch, kanban)
  }
}

const saveKanbanSuccess = (dispatch, eventId, kanban) => {
  console.log('in saveKanbanSuccess')
  console.log(kanban)
  console.log(eventId)
  dispatch({
    type: SAVE_KANBAN,
    payload: {eventId: eventId, kanban: kanban}
  });
  dispatch({
    type: LOAD_KANBAN_TASKS,
    payload: kanban.id
  });
  Actions.taskList()
}

export const saveKanban = (eventId, kanban) => {
  console.log('in saveKanban')
  console.log(eventId)
  console.log(kanban)
  return(dispatch) => {
    saveKanbanSuccess(dispatch,eventId, kanban)
  }
}
