import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store";
import { setCurrent, setIsPlaying } from "@/store/music";

import { type MusicItem } from "@/utils/browse";

import Icon from "@/components/Icon";
import DefaultMusicImage from "@/components/DefaultMusicImage";

export type PreviewProps = {
  title: string;
  link?: string;
  list: MusicItem[];
};

const Preview = (props: PreviewProps) => {
  const dispatch = useDispatch();

  const current = useSelector((state: RootState) => state.music.current);

  const handleLocalMusicPlay = async (item: MusicItem): Promise<void> => {
    // 播放或暫停目前音樂
    if (item.id === current?.id) {
      dispatch(setIsPlaying(!current.isPlaying));
      return;
    }
    // 點擊新的音樂時，設定並播放
    const url = item.url || URL.createObjectURL(await item.method!());
    dispatch(setCurrent({ ...item, url, isPlaying: true }));
  };

  const handleClickPlay = (item: MusicItem): void => {
    switch (item.type) {
      case "local":
        handleLocalMusicPlay(item);
        break;
      case "album":
      case "playlist":
        window.open(item.url, "_blank");
        break;
    }
  };

  return (
    <div className="mt-8 opacity-100 transition duration-300">
      {/* 標題 */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl text-white">{props.title}</h3>
        {props.link && (
          <Link to={props.link} className="text-sm text-secondary">
            更多
          </Link>
        )}
      </div>

      {/* 音樂資訊 */}
      <ul className="w-full flex items-center gap-x-1 whitespace-nowrap overflow-x-auto mt-3 lg:gap-x-4">
        {props.list.map((item, index) => {
          const isPlaying = current?.id === item.id && current?.isPlaying;

          return (
            <li className="mr-4 lg:mr-0 min-w-34 w-34 aspect-square" key={index}>
              {/* 圖片 */}
              <div className="w-full h-rull relative aspect-square" onClick={() => handleClickPlay(item)}>
                {item?.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" /> : <DefaultMusicImage />}

                <div
                  className={`w-full h-full absolute top-0 left-0 bg-black/70 flex justify-center items-center opacity-0 hover:opacity-100 rounded cursor-pointer transition ${current?.id === item.id ? "opacity-100" : ""}`}
                >
                  <div className="w-12 h-12 border border-white rounded-full flex justify-center items-center">
                    <Icon
                      icon={isPlaying ? "pause" : "play"}
                      alt="player icon"
                      width={isPlaying ? 14 : 16}
                      height={isPlaying ? 14 : 16}
                      className={isPlaying ? "" : "ml-0.5"}
                    />
                  </div>
                </div>
              </div>

              {/* 文字資訊 */}
              <p className="text-sm text-white truncate mt-2 whitespace-nowrap">{item.name}</p>
              <small className="text-xs text-white/50 truncate mt-2 whitespace-nowrap">{item?.artist}</small>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Preview;
