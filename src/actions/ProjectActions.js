import { Actions } from 'react-native-router-flux';
import { LOAD_PROJECT_KANBANS } from './types'


const loadProjectKanbansSuccess = (dispatch, projectId) => {
    dispatch({
      type: LOAD_PROJECT_KANBANS,
      payload: projectId
    });
    Actions.kanbanList()
}

export const loadProjectKanbans= (projectId) => {
  console.log('in loadProjectKanbansClient')
  console.log(projectId)
  return(dispatch) => {
    loadProjectKanbansSuccess(dispatch, projectId)
  }
}
