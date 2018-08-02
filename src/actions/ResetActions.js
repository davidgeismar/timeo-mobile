import { Actions } from 'react-native-router-flux';
import { RESET_INFO } from './types'

export const resetAppInfo = () => {
 return(dispatch) => {
   dispatch({
     type: RESET_INFO,
     payload: null
   })
   Actions.chrono()
 }
}
