import axios from 'axios';
import {LOGIN_USER} from '../constants/ActionTypes';

export const loginUser = (dataToSubmit) => {

  const request = axios.post('users/login', dataToSubmit)
    .then(response => response.data)

    return {
      type : LOGIN_USER,
      payload: request
    }
}