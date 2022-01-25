import axios from 'axios';
import {
  LOGIN_USER, 
  LOGOUT_USER, 
  REGISTER_USER,
  AUTH_USER
      } from '../constants/ActionTypes';

export const loginUser = (dataToSubmit) => {
  const request = axios.post('/api/user/login', dataToSubmit)
    .then(response => response.data)
    
    return {
      type : LOGIN_USER,
      payload: request
    }
}

export const logoutUser = () => {
  const request = axios.get(`/api/user/logout`)
    .then(response => response.data);

  return {
      type: LOGOUT_USER,
      payload: request
  }
}

export const registerUser = (dataToSubmit) => {
  const request = axios.post('/api/user/register', dataToSubmit)
    .then(response => response.data);

    return { 
      type : REGISTER_USER,
      payload: request
    }
}

export const auth = () =>{
  const request = axios.get('/api/user/auth')
    .then(response => response.data);

  return {
      type: AUTH_USER,
      payload: request
  }
}