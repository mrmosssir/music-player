import { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/store";

import { timeData } from "@/utils/time";

import Icon from "@/components/Icon";

type TransportControlProps = {
  className?: string;
};

const TransportControl = (props: TransportControlProps) => {
  const currentTrack = useSelector((state: RootState) => state.music.current);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [progress, setProgress] = useState<string>("0");
  const [sound, setSound] = useState<string>("80");

  return (
    <div className={`h-full flex items-center gap-x-6 bg-primary-600 px-10 shadow-[5px_0px_10px_rgba(0,0,0,0.2)] ${props.className}`}>
      <button
        className={currentTrack ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
        onClick={() => setIsFavorite(!isFavorite)}
        disabled={!currentTrack}
      >
        <Icon icon={isFavorite ? "favorite-fill" : "favorite"} alt="最愛" className="w-5 h-5" />
      </button>
      {/* 音樂資訊 */}
      <div className="w-64 flex items-center gap-x-4">
        {currentTrack && (
          <>
            <img src={currentTrack.image} alt={`${currentTrack.name} 封面`} className="w-12.25 h-12.25" />
            <div>
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
          <button className={currentTrack ? "cursor-pointer" : "cursor-not-allowed opacity-50"}>
            <Icon icon="reload" alt="重播" width={16} height={16}></Icon>
          </button>
          <button className={currentTrack ? "cursor-pointer" : "cursor-not-allowed opacity-50"}>
            <Icon icon="previous" alt="上一首" width={16} height={16}></Icon>
          </button>
          <button
            disabled
            className={`
              flex justify-center items-center w-11 h-11 rounded-full bg-linear-to-b
              ${currentTrack?.isPlaying ? "p-0" : "pl-0.5"}
              ${currentTrack ? "from-secondary-100 to-primary-400 cursor-pointer" : "from-gray-400 to-gray-600 opacity-50 cursor-not-allowed"}
            `}
          >
            <Icon icon={currentTrack?.isPlaying ? "pause" : "play"} alt={currentTrack?.isPlaying ? "暫停" : "播放"} width={12} height={12}></Icon>
          </button>
          <button className={currentTrack ? "cursor-pointer" : "cursor-not-allowed opacity-50"}>
            <Icon icon="next" alt="下一首" width={16} height={16}></Icon>
          </button>
          <button className={currentTrack ? "cursor-pointer" : "cursor-not-allowed opacity-50"}>
            <Icon icon="cycle" alt="循環播放" width={16} height={16}></Icon>
          </button>
        </div>

        {/* 下方進度條區域 */}
        <div className="flex-1 flex justify-center items-center gap-x-8 mt-2">
          <span className="text-xs text-white/50">--:--</span>
          <div className="relative flex-1 h-0.5 bg-white/50 rounded-full group">
            {/* 已播放進度條 */}
            <div className="absolute h-full bg-linear-to-r from-secondary-100 to-primary-400 rounded-full" style={{ width: `${progress}%` }} />

            {/* 真正的 Range Input (透明，蓋在最上面負責接收點擊) */}
            <input
              type="range"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              disabled={!currentTrack}
              onChange={(e) => setProgress(e.target.value)}
            />

            {/* 自製的圓點 */}
            <div
              className="absolute h-2 w-2 bg-white rounded-full -top-0.75 -ml-1 shadow hidden group-hover:block"
              style={{ left: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-white/50">
            {currentTrack ? `${timeData(currentTrack.duration).minute}:${timeData(currentTrack.duration).second}` : "--:--"}
          </span>
        </div>
      </div>

      {/* 加到播放清單 */}
      <button className={currentTrack ? "cursor-pointer" : "cursor-not-allowed opacity-50"}>
        <Icon icon="add-list" alt="加到播放清單" width={16} height={16}></Icon>
      </button>

      {/* 音量控制 */}
      <div className={`flex items-center gap-x-2 ${currentTrack ? "" : "opacity-50"}`}>
        <Icon icon="sound" alt="音量" width={16} height={16}></Icon>
        <div className="relative w-24 flex-1 h-0.5 bg-white/50 rounded-full group">
          {/* 目前音量進度條 */}
          <div className="absolute h-full bg-white rounded-full" style={{ width: `${sound}%` }} />

          {/* 真正的 Range Input (透明，蓋在最上面負責接收點擊) */}
          <input
            type="range"
            className="absolute w-full h-full opacity-0 cursor-pointer"
            disabled={!currentTrack}
            onChange={(e) => setSound(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TransportControl;
