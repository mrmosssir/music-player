import style from "@/layouts/Layout.module.css";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import Mask from "@/components/Mask";

import { setMainRef } from "@/store/Display.model";

const Layout = function ({ children }) {

  const dispatch = useDispatch();

  const ref = useRef(null);

  useEffect(() => {
    if (ref) dispatch(setMainRef(ref))
  }, []);

  return (
    <div ref={ ref } className={ style.layout }>
      <SearchBar />
        <div className={ style.children }>
          { children }
        </div>
      <SideBar />
      <Mask />
    </div>
  )
}

export default Layout;