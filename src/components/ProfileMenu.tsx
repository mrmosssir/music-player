import { useState } from "react";
import { Link } from "react-router-dom";

import { logout } from "@/utils/auth";

const ProfileMenu = () => {

  const handleLogout= (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();
    logout();
  }

  const [ menu ] = useState([
    { name: "個人頁面", link: "" },
    { name: "登出", method: handleLogout }
  ]);

  return (
    <div className="block absolute bottom-[-3.5rem] right-0 z-20 text-right">
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