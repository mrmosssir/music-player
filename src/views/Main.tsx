import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/store";

import { getNewRelease, getFeaturedPlayList, type MusicItem } from "@/utils/browse";
import cookie from "@/utils/cookie";

import AuthGroup from "@/components/AuthGroup";
import Banner from "@/components/Banner";
import PreviewList from "@/components/PreviewList";

const Main = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const [newList, setNewList] = useState<MusicItem[]>([]);
  const [featuredList, setFeatureList] = useState<MusicItem[]>([]);

  useEffect(() => {
    if (!token) return;
    if (cookie.get("login") && !user) return;
    getNewRelease(token, user?.country).then((response) => setNewList(response));
    getFeaturedPlayList(token, user?.country).then((response) => setFeatureList(response));
  }, [token, user]);

  return (
    <div className="h-full w-4/5 mx-auto py-10">
      <AuthGroup title="每日精選" subTitle="Daily Featured" />
      <Banner image={newList[0]?.image} name={newList[0]?.name} artist={newList[0]?.artist} />
      <PreviewList title="最新專輯" list={newList.filter((item, index) => index > 0)} link="/" />
      <PreviewList title="推薦歌單" list={featuredList} link="/" />
    </div>
  );
};

export default Main;
