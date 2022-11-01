import style from "@/layouts/Layout.module.css";

import { useContext, useEffect, useRef } from "react";

import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import Mask from "@/components/Mask";

import { InjectContext } from "@/context";
import { setMainRef } from "@/context/Size/action";

const Layout = function ({ children }) {
  const ref = useRef(null);
  const { sizeDispatch } = useContext(InjectContext);

  useEffect(() => sizeDispatch(setMainRef(ref)), []);

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