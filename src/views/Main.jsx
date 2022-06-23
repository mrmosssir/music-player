import { useContext, useEffect, useState } from "react";

import browse from "@/utils/browse";
import cookie from "@/utils/cookie";

import AuthGroup from "@/components/AuthGroup";
import Banner from "@/components/Banner";
import PreviewList from "@/components/PreviewList";

import { context } from "@/App";

import banner from "@/test/test_banner.png";

const Main = function (props) {

  const consumer = useContext(context);

  const [newList, setNewList] = useState([]);
  const [featuredList, setFeatureList] = useState([]);

  useEffect(() => {
    if (!consumer.token) return;
    browse.getNewRealse(consumer.token, consumer.user?.country).then((response) => setNewList(response));
    browse.getFeaturedPlayList(consumer.token, consumer.user?.country).then((response) => setFeatureList(response));
  }, [consumer.user]);

  useEffect(() => {
    if (!consumer.token) return;
    if (cookie.get("login")) return;
    browse.getNewRealse(consumer.token, consumer.user?.country).then((response) => setNewList(response));
    browse.getFeaturedPlayList(consumer.token, consumer.user?.country).then((response) => setFeatureList(response));
  }, [consumer.token]);

  useEffect(() => {
    console.log(newList);
  }, [newList]);

  return (
    <div className="container">
      <AuthGroup />
      <Banner image={ newList[0]?.image } name={ newList[0]?.name } artist={ newList[0]?.artists } />
      <PreviewList title="最新專輯" list={ newList.filter((item, index) => index > 0) } link="/" />
      <PreviewList title="推薦歌單" list={ featuredList} link="/" />
    </div>
  )
}

export default Main;