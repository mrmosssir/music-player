import { useState } from "react";

import { login } from "@/utils/auth";

import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { setEnabled } from "@/store/common";

import Logo from "@/components/Logo";
import ProfileMenu from "@/components/ProfileMenu";
import Theme from "@/components/Theme";
import Icon from "@/components/Icon";

import defaultProfile from "@/assets/default_user.png";

export type AuthGroupProps = {
  title: string;
  subTitle?: string;
  icon?: string;
};

const AuthGroup = (props: AuthGroupProps) => {
  const dispatch = useDispatch();

  const { user } = useAuth();
  const [toggle, setToggle] = useState(false);

  const loginBtn = () => {
    return (
      <button
        className="bg-transparent border border-white/50 px-6 rounded-full text-white h-10 min-w-36 text-center cursor-pointer"
        onClick={() => login()}
      >
        登入
      </button>
    );
  };

  const profileBtn = () => {
    return (
      <div className="h-10 min-w-36 relative">
        <button
          className="relative w-full h-full flex justify-between items-center bg-transparent border border-white/50 rounded-full p-1 cursor-pointer"
          onClick={() => setToggle(!toggle)}
        >
          <img className="h-full rounded-full mr-3 aspect-square" src={user.image ?? defaultProfile} alt={user.name} />
          <p className="text-white">{user.name}</p>
          <Icon icon="triangle" className="mr-2 ml-3" width={10} height={10} alt="展開" />
        </button>
        {toggle && <ProfileMenu />}
      </div>
    );
  };

  return (
    <div className="flex justify-between items-stretch relative">
      <Logo type="mobile" className="w-20" />
      <Theme main={props.title} sub={props.subTitle} icon={props.icon} />
      <div className="hidden items-center gap-x-4 lg:flex">
        <button className="text-white h-10 min-w-36 rounded-full tracking-[0.05rem] bg-linear-to-r from-secondary-100 to-primary-400 cursor-pointer px-6">
          Music Premium
        </button>
        {user.name ? profileBtn() : loginBtn()}
      </div>
      <div className="flex items-center lg:hidden">
        <button className="block w-10 h-full" onClick={() => dispatch(setEnabled("search", true))}>
          <Icon icon="search" alt="開啟搜尋欄" className="mx-auto" />
        </button>
        <button className="block w-10 h-full" onClick={() => dispatch(setEnabled("playlist", true))}>
          <Icon icon="menu" alt="開啟選單" className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default AuthGroup;
