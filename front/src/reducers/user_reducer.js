import {LOGIN_USER, LOGOUT_USER, REGISTER_USER, AUTH_USER} from '../constants/ActionTypes';

//eslint-disable-next-line
const user = (state = {}, action) => {
  switch (action.type) {
      case LOGIN_USER:
          return {
             ...state, 
             loginSuccess: action.payload 
            }
      case LOGOUT_USER:
          return {
            ...state
          }
      case REGISTER_USER:
          return {
             ...state, 
             register: action.payload
            }
      case AUTH_USER:
        return {
          ...state,
          userData : action.payload
        }
      default:
          return state;
  }
}

export default user;