import { SET_SEARCH_DISPLAY, SET_MASK_DISPLAY } from './constant';

const reducer = function (state, action) {
  switch (action.type) {
    case SET_SEARCH_DISPLAY:
      return { ...state, searchDisplay: action.data.searchDisplay };
    case SET_MASK_DISPLAY:
      return { ...state, maskDisplay: action.data.maskDisplay };
    default:
      return state;
  }
}

export default reducer;