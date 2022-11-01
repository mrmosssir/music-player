import { createContext, useReducer } from "react";

import Auth from "./Auth/reducer";
import Display from "./Display/reducer";
import Size from "./Size/reducer";

export const InjectContext = createContext();

const Context = function (props) {
  const [ authContext, authDispatch ] = useReducer(Auth, { token: "", user: {} });
  const [ displayContext, displayDispatch ] = useReducer(Display, { searchDisplay: false, maskDisplay: false });
  const [ sizeContext, sizeDispatch ] = useReducer(Size, { previewListCols: 7, mainRef: null });
  const state = { authContext, displayContext, sizeContext };
  const dispatch = { authDispatch, displayDispatch, sizeDispatch };
  const provider = { ...state, ...dispatch };
  return (
    <InjectContext.Provider value={ provider }>
      { props.children }
    </InjectContext.Provider>
  );
}

export default Context;