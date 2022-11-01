import { SET_TOKEN, SET_USER } from './constant';

const reducer = function (state, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.data.token };
    case SET_USER:
      return { ...state, user: action.data.user };
    default:
      return state;
  }
}

export default reducer;