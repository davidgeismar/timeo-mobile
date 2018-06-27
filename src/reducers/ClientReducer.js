import { SELECT_ACTION } from '../actions/types';

const INITIAL_STATE = [{name: 'EDULIB', id: 1},{name: 'RIVP', id: 2},{name: 'DORCEL', id: 3}]

export const ClientReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
