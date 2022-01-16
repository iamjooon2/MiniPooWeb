import axios from 'axios';
import {LOGIN_USER, REGISTER_USER} from '../constants/ActionTypes';

export const loginUser = (dataToSubmit) => {

  const request = axios.post('users/login', dataToSubmit)
    .then(response => response.data)
    
    return {
      type : LOGIN_USER,
      payload: request
    }
}

export const registerUser = (dataToSubmit) => {

  const request = axios.post('users/register', dataToSubmit)
    .then(response => response.data)

    return {
      type : REGISTER_USER,
      payload: request
    }
}