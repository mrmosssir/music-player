import { createContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

import Router from "@/Router";

import { hashParams, login, adminToken } from "@/utils/auth";
import { info } from "@/utils/user";
import cookie from "@/utils/cookie";

// import AuthGroup from "@/components/AuthGroup";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";

export const context = createContext();

function App() {  

  const [ token, setToken ] = useState("");
  const [ cols, setCols ] = useState(7);
  const [ user, setUser ] = useState(null);
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const [ searchOpen, setSearchOpen ] = useState(false);

  const ref = useRef(0);

  const handleWidth = function (status, width) {
    if (!ref.current) return;
    const currentWidth = ref.current.offsetWidth;
    if (status) {
      ref.current.style.width = `${currentWidth - width}px`;
      setCols(5);
    } else {
      ref.current.style.width = "100%";
      setCols(7);
    }
  }

  const toggleSidebar = function () { setSidebarOpen(!sidebarOpen) }
  const toggleSearch = function () { setSearchOpen(!searchOpen) }

  useEffect(() => {

    const params = hashParams();
    let cookieToken = cookie.get("token");

    // 確認是否有 token
    if (cookie.check("token")) {
      setToken(cookieToken);
      info(cookieToken).then((value) => { if (value) setUser(value) });
      return;
    }
    // 確認 params 是否有 access_token
    if (params.access_token) {
      cookie.set("token", params.access_token, params.expires_in);
      cookie.set("login", true, 86400);
      location.href = "/music-player/";
    }
    // 確認是否有登入
    if (cookie.check("login")) login();
    // 都沒有就取得 admin token
    adminToken().then((value) => { if (value) setToken(value) });
  
  }, [])

  return (
    <div className="bg-primary-100 min-h-screen md:h-screen flex justify-between">
      <SearchBar open={ searchOpen } toggle={ toggleSearch } token={ token } />
      <div className="wrap">
        <div ref={ ref } className="w-full transition-all duration-500">
          <context.Provider value={{ cols, token, user, toggleSearch }}>
            <Router />
          </context.Provider>
        </div>
      </div>
      <SideBar resize={ handleWidth } />
    </div>
  )
}

export default App
