import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/store";

import AuthGroup from "@/components/AuthGroup";
import MusicList from "@/components/MusicList";

import { getTopPlayListId, getTopPlayList, type MusicItem } from "@/utils/browse";

const Top = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [country] = useState<string>("TW");
  const [list, setList] = useState<MusicItem[]>([]);

  useEffect(() => {
    if (!token) return;
    getTopPlayListId(token, country).then(async (id) => {
      const bufferList = await getTopPlayList(token, id);
      setList(bufferList);
    });
  }, [token, country]);

  return (
    <div className="h-full w-4/5 mx-auto py-10">
      <AuthGroup title="排行榜" subTitle="Leaderboard" icon="menu-leader-board" />
      <MusicList list={list} />
    </div>
  );
};

export default Top;
