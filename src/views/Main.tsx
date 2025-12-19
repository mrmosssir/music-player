import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/store";

import { getNewRelease, getFeaturedPlaylist, type MusicItem } from "@/utils/browse";
import cookie from "@/utils/cookie";

import AuthGroup from "@/components/AuthGroup";
import Banner from "@/components/Banner";
import Preview from "@/components/Preview";

const Main = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const [newMusic, setNewMusic] = useState<MusicItem[]>([]);
  const [featured, setFeatured] = useState<MusicItem[]>([]);

  useEffect(() => {
    if (!token) return;
    if (cookie.get("login") && !user) return;
    getNewRelease(token, user?.country).then((response) => setNewMusic(response));
    getFeaturedPlaylist(token, user?.country).then((response) => setFeatured(response));
  }, [token, user]);

  return (
    <div className="h-full w-6/7 mx-auto py-10 lg:w-4/5">
      <AuthGroup title="每日精選" subTitle="Daily Featured" />
      <Banner image={newMusic[0]?.image} name={newMusic[0]?.name} artist={newMusic[0]?.artist} />
      <Preview title="最新專輯" list={newMusic.filter((item, index) => index > 0)} link="/" />
      <Preview title="推薦歌單" list={featured} link="/" />
    </div>
  );
};

export default Main;
