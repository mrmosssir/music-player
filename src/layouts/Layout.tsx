import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import Mask from "@/components/Mask";

import { setMainRef } from "@/store/Display.model";

const Layout = ({ children }: { children: React.ReactNode }) => {

  const dispatch = useDispatch();

  const ref = useRef(null);

  useEffect(() => {
    if (ref) dispatch(setMainRef(ref))
  }, []);

  return (
    <div ref={ ref } className="bg-primary-100 flex md:min-h-screen md:h-screen">
      <SearchBar />
        <div className="w-full transition-all duration-500 overflow-scroll">
          { children }
        </div>
      <SideBar />
      <Mask />
    </div>
  )
}

export default Layout;