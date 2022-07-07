import { useContext, useEffect, useState } from "react";

import browse from "@/utils/browse";
import cookie from "@/utils/cookie";

import AuthGroup from "@/components/AuthGroup";
import Banner from "@/components/Banner";
import PreviewList from "@/components/PreviewList";

import { context } from "@/App";

const Main = function (props) {

  const consumer = useContext(context);

  const [newList, setNewList] = useState([]);
  const [featuredList, setFeatureList] = useState([]);

  useEffect(() => {
    if (!consumer.token) return;
    if (cookie.get("login") && !consumer.user) return;
    browse.getNewRelease(consumer.token, consumer.user?.country).then((response) => setNewList(response));
    browse.getFeaturedPlayList(consumer.token, consumer.user?.country).then((response) => setFeatureList(response));
  }, [consumer.token, consumer.user]);

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