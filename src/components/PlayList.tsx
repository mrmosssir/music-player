import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import arrow from "@/assets/svg/arrow.svg";
import play from "@/assets/svg/play.svg";

import type { RootState } from "@/store";
import { getPlayListTracks, getUserPlayList, MusicTrack, UserPlayListItem } from "@/utils/browse";

const Playlist = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const [playList, setPlayList] = useState<UserPlayListItem[]>([]);
  const [activeIdx, setActiveIdx] = useState<number | null>(2);
  const [tracks, setTracks] = useState<MusicTrack[]>([]);

  const handleGetTracks = async (id: string, idx: number): Promise<void> => {
    const list = await getPlayListTracks(token, id);
    setActiveIdx(idx);
    setTracks(list);
  };

  const handleGetPlayList = async (token: string, id: string): Promise<void> => {
    const list = await getUserPlayList(token, user.id);
    setPlayList(list);
    await handleGetTracks(list[0].id, 0);
  };

  const togglePlayList = (id: string, idx: number) => {
    if (idx === activeIdx) {
      setActiveIdx(null);
      return;
    }
    handleGetTracks(id, idx);
  };

  const getMinute = (time: number) => {
    const minute = Math.floor(time / 60000);
    return minute < 10 ? `0${minute}` : minute;
  };

  const getSecond = (time: number) => {
    const second = Math.floor((time / 1000) % 60);
    return second < 10 ? `0${second}` : second;
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
            <button className="flex items-center px-8 mb-2" onClick={() => togglePlayList(item.id, index)}>
              <p className="text-white mr-4">{`${item.name} [${item.total}]`}</p>
              <img width="8" height="8" src={arrow} className={activeIdx !== index ? "rotate-0" : "rotate-90"} />
            </button>
            {tracks.map((track) => {
              if (activeIdx === index) {
                return (
                  <div
                    key={track.id}
                    className="relative h-16 flex justify-between items-center py-2 px-4 border-b border-b-primary-500 text-sm bg-primary-300"
                  >
                    <button className="w-6 h-6 rounded-full border border-white">
                      <img width="8" height="8" src={play} className="mx-auto" />
                    </button>
                    <img src={track.image} alt="測試" className="w-12.25 h-12.25" />
                    <div className="w-1/2">
                      <p className="text-white truncate">{track.name}</p>
                      <small className="text-white/50">{track.artist}</small>
                    </div>
                    <small className="text-white/50 mr-3">{`${getMinute(track.duration)}:${getSecond(track.duration)}`}</small>
                    <button className="absolute text-xs top-2 right-2 text-white/50">Ｘ</button>
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
