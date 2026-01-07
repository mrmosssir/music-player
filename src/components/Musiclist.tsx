import Icon from "@/components/Icon";
import { type MusicItem } from "@/utils/browse";

export type MusiclistProps = {
  list: MusicItem[];
};

const handleOpenLink = (url: string | undefined): void => {
  if (!url) return;
  window.open(url, "_blank");
};

const Musiclist = (props: MusiclistProps) => {
  return (
    <ul className="my-8">
      {props.list.map((item: MusicItem, index: number) => {
        return (
          <li key={index} className="w-4/5 flex items-center my-4 gap-8">
            <span className="w-[10%] text-4xl text-white font-bold">{index + 1}</span>
            <div className="relative w-20 h-20 group">
              <img width="80" height="80" src={item.image} alt={item.name} />
              <button
                className="absolute top-0 left-0 h-full w-full bg-black/50 text-center opacity-0 transition duration-500 cursor-pointer group-hover:opacity-100"
                onClick={() => handleOpenLink(item.url)}
              >
                <Icon icon="player" width={30} height={30} alt="播放" className="inline" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-white">{item.name}</h3>
              <p className="text-sm text-white/50 font-light">{item.artist}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Musiclist;
