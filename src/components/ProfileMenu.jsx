import style from "@/components/ProfileMenu.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import { logout } from "@/utils/auth";

const ProfileMenu = function () {

  const handleLogout= function (e) {
    e.stopPropagation();
    logout();
  }

  const [ menu, setMenu ] = useState([
    { name: "個人頁面", link: "" },
    { name: "登出", method: handleLogout }
  ]);

  return (
    <div className={ style.menu }>
      <ul>
        {
          menu.map((item) => {
            return item.link ?
              <Link to={ `/music-player/${item.link}` } key={ item.name }>{ item.name }</Link> :
              <li onClick={ item.method } key={ item.name }>{ item.name }</li>
          })
        }
      </ul>
    </div>
  )
}

export default ProfileMenu;