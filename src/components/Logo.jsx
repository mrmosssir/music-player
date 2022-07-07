import style from "@/components/Logo.module.css";

import logo from "@/assets/svg/logo.svg";

const Logo = function (props) {
  return (
    <h1 className={ `${style.logo} ${props.type ? style[props.type] : style.web}` }>
      <img src={ logo } alt="logo" />
      <p>Immerse</p>
    </h1>
  )
}

export default Logo;