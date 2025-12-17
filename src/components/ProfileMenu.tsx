import { useState } from "react";
import { Link } from "react-router-dom";

import { logout } from "@/utils/auth";

const ProfileMenu = () => {
  const handleLogout = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();
    logout();
  };

  const [menu] = useState([
    { name: "個人頁面", link: "" },
    { name: "登出", method: handleLogout },
  ]);

  return (
    <div className="w-[120%] absolute top-full right-0 translate-y-2 z-20 text-white bg-primary-200 px-4 py-5 rounded-lg">
      <ul className="flex flex-col gap-y-3 text-left font-light">
        {menu.map((item) => {
          return item.link ? (
            <Link to={`/music-player/${item.link}`} key={item.name} className="cursor-pointer">
              {item.name}
            </Link>
          ) : (
            <li onClick={item.method} key={item.name} className="cursor-pointer">
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfileMenu;
