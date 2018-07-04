import { Actions } from 'react-native-router-flux';
import { ACTIVATE_TAB } from './types'


const activateTabSuccess = (dispatch,  tabLabel) => {
  console.log('in activateTabSuccess')
  console.log(tabLabel)
  dispatch({
    type: ACTIVATE_TAB,
    payload: tabLabel
  });

  switch(tabLabel) {
    case 'chrono':
      return Actions.chrono()
    case 'time':
      console.log('in time')
      return Actions.time()
    case 'project':
      return Actions.project()
    case 'client':
      return Actions.client()
    case 'events':
      return Actions.events()
    }
}

export const activateTab = (tabLabel) => {
  console.log('in activateTab')
  console.log(tabLabel)
  return(dispatch) => {
    activateTabSuccess(dispatch, tabLabel)
  }
}
