import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/store";

import AuthGroup from "@/components/AuthGroup";
import Musiclist from "@/components/Musiclist";

import { getTopPlaylistId, getTopPlaylist, type MusicItem } from "@/utils/browse";

const Top = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [country] = useState<string>("TW");
  const [list, setList] = useState<MusicItem[]>([]);

  const handleGetData = async (): Promise<void> => {
    if (!token) return;

    const id = await getTopPlaylistId(token, country);
    if (!id) return;

    const top = await getTopPlaylist(token, id);
    setList(top);
  };

  useEffect(() => {
    handleGetData();
  }, [token, country]);

  return (
    <div className="h-full w-4/5 mx-auto py-10">
      <AuthGroup title="排行榜" subTitle="Leaderboard" icon="menu-leader-board" />
      <Musiclist list={list} />
    </div>
  );
};

export default Top;
