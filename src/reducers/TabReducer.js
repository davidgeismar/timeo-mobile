import { SET_CURRENT_EVENT_TABBAR_STATE,
         ACTIVATE_TAB,
         RESET_INFO,
         DISABLE_TABS } from '../actions/types';
const INITIAL_STATE = {
  activeTab: null,
  disabledTabs: ['chrono', 'time', 'client', 'project', 'info']
};

// revoir la nav
// sur tout les activateTab inclure un deuxieme parametre qui set les disabledTabs
export const TabReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVATE_TAB:
      let disabledTabs = [...state.disabledTabs]
      index = disabledTabs.findIndex(tab => tab === action.payload)
      disabledTabs.splice(index, 1);
      return {...state, activeTab: action.payload, disabledTabs: disabledTabs}
    case DISABLE_TABS:
      return {...state, disabledTabs: action.payload}
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};
