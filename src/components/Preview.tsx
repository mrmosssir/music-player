import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrent } from "@/store/music";

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

  const handleClickPlay = (item: MusicItem): void => {
    const supportPlayTypes = ["track", "local"];
    if (!supportPlayTypes.includes(item.type)) return;

    dispatch(setCurrent({ ...item, isPlaying: true }));
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
          return (
            <li className="mr-4 lg:mr-0 min-w-34 w-34 aspect-square" key={index}>
              {/* 圖片 */}
              <div className="w-full h-rull relative aspect-square" onClick={() => handleClickPlay(item)}>
                {item?.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" /> : <DefaultMusicImage />}

                <div className="w-full h-full absolute top-0 left-0 bg-black/70 flex justify-center items-center opacity-0 hover:opacity-100 rounded cursor-pointer transition">
                  <Icon icon="player" alt="play icon" width={48} height={48} />
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
