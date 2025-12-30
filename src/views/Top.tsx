import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/store";

import AuthGroup from "@/components/AuthGroup";
import Musiclist from "@/components/Musiclist";

import { getTopPlaylistId, getTopPlaylist, type MusicItem } from "@/utils/browse";

const Top = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [country] = useState<string>("TW");
  const [list, setList] = useState<MusicItem[]>([]);

  const handleGetData = useCallback(async (): Promise<void> => {
    if (!token) return;

    const id = await getTopPlaylistId(token, country);
    if (!id) return;

    const top = await getTopPlaylist(token, id);
    setList(top);
  }, [token, country]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleGetData();
  }, [token, country, handleGetData]);

  return (
    <div className="min-h-full w-6/7 mx-auto py-10 lg:w-4/5">
      <AuthGroup title="排行榜" subTitle="Leaderboard" icon="menu-leader-board" />
      <Musiclist list={list} />
    </div>
  );
};

export default Top;
