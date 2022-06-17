import axios from "axios";
import qs from "qs";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Router from "@/Router";

import auth from "@/utils/auth";
import cookie from "@/utils/cookie";

// import AuthGroup from "@/components/AuthGroup";
import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";

export const context = createContext();

function App() {  

  const [ token, setToken ] = useState();
  const [ cols, setCols ] = useState(7);

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

  useEffect(() => {

    if (cookie.check('token')) {
      setToken(cookie.get('token'));
      return;
    }
    // status -> 0: 未登入, 1: 處理中, 2: 已登入
    const status = cookie.get('status');
    
    if (!status) return;

    auth.login();

    // 取得 Spotify Token
    auth.token().then((response) => {
      if (response) setToken(response);
      location.href = process.env.SITE_DOMAIN;
    });
  }, [])

  return (
    <div className="bg-primary-100 h-screen flex justify-between">
      <SearchBar />
      <div className="wrap">
        <div ref={ ref } className="w-full transition-all duration-500">
          <context.Provider value={{ cols, token }}>
            <Router />
          </context.Provider>
        </div>
      </div>
      <SideBar resize={ handleWidth } />
    </div>
  )
}

export default App
