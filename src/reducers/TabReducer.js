import { SET_CURRENT_EVENT_TABBAR_STATE,
         ACTIVATE_TAB,
         RESET_INFO } from '../actions/types';

const INITIAL_STATE = {
  activeTab: null,
  disabledTabs: ['chrono', 'time', 'client', 'project', 'info']
};

export const TabReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ACTIVATE_TAB:
      let disabledTabs = [...state.disabledTabs]
      index = disabledTabs.findIndex(tab => tab === action.payload)
      disabledTabs.splice(index, 1);
      console.log('in activate tab')
      console.log(disabledTabs)
      return {...state, activeTab: action.payload, disabledTabs: disabledTabs}
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};