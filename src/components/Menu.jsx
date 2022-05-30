import { Link } from "react-router-dom";

import style from "@/components/Menu.module.css";

import favorite from "@/assets/svg/favorite.svg";

const Menu = function (props) {
  const renderItem = function (item) {
    return !item.favorite ? 
      <li className="text-white" key={ item.name }>
        <Link to="/">{ item.name }</Link>
      </li> :
      <li className="text-secondary" key={ item.name }>
        <Link to="/">{ item.name }</Link>
        <img src={ favorite } alt="最愛" />     
      </li>
  }
  return (
    <ul className={ style.menu }>
      { props.list.map((item) => renderItem(item)) }
    </ul>
  )
}

export default Menu;