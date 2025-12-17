import { Link } from "react-router-dom";

import favorite from "@/assets/svg/favorite.svg";

export type MenuProps = {
  list: {
    name: string;
    path?: string;
    favorite?: boolean;
  }[];
};

const Menu = (props: MenuProps) => {
  return (
    <ul className="mt-6">
      {props.list.map((item) => {
        return (
          <li className={`flex mt-3 ${item.favorite ? "text-secondary" : "text-white"}`} key={item.name}>
            <Link to={`/music-player/${item.path ?? ""}`}>{item.name}</Link>
            {item.favorite ? <img src={favorite} alt="最愛" className="ml-3" /> : ""}
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
