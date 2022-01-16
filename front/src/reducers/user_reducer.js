import {LOGIN_USER, REGISTER_USER} from '../constants/ActionTypes';

//eslint-disable-next-line
const user = (state = {}, action) => {
  switch (action.type) {
      case LOGIN_USER:
          return {
             ...state, 
             loginSuccess: action.payload 
            }
          break;
      case REGISTER_USER:
          return {
             ...state, 
             register: action.payload
            }
          break;
      default:
          return state;
  }
}

export default user;