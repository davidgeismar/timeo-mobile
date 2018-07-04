import { Actions } from 'react-native-router-flux';
import { SELECT_HOUR,
         SELECT_MINUTE } from './types'

export const selectEventDuration = (timeCard) => {
  console.log('in selectEventDuration')
  console.log(timeCard)
  if (timeCard.kind == 'hour'){
    return {
      type: SELECT_HOUR,
      payload: timeCard.value
    }
  }
  else {
    console.log('in action minute')
    return {
      type: SELECT_MINUTE,
      payload: timeCard.value
    }
  }
}

export const selectTimeCard = (timeCard) => {
  console.log('in selectTimeCard')
  console.log(timeCard)
  if (timeCard.kind == 'hour'){
    return {
      type: SELECT_HOUR,
      payload: timeCard.value
    }
  }
  else {
    console.log('in action minute')
    return {
      type: SELECT_MINUTE,
      payload: timeCard.value
    }
  }
};
