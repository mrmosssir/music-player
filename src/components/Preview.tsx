import { Link } from "react-router-dom";

import { type MusicItem } from "@/utils/browse";

export type PreviewProps = {
  title: string;
  link: string;
  list: MusicItem[];
};

const Preview = (props: PreviewProps) => {
  return (
    <div className="mt-8 opacity-100 transition duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl text-white">{props.title}</h3>
        <Link to={props.link} className="text-sm text-secondary">
          更多
        </Link>
      </div>
      <ul className="w-full flex items-center gap-x-1 whitespace-nowrap overflow-x-auto mt-3 lg:gap-x-4">
        {props.list.map((item, index) => {
          return (
            <li className="mr-4 lg:mr-0 min-w-34 aspect-square" key={index}>
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
              <p className="text-sm text-white truncate mt-2 whitespace-nowrap">{item.name}</p>
              <small className="text-xs text-white/50 truncate mt-2 whitespace-nowrap">{item.artist}</small>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Preview;
