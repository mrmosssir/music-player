import { useContext, useEffect, useState, useRef } from "react";

import browse from "@/utils/browse";
import cookie from "@/utils/cookie";

import AuthGroup from "@/components/AuthGroup";
import Banner from "@/components/Banner";
import PreviewList from "@/components/PreviewList";

// import { context } from "@/App";
import { InjectContext } from "@/context";
import { setToken } from "@/context/Auth/action";
import { setMainRef } from "@/context/Size/action";

const Main = function (props) {
  const ref = useRef(null);
  // const consumer = useContext(context);
  const { authContext, authDispath } = useContext(InjectContext);
  const { sizeDispatch } = useContext(InjectContext);

  const [newList, setNewList] = useState([]);
  const [featuredList, setFeatureList] = useState([]);

  useEffect(() => {
    if (!authContext["token"]) return;
    if (cookie.get("login") && !authContext["user"]) return;
    browse.getNewRelease(authContext["token"], authContext["user"]?.country).then((response) => setNewList(response));
    browse.getFeaturedPlayList(authContext["token"], authContext["user"]?.country).then((response) => setFeatureList(response))
  }, [authContext["token"], authContext["user"]]);

  useEffect(() => {
    sizeDispatch(setMainRef(ref))
  }, [ref])

  return (
    <div className="container">
      <AuthGroup title="每日精選" subTitle="Daily Featured" />
      <Banner image={ newList[0]?.image } name={ newList[0]?.name } artist={ newList[0]?.artists } />
      <PreviewList title="最新專輯" list={ newList.filter((item, index) => index > 0) } link="/" />
      <PreviewList title="推薦歌單" list={ featuredList} link="/" />
    </div>
  )
}

export default Main;