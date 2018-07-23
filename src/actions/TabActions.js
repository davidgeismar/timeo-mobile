import { Actions } from 'react-native-router-flux';
import { ACTIVATE_TAB } from './types'
import { loadProjectKanbans } from './KanbanActions'
import { setCurrentEventTask } from './EventActions'

const activateTabSuccess = (dispatch, getState,  tabLabel) => {
  dispatch({
    type: ACTIVATE_TAB,
    payload: tabLabel
  });

  switch(tabLabel) {
    case 'chrono':
      return Actions.chrono()
    case 'time':
      return Actions.time()
    case 'projects':
      return Actions.projects()
    case 'client':
      return Actions.client()
    case 'events':
      return Actions.events()
    case 'info':
      const currentEvent = getState().eventsData.events.find(event => event.id == getState().eventsData.currentEventId)
      if (currentEvent.project_id){
        dispatch(loadProjectKanbans(currentEvent.project_id))
      }
      dispatch(setCurrentEventTask(currentEvent.card_id))
      return Actions.info()
    }
}

export const activateTab = (tabLabel) => {
  return(dispatch, getState) => {
    activateTabSuccess(dispatch, getState, tabLabel)
  }
}
