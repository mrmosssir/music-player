import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store";
import { setIsPlaying, setCurrentTime, setIsRandom } from "@/store/music";

import { timeData } from "@/utils/time";
import { audioManager } from "@/utils/audio";

import Icon from "@/components/Icon";
import DefaultMusicImage from "@/components/DefaultMusicImage";

type TransportControlProps = {
  className?: string;
};

const TransportControl = (props: TransportControlProps) => {
  const dispatch = useDispatch();

  const currentTrack = useSelector((state: RootState) => state.music.current);
  const duration = useSelector((state: RootState) => state.music.duration);
  const currentTime = useSelector((state: RootState) => state.music.currentTime);
  const isRandom = useSelector((state: RootState) => state.music.isRandom);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [progress, setProgress] = useState<string>("0");
  const [sound, setSound] = useState<string>("100");

  const handlePause = () => {
    dispatch(setIsPlaying(!currentTrack?.isPlaying));
  };

  const handleSetPlayProgress = (value: string) => {
    const time = (parseFloat(value) / 100) * duration;
    audioManager.getAudio().currentTime = time;
    dispatch(setCurrentTime(Math.floor(time)));
  };

  const handleSetRandomPlay = () => {
    dispatch(setIsRandom(!isRandom));
  };

  useEffect(() => {
    if (duration < 1) return;
    setProgress(((currentTime / duration) * 100).toString());
  }, [currentTime]);

  const TransportControlWeb = () => {
    return (
      <div className="h-full items-center gap-x-6 bg-primary-600 px-10 hidden lg:flex">
        <button
          className={currentTrack.name ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
          onClick={() => setIsFavorite(!isFavorite)}
          disabled={!currentTrack.name}
        >
          <Icon icon={isFavorite ? "favorite-fill" : "favorite"} alt="最愛" className="w-5 h-5" />
        </button>
        {/* 音樂資訊 */}
        <div className="relative w-48 flex items-center gap-x-4 overflow-x-hidden">
          {currentTrack.name && (
            <>
              {currentTrack.image ? (
                <img src={currentTrack.image} alt={`${currentTrack.name} 封面`} className="w-12.25 h-12.25" />
              ) : (
                <DefaultMusicImage size={12.25} />
              )}

              <div className="flex-1 overflow-hidden">
                <p className="text-white truncate">{currentTrack.name}</p>
                <small className="text-white/50">{currentTrack.artist}</small>
              </div>
            </>
          )}
        </div>

        {/* 播放控制區域 */}
        <div className="flex-1 px-24">
          {/* 上方控制按鈕 */}
          <div className="w-full flex justify-center items-center gap-x-8">
            <button className={currentTrack.name ? "cursor-pointer" : "cursor-not-allowed opacity-50"} onClick={() => handleSetRandomPlay()}>
              <Icon icon="random" alt="隨機播放" width={16} height={16} className={isRandom ? "" : "opacity-50"}></Icon>
            </button>
            <button className={currentTrack.name ? "cursor-pointer" : "cursor-not-allowed opacity-50"} onClick={() => audioManager.next(-1)}>
              <Icon icon="previous" alt="上一首" width={16} height={16}></Icon>
            </button>
            <button
              disabled={!currentTrack.name}
              className={`
              flex justify-center items-center w-11 h-11 rounded-full bg-linear-to-b
              ${currentTrack.isPlaying ? "p-0" : "pl-0.5"}
              ${currentTrack.name ? "from-secondary-100 to-primary-400 cursor-pointer" : "from-gray-400 to-gray-600 opacity-50 cursor-not-allowed"}
            `}
              onClick={() => handlePause()}
            >
              <Icon icon={currentTrack.isPlaying ? "pause" : "play"} alt={currentTrack.isPlaying ? "暫停" : "播放"} width={12} height={12}></Icon>
            </button>
            <button className={currentTrack.name ? "cursor-pointer" : "cursor-not-allowed opacity-50"} onClick={() => audioManager.next(1)}>
              <Icon icon="next" alt="下一首" width={16} height={16}></Icon>
            </button>
            <button
              className={currentTrack.name ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
              onClick={() => {
                audioManager.setLoop(!audioManager.getAudio().loop);
              }}
            >
              <Icon icon="cycle" alt="循環播放" width={16} height={16} className={audioManager.getAudio().loop ? "" : "opacity-50"}></Icon>
            </button>
          </div>

          {/* 下方進度條區域 */}
          <div className="flex-1 flex justify-center items-center gap-x-8 mt-2">
            <span className="text-xs text-white/50 w-8">
              {currentTrack.name ? `${timeData(currentTime).minute}:${timeData(currentTime).second}` : "--:--"}
            </span>
            <div className="relative flex-1 h-0.5 bg-white/50 rounded-full group">
              {/* 已播放進度條 */}
              <div
                className="absolute w-full h-full bg-linear-to-r from-secondary-100 to-primary-400 rounded-full"
                style={{ width: `${progress}%` }}
              />

              {/* 真正的 Range Input (透明，蓋在最上面負責接收點擊) */}
              <input
                type="range"
                className="absolute w-full h-full opacity-0 cursor-pointer"
                disabled={!currentTrack}
                onChange={(e) => handleSetPlayProgress(e.target.value)}
              />

              {/* 自製的圓點 */}
              <div
                className="absolute h-2 w-2 bg-white rounded-full -top-0.75 -ml-1 shadow hidden group-hover:block"
                style={{ left: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-white/50 w-8">
              {currentTrack.name ? `${timeData(duration).minute}:${timeData(duration).second}` : "--:--"}
            </span>
          </div>
        </div>

        {/* 加到播放清單 */}
        <button className={currentTrack.name ? "cursor-pointer" : "cursor-not-allowed opacity-50"}>
          <Icon icon="add-list" alt="加到播放清單" width={16} height={16}></Icon>
        </button>

        {/* 音量控制 */}
        <div className={`flex items-center gap-x-2 ${currentTrack.name ? "" : "opacity-50"}`}>
          <Icon icon="sound" alt="音量" width={16} height={16}></Icon>
          <div className="relative w-24 flex-1 h-0.5 bg-white/50 rounded-full group">
            {/* 目前音量進度條 */}
            <div className="absolute h-full bg-white rounded-full" style={{ width: `${audioManager.getAudio().volume * 100}%` }} />

            {/* 真正的 Range Input (透明，蓋在最上面負責接收點擊) */}
            <input
              type="range"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              disabled={!currentTrack.name}
              min="0"
              max="1"
              step="0.01"
              onChange={(e) => audioManager.setVolume(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    );
  };

  const TransportControlMobile = () => {
    return (
      <div className="w-full h-24 fixed bottom-0 left-0 flex items-center gap-x-6 px-6 bg-black/50 backdrop-blur-sm lg:hidden">
        {/* 圖片 */}
        <button>
          {currentTrack.name && (
            <>
              {currentTrack.image ? (
                <img src={currentTrack.image} alt={`${currentTrack.name} 封面`} className="w-16 h-16" />
              ) : (
                <DefaultMusicImage size={16} />
              )}
            </>
          )}
        </button>

        <div className="flex-1">
          {/* 音樂名稱 */}
          <p className="relative w-48 text-white text-xs font-bold truncate mask-[linear-gradient(to_right,black,transparent)] overflow-hidden">
            {currentTrack.name}
          </p>

          {/* 作者和功能按鈕 */}
          <div className="flex justify-between items-start gap-x-6">
            <span className="text-white/50 text-xs mt-1.5">{currentTrack.artist}</span>
            <div className="flex justify-end items-center gap-x-6">
              <button className={currentTrack.name ? "cursor-pointer" : "cursor-not-allowed opacity-50"} onClick={() => audioManager.next(-1)}>
                <Icon icon="previous" alt="上一首" width={12} height={12}></Icon>
              </button>
              <button
                disabled={!currentTrack.name}
                className={`
              flex justify-center items-center w-9 h-9
              ${currentTrack.isPlaying ? "p-0" : "pl-0.5"}
              ${currentTrack.name ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}
            `}
                onClick={() => handlePause()}
              >
                <Icon icon={currentTrack.isPlaying ? "pause" : "play"} alt={currentTrack.isPlaying ? "暫停" : "播放"} width={9} height={9}></Icon>
              </button>
              <button className={currentTrack.name ? "cursor-pointer" : "cursor-not-allowed opacity-50"} onClick={() => audioManager.next(1)}>
                <Icon icon="next" alt="下一首" width={12} height={12}></Icon>
              </button>
            </div>
          </div>

          {/* 進度條 */}
          <div className="relative flex-1 h-0.5 bg-white/50 rounded-full group mt-2">
            {/* 已播放進度條 */}
            <div className="absolute h-full bg-linear-to-r from-secondary-100 to-primary-400 rounded-full" style={{ width: `${progress}%` }} />

            {/* 真正的 Range Input (透明，蓋在最上面負責接收點擊) */}
            <input
              type="range"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              disabled={!currentTrack}
              onChange={(e) => handleSetPlayProgress(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`h-full shadow-[5px_0px_10px_rgba(0,0,0,0.2)] ${props.className}`}>
      <TransportControlWeb />
      {currentTrack.name && <TransportControlMobile />}
    </div>
  );
};

export default TransportControl;
