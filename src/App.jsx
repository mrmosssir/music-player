import axios from "axios";
import qs from "qs";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Router from "@/Router";

import auth from "@/utils/auth";
import cookie from "@/utils/cookie";

import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";

function App() {  

  const [ token, setToken ] = useState();

  const getNewRelease = async function (requestToken) {
    const url = `${process.env.API_BASE_URL}/browse/new-releases`;
    const config = {
      method: 'GET',
      url: `${url}?${qs.stringify({ country: 'TW', limit: 5 })}`,
      headers: {
        'Authorization': `Bearer ${requestToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    const { data } = await axios(config);
    if (data.error) return false;
    return data.albums.item;
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

  useEffect(() => {
    if (!token) return;
    getNewRelease(token).catch(console.error);
  }, [token])

  return (
    <div className="bg-primary-100 h-screen flex justify-between">
      {/* <button onClick={ auth.login }>登入</button> */}
      <SearchBar />
      <div className="w-full">
        <Router />
      </div>
      <SideBar />
    </div>
  )
}

export default App
