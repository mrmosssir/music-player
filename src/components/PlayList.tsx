import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Icon from "@/components/Icon";

import type { RootState } from "@/store";
import { getPlayListTracks, getUserPlayList } from "@/utils/browse";
import type { MusicTrack, UserPlayListItem } from "@/utils/browse";
import { timeData } from "@/utils/time";

const Playlist = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const [playList, setPlayList] = useState<UserPlayListItem[]>([]);
  const [active, setActive] = useState<number | null>(2);
  const [tracks, setTracks] = useState<MusicTrack[]>([]);

  const handleGetTracks = async (id: string, idx: number): Promise<void> => {
    const list = await getPlayListTracks(token, id);
    setActive(idx);
    setTracks(list);
  };

  const handleGetPlayList = async (token: string, id: string): Promise<void> => {
    const list = await getUserPlayList(token, user.id);
    setPlayList(list);
    await handleGetTracks(list[0].id, 0);
  };

  const togglePlayList = (id: string, idx: number) => {
    if (idx === active) {
      setActive(null);
      return;
    }
    handleGetTracks(id, idx);
  };

  useEffect(() => {
    if (!user.id || !token) return;
    handleGetPlayList(token, user.id);
  }, [user.id, token]);

  return (
    <div id="playlist">
      {playList.map((item, index) => {
        return (
          <div key={item.id}>
            <button className="flex items-center px-8 mb-4" onClick={() => togglePlayList(item.id, index)}>
              <p className="text-white mr-4">{`${item.name} [${item.total}]`}</p>
              <Icon icon="arrow" width="8" height="8" className={active !== index ? "rotate-0" : "rotate-90"} />
            </button>
            {tracks.map((track) => {
              if (active === index) {
                return (
                  <div key={track.id} className={`relative h-16 flex justify-between items-center py-2 px-4 border-b border-primary-500 text-sm`}>
                    <button className="w-6 h-6 rounded-full border border-white">
                      <Icon icon="play" width="8" height="8" className="mx-auto" />
                    </button>
                    <img src={track.image} alt="測試" className="w-12.25 h-12.25" />
                    <div className="w-1/2">
                      <p className="text-white truncate">{track.name}</p>
                      <small className="text-white/50">{track.artist}</small>
                    </div>
                    <small className="text-white/50 mr-3">{`${timeData(track.duration).minute}:${timeData(track.duration).second}`}</small>
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Playlist;
