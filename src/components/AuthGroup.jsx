import { useState } from "react";

import style from "@/components/AuthGroup.module.css";

import Theme from "@/components/Theme";

import triangle from "@/assets/svg/triangle.svg";

import test_profile_btn from "@/test/test_profile_btn.png";

const AuthGroup = function () {
  const [login, setLogin] = useState(false);

  const loginBtn = function () { return <button className={ style.login }>登入</button> }

  const profileBtn = function () {
    return (
      <button className={ style.user }>
        <img className={ style.profile } src={ test_profile_btn } alt="" />
        Mochi Armi
        <img className={ style.open } width="10" height="10" src={ triangle } alt="展開" />
      </button>
    )
  }

  return (
    <div className="flex justify-between items-center">
      <Theme main="每日精選" sub="Daily Featured" />
      <div className={ style.auth }>
        <button className={ style.upgrade }>Music Premium</button>
        { login ? profileBtn() : loginBtn() }
      </div>
    </div>
  )
}

export default AuthGroup;