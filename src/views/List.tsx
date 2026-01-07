import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import { type RootState } from "@/store";
import { useRoute } from "@/hooks/useRouter";

import AuthGroup from "@/components/AuthGroup";
import Musiclist from "@/components/Musiclist";

import { searchPlaylist, getPlaylistTracks, type MusicItem } from "@/utils/browse";

const List = () => {
  const { query } = useRoute();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const [country] = useState<string>("TW");
  const [list, setList] = useState<MusicItem[]>([]);
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = async (): Promise<void> => {
    if (!token) return;
    const playlist = await searchPlaylist(token, keyword, user.country);

    const id = playlist[0]?.id;
    if (!id) return;

    const tracks = await getPlaylistTracks(token, id);
    setList(tracks);
  };

  useEffect(() => {
    handleSearch();
  }, [token, country, keyword]);

  useEffect(() => {
    setKeyword(query.get("name"));
  }, [query]);

  return (
    <div className="min-h-full w-6/7 mx-auto py-10 lg:w-4/5">
      <AuthGroup title={keyword} subTitle="Leaderboard" icon="menu-leader-board" />
      <Musiclist list={list} />
    </div>
  );
};

export default List;
