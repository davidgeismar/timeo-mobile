import { Actions } from 'react-native-router-flux';
import { ACTIVATE_TAB } from './types'
import { fetchCard } from './EventActions'

export const activateTab = (tabLabel) => {
  return(dispatch, getState) => {
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
        const currentEvent = getState().eventsData.currentEvent
        if (currentEvent.cardId){
          dispatch(fetchCard(currentEvent.card_id))
        }
        return Actions.info()
      }
  }
}
