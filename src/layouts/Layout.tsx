import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store";
import { audioManager } from "@/utils/audio";
import { setDuration, setCurrentTime, setCurrent } from "@/store/music";

import SearchBar from "@/components/SearchBar";
import Playlist from "@/components/Playlist";
import TransportControl from "@/components/TransportControl";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const currentTrack = useSelector((state: RootState) => state.music.current);
  const localMusic = useSelector((state: RootState) => state.music.local);
  const isRandom = useSelector((state: RootState) => state.music.isRandom);

  // 尋找下一首音樂並播放
  const playNextMusic = (list: typeof localMusic, currentId: string) => {
    list.forEach(async (item, index) => {
      // 找出下一首音樂
      if (item.id === currentId) {
        const next = list[index + 1] || list[0];
        const url = next.url || URL.createObjectURL(await next.method!());
        dispatch(setCurrent({ ...next, url, isPlaying: true }));
        return;
      }
    });
  };

  // 隨機播放一首音樂
  const playRandomMusic = async (list: typeof localMusic) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    const randomTrack = list[randomIndex];
    if (!randomTrack) return;
    const url = randomTrack.url || URL.createObjectURL(await randomTrack.method!());
    dispatch(setCurrent({ ...randomTrack, url, isPlaying: true }));
  };

  useEffect(() => {
    // 先清除掉之前的監聽器
    audioManager.removeEventListener("loadedmetadata", () => {});
    audioManager.removeEventListener("timeupdate", () => {});
    audioManager.removeEventListener("ended", () => {});

    // 沒有 isPlaying 就不處理
    if (!currentTrack.isPlaying) return;

    // 設定新的監聽器
    audioManager.addEventListener("loadedmetadata", () => {
      dispatch(setDuration(Math.floor(audioManager.getAudio().duration)));
    });
    audioManager.addEventListener("timeupdate", () => {
      dispatch(setCurrentTime(Math.floor(audioManager.getAudio().currentTime)));
    });
    audioManager.addEventListener("ended", () => {
      // 有循環播放就給他播，不管
      if (audioManager.getAudio().loop) return;
      // 如果是 spotify 音樂因為無法播放所以不處理
      if (currentTrack.type !== "local") return;
      // 隨機播放
      if (isRandom) {
        playRandomMusic(localMusic);
        return;
      }
      // 播放下一首
      playNextMusic(localMusic, currentTrack.id);
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
