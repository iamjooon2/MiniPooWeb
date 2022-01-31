import axios from 'axios';
import {
  LOGIN_USER, 
  LOGOUT_USER, 
  REGISTER_USER,
  AUTH_USER
      } from '../constants/ActionTypes';
import { API_ROUTE } from '../constants/config';

export const loginUser = (dataToSubmit) => {
  const request = axios.post(`${API_ROUTE}/login`, dataToSubmit)
    .then(response => response.data)
    
    return {
      type : LOGIN_USER,
      payload: request
    }
}

export const logoutUser = () => {
  const request = axios.get(`${API_ROUTE}/logout`)
    .then(response => response.data);

  return {
      type: LOGOUT_USER,
      payload: request
  }
}

export const registerUser = (dataToSubmit) => {
  const request = axios.post(`${API_ROUTE}/register`, dataToSubmit)
    .then(response => response.data);

    return { 
      type : REGISTER_USER,
      payload: request
    }
}

export const auth = () =>{
  const request = axios.get(`${API_ROUTE}/auth`)
    .then(response => response.data);

  return {
      type: AUTH_USER,
      payload: request
  }
}