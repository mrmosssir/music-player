import { SET_TOKEN, SET_USER } from './constant';

export const setToken = data => ({ type: SET_TOKEN, data });
export const setUser = data => ({ type: SET_USER, data });