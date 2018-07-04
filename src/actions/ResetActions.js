import { Actions } from 'react-native-router-flux';
import { RESET_INFO } from './types'


const resetAppInfoSuccess = (dispatch) => {
 console.log('in resetAppInfoSuccess')
 dispatch({
   type: RESET_INFO,
   payload: null
 })
 Actions.starter()
}
export const resetAppInfo = () => {
 console.log('in resetAppInfo')
 return(dispatch) => {
   resetAppInfoSuccess(dispatch)
 }
}
