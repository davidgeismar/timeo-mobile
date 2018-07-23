import { Actions } from 'react-native-router-flux';
import { RESET_INFO } from './types'


const resetAppInfoSuccess = (dispatch) => {
 dispatch({
   type: RESET_INFO,
   payload: null
 })
 Actions.starter()
}
export const resetAppInfo = () => {
 return(dispatch) => {
   resetAppInfoSuccess(dispatch)
 }
}
