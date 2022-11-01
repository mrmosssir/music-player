import { useContext, useEffect, useState } from "react";

import { hashParams, login, adminToken } from "@/utils/auth";
import { info } from "@/utils/user";
import cookie from "@/utils/cookie";

import style from "@/components/AuthGroup.module.css";

import Logo from "@/components/Logo";
import ProfileMenu from "@/components/ProfileMenu";
import Theme from "@/components/Theme";

import { InjectContext } from "@/context";
import { setToken, setUser } from "@/context/Auth/action";

import menu from "@/assets/svg/menu.svg";
import search from "@/assets/svg/search.svg";
import triangle from "@/assets/svg/triangle.svg";

import defaultProfile from "@/assets/default_user.png";

const AuthGroup = function (props) {
  const { authContext, authDispatch } = useContext(InjectContext);

  const [ toggle, setToggle ] = useState(false);

  const checkLogin = async function () {
    const params = hashParams();
    let cookieToken = cookie.get("token");
    // 確認是否有 token
    if (cookie.check("token")) {
      await authDispatch(setToken({ token: cookieToken }));
      const user = await info(cookieToken);
      if (user) authDispatch(setUser({ user: {
        country: user.country,
        name: user.display_name,
        email: user.email,
        followers: user.followers,
        href: user.href,
        id: user.id,
        image: user.images[0]?.url,
        product: user.product,
        type: user.type,
        uri: user.uri
      }}));
      return;
    }
    // 確認 params 是否有 access_token
    if (params.access_token) {
      cookie.set("token", params.access_token, params.expires_in);
      cookie.set("login", true, 86400);
      location.href = "/music-player/";
    }
    // 確認是否有登入
    if (cookie.check("login")) login();
    // 都沒有就取得 admin token
    const admin = await adminToken();
    if (admin) authDispatch(setToken({ token: admin }));
  }

  const loginBtn = function () { 
    return (
      <button className={ style.login } onClick={ () => login() }>登入</button>
    )
  }

  const profileBtn = function () {
    return (
      <button className={ style.user } onClick={ () => setToggle(!toggle) }>
        <img className={ style.profile } src={ authContext["user"].image ?? defaultProfile } alt={ authContext["user"].name } />
        { authContext["user"].name }
        <img className={ style.open } width="10" height="10" src={ triangle } alt="展開" />
        { toggle ? <ProfileMenu /> : "" }
      </button>
    )
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <div className={ style.frame }>
      <Logo type="mobile" />
      <Theme main={ props.title } sub={ props.subTitle } icon={ props.icon } />
      <div className={ style.auth }>
        <button className={ style.upgrade }>Music Premium</button>
        { authContext["user"]?.name ? profileBtn() : loginBtn() }
      </div>
      <div className={ style.feature }>
        {/* <button onClick={ displayDispatch(setSearchDisplay(!displayContext["searchDisplay"])) }><img src={ search } alt="搜尋" /></button> */}
        <button><img src={ menu } alt="開啟選單" /></button>
      </div>
    </div>
  )
}

export default AuthGroup;