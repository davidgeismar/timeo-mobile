import { Actions } from 'react-native-router-flux';
import { LOGIN_USER, LOGOUT_USER} from './types'


const loginUserSuccess = (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: true
  })
  Actions.chrono()
}
export const loginUser = (mood) => {
 console.log('in loginUser')
 console.log(mood)
 return(dispatch) => {
   loginUserSuccess(dispatch)
 }
}

const logoutUserSuccess = (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
    payload: true
  })
  Actions.login()
}
export const logoutUser = () => {
 console.log('in logoutUser')
 return(dispatch) => {
   logoutUserSuccess(dispatch)
 }
}
