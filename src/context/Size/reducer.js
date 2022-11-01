import { SET_MAIN_REF, SET_PREVIEWLIST_COLS } from './constant';

const reducer = function (state, action) {
  switch (action.type) {
    case SET_MAIN_REF:
      return { ...state, mainRef: action.data };
    case SET_PREVIEWLIST_COLS:
      return { ...state, previewListCols: action.data };
    default:
      return state;
  }
}

export default reducer;