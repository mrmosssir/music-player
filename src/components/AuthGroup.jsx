import { useContext, useEffect, useState } from "react";

import { login } from "@/utils/auth";

import style from "@/components/AuthGroup.module.css";

import Logo from "@/components/Logo";
import ProfileMenu from "@/components/ProfileMenu";
import Theme from "@/components/Theme";

import { context } from "@/App";

// import logo from "@/assets/svg/logo.svg";
import menu from "@/assets/svg/menu.svg";
import search from "@/assets/svg/search.svg";
import triangle from "@/assets/svg/triangle.svg";

import defaultProfile from "@/assets/default_user.png";

const AuthGroup = function (props) {
  const consumer = useContext(context);
  const [ user, setUser ] = useState({ name: "", image: "" });
  const [ toggle, setToggle ] = useState(false);

  useEffect(() => {
    if (!consumer.user) return;
    const image = consumer.user.images.length ? consumer.user.images[0].url : defaultProfile;
    setUser({ name: consumer.user.display_name, image });
  }, [consumer.user])

  const loginBtn = function () { return <button className={ style.login } onClick={ () => login() }>登入</button> }

  const profileBtn = function () {
    return (
      <button className={ style.user } onClick={ () => setToggle(!toggle) }>
        <img className={ style.profile } src={ user.image } alt={ user.name } />
        { user.name }
        <img className={ style.open } width="10" height="10" src={ triangle } alt="展開" />
        { toggle ? <ProfileMenu /> : "" }
      </button>
    )
  }

  return (
    <div className={ style.frame }>
      <Logo type="mobile" />
      <Theme main={ props.title } sub={ props.subTitle } icon={ props.icon } />
      <div className={ style.auth }>
        <button className={ style.upgrade }>Music Premium</button>
        { user.name ? profileBtn() : loginBtn() }
      </div>
      <div className={ style.feature }>
        <button onClick={ consumer.toggleSearch }><img src={ search } alt="搜尋" /></button>
        <button><img src={ menu } alt="開啟選單" /></button>
      </div>
    </div>
  )
}

export default AuthGroup;