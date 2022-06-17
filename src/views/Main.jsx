import { useContext, useEffect, useState } from "react";

import browse from "@/utils/browse";

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
    browse.getNewRealse(consumer.token).then((response) => setNewList(response));
    browse.getFeaturedPlayList(consumer.token).then((response) => setFeatureList(response));
  }, [consumer.token]);

  return (
    <div className="container">
      <AuthGroup />
      <Banner image={ banner } name="終究還是因為愛 (REMIX)" artist="李浩瑋, PIZZALI, 陳忻玥,G5SH" />
      <PreviewList title="最新專輯" list={ newList } link="/" />
      <PreviewList title="推薦歌單" list={ featuredList } link="/" />
    </div>
  )
}

export default Main;