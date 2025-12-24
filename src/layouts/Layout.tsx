import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store";
import { audioManager } from "@/utils/audio";
import { setDuration, setCurrentTime } from "@/store/music";

import SearchBar from "@/components/SearchBar";
import Playlist from "@/components/Playlist";
import TransportControl from "@/components/TransportControl";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const currentTrack = useSelector((state: RootState) => state.music.current);

  useEffect(() => {
    // 先清除掉之前的監聽器
    audioManager.removeEventListener("loadedmetadata", () => {});
    audioManager.removeEventListener("timeupdate", () => {});

    // 沒有 isPlaying 就不處理
    if (!currentTrack.isPlaying) return;

    // 設定新的監聽器
    audioManager.addEventListener("loadedmetadata", () => {
      dispatch(setDuration(Math.floor(audioManager.getAudio().duration)));
    });
    audioManager.addEventListener("timeupdate", () => {
      dispatch(setCurrentTime(Math.floor(audioManager.getAudio().currentTime)));
    });
  }, [currentTrack]);

  return (
    <div className="h-screen w-full grid grid-cols-1 grid-rows-1 lg:grid-cols-[360px_1fr] lg:grid-rows-[1fr_96px]">
      {/* 左側搜尋欄 */}
      <aside>
        <SearchBar />
      </aside>

      {/* 主要內容區域 */}
      <div className="w-full bg-primary-100 transition-all duration-500 overflow-scroll pb-24 lg:pb-0">{children}</div>

      {/* 底部播放控制區域 */}
      <footer className="col-span-2 z-30">
        <TransportControl className="col-span-2" />
      </footer>

      {user.id && <Playlist className="pb-24" />}
    </div>
  );
};

export default Layout;
