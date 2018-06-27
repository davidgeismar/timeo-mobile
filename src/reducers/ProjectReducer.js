import { RESET_INFO, LOAD_CLIENT_PROJECTS, SELECT_ACTION } from '../actions/types';

const INITIAL_STATE = []
const PROJECTS = [{id: 1, name: 'Edulib', clientId: 1}, {id: 2, name: 'Edulib 2018', clientId: 1}, {id: 3, name: 'Gestion Utilisateur', clientId: 2}]
export const ProjectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_CLIENT_PROJECTS:
        console.log('LOAD_CLIENT_PROJECTS')
        console.log(action.payload)
        projects = PROJECTS.filter(project => project.clientId == action.payload )
        console.log(projects)
        return projects
    case RESET_INFO:
      return INITIAL_STATE
    default:
      return state;
  }
};
