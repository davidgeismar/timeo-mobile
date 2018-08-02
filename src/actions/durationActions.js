// cleanup ok
// actions for manual selection of duration (timecard, timecardlist)
import { Actions } from 'react-native-router-flux';
import { SELECT_HOUR,
         SELECT_MINUTE } from './types'

export const selectEventDuration = (timeCard) => {
  if (timeCard.kind == 'hour'){
    return {
      type: SELECT_HOUR,
      payload: timeCard.value
    }
  }
  else {
    return {
      type: SELECT_MINUTE,
      payload: timeCard.value
    }
  }
}
