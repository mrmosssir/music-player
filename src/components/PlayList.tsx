import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store";
import { setEnabled } from "@/store/common";

import { getPlaylistTracks, getUserPlaylist, getTrackInfo } from "@/utils/browse";
import type { MusicTrack, UserPlaylistItem } from "@/utils/browse";
import { timeData } from "@/utils/time";

import Icon from "@/components/Icon";

export type PlaylistProps = {
  className?: string;
};

const Playlist = (props: PlaylistProps) => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const enabled = useSelector((state: RootState) => state.common.enabled);

  const [playlist, setPlaylist] = useState<UserPlaylistItem[]>([]);
  const [active, setActive] = useState<number | null>(2);
  const [tracks, setTracks] = useState<MusicTrack[]>([]);

  const handleGetTracks = useCallback(
    async (id: string, idx: number): Promise<void> => {
      const list = await getPlaylistTracks(token, id);
      setActive(idx);
      setTracks(list);
    },
    [token],
  );

  const handleGetPlaylist = useCallback(
    async (token: string, id: string): Promise<void> => {
      const list = await getUserPlaylist(token, id);
      setPlaylist(list);
      await handleGetTracks(list[0].id, 0);
    },
    [handleGetTracks],
  );

  const handleTogglePlaylist = (id: string, idx: number) => {
    if (idx === active) {
      setActive(null);
      return;
    }
    handleGetTracks(id, idx);
  };

  const handleClickPlay = async (track: MusicTrack) => {
    const info = await getTrackInfo(token, track.id);
    window.open(info.url, "_blank");
  };

  useEffect(() => {
    if (!user.id || !token) return;
    handleGetPlaylist(token, user.id);
  }, [user.id, token, handleGetPlaylist]);

  // 播放清單單一項目列表
  const PlaylistItem = (item: UserPlaylistItem & { index: number }) => {
    return (
      <div key={item.id}>
        <button className="flex items-center px-8 mb-4" onClick={() => handleTogglePlaylist(item.id, item.index)}>
          <p className="text-white mr-4">{`${item.name} [${item.total}]`}</p>
          <Icon icon="arrow" width="8" height="8" className={active !== item.index ? "rotate-0" : "rotate-90"} />
        </button>

        {tracks.map((track) => {
          if (active === item.index) {
            return <PlaylistItemTrack key={track.id} {...track} />;
          }
        })}
      </div>
    );
  };

  // 播放清單內單一曲目元件
  const PlaylistItemTrack = (track: MusicTrack) => {
    return (
      <div className={`relative h-16 flex justify-between items-center py-2 px-4 border-b border-primary-500 text-sm`}>
        <button className="w-6 h-6 rounded-full border border-white cursor-pointer" onClick={() => handleClickPlay(track)}>
          <Icon icon="play" width="8" height="8" className="mx-auto" />
        </button>
        <img src={track.image} alt="音樂封面" className="w-12.25 h-12.25" />
        <div className="w-1/2">
          <p className="text-white truncate">{track.name}</p>
          <small className="text-white/50">{track.artist}</small>
        </div>
        <small className="text-white/50 mr-3">{`${timeData(track.duration).minute}:${timeData(track.duration).second}`}</small>
      </div>
    );
  };

  return (
    <div
      className={`absolute bg-primary-200 min-w-87.5 w-1/5 h-screen top-0 right-0 transition duration-500 z-20 ${props.className} ${enabled.playlist ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center gap-x-4 px-8 py-6">
        <button onClick={() => dispatch(setEnabled("playlist", false))} className="rotate-180 cursor-pointer">
          <Icon icon="arrow" width="8" height="8" alt="關閉" />
        </button>
        <p className="flex-1 text-white">我的播放清單</p>
        <button>
          <Icon icon="add" width="18" height="18" alt="新增" />
        </button>
      </div>

      {playlist.map((item, index) => {
        return <PlaylistItem key={item.id} {...item} index={index} />;
      })}

      <button
        disabled={enabled.playlist}
        className={`hidden absolute top-8 left-0 w-12 h-12 bg-primary-100 border border-r-0 border-white/50 rounded-l-lg -translate-x-full duration-300 cursor-pointer lg:block ${enabled.playlist ? "opacity-0" : "opacity-100 delay-200"}`}
        onClick={() => dispatch(setEnabled("playlist", true))}
      >
        <Icon icon="music-list" alt="我的播放清單" className="mx-auto" />
      </button>
    </div>
  );
};

export default Playlist;
