import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store";
import { setLocalMusic } from "@/store/music";

import { getNewRelease, getFeaturedPlaylist, type MusicItem } from "@/utils/browse";
import { loadLocalMusicFromHandler } from "@/utils/file";
import cookie from "@/utils/cookie";

import AuthGroup from "@/components/AuthGroup";
import Banner from "@/components/Banner";
import Preview from "@/components/Preview";

const Main = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const localMusic = useSelector((state: RootState) => state.music.local);

  const [newMusic, setNewMusic] = useState<MusicItem[]>([]);
  const [featured, setFeatured] = useState<MusicItem[]>([]);

  useEffect(() => {
    if (!token) return;
    if (cookie.get("login") && !user) return;
    getNewRelease(token, user?.country).then((response) => setNewMusic(response));
    getFeaturedPlaylist(token, user?.country).then((response) => setFeatured(response));
    loadLocalMusicFromHandler().then((music) => dispatch(setLocalMusic(music)));
  }, [token, user]);

  return (
    <div className="min-h-full w-6/7 mx-auto py-10 lg:w-4/5">
      <AuthGroup title="每日精選" subTitle="Daily Featured" />
      <Banner image={newMusic[0]?.image} name={newMusic[0]?.name} artist={newMusic[0]?.artist} />
      {localMusic.length > 0 && <Preview title="我的音樂" list={localMusic} />}
      <Preview title="最新專輯" list={newMusic.filter((item, index) => index > 0)} link="/" />
      <Preview title="推薦歌單" list={featured} link="/" />
    </div>
  );
};

export default Main;
