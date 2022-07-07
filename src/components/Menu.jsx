import { Link } from "react-router-dom";

import style from "@/components/Menu.module.css";

import favorite from "@/assets/svg/favorite.svg";

const Menu = function (props) {
  const prefix = "music-player";

  const favoriteIcon = function (isFavorite) {
    return isFavorite ? <img src={ favorite } alt="最愛" /> : "";
  }
  
  return (
    <ul className={ style.menu }>
      { props.list.map((item) => {
        return (
          <li className={ item.favorite ? "text-secondary" : "text-white"} key={ item.name }>
            <Link to={ `/${prefix}/${item.path ?? ""}` }>{ item.name }</Link>
            { favoriteIcon(item.favorite) }
          </li>
        )
      }) }
    </ul>
  )
}

export default Menu;