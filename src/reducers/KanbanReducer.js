import {RESET_INFO, SET_CURRENT_KANBAN, LOAD_PROJECT_KANBANS, DELETE_SELECTED_KANBAN } from '../actions/types';

const INITIAL_STATE = {list: [], selectedKanban: null}
const KANBANS = [{id: 1, name: 'Edulib Lot 3', projectId: 1}, {id: 2, name: 'test & recette', projectId: 1}, {id: 3, name: 'Ascenceur', projectId: 2}]
export const KanbanReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_PROJECT_KANBANS:
        console.log('LOAD_CLIENT_KANBANS')
        console.log(action.payload)
        kanbans = KANBANS.filter(kanban => kanban.projectId == action.payload )
        console.log(kanbans)
        return {...state, list: kanbans}
    case SET_CURRENT_KANBAN:
        console.log('SET_CURRENT_KANBAN')
        console.log(action.payload)
        return {...state, selectedKanban: action.payload}
    case DELETE_SELECTED_KANBAN:
        console.log('DELETE_SELECTED_KANBAN')
        return {...state, selectedKanban: null}
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};
