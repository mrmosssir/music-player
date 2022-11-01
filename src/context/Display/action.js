import { SET_SEARCH_DISPLAY, SET_MASK_DISPLAY } from './constant';

export const setSearchDisplay = data => ({ type: SET_SEARCH_DISPLAY, data });
export const setMaskDisplay = data => ({ type: SET_MASK_DISPLAY, data });