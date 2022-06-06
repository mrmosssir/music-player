import { useRef, useState } from "react";

import style from "@/components/SideBar.module.css";

import PlayList from "@/components/PlayList";

import add from "@/assets/svg/add.svg";
import arrow from "@/assets/svg/arrow.svg";
import musicList from "@/assets/svg/music-list.svg";

const SideBar = function (props) {
  const [active, setActive] = useState(false);
  const ref = useRef(0);

  const close = function () {
    setActive(false);
    props.resize(false);
  };

  const open = function () {
    setActive(true);
    props.resize(true, ref.current.offsetWidth);
  };

  return (
    <div ref={ ref } className={ `${ style.sidebar } ${ active ? style.active : "" }`}>
      <div className={ style.header }>
        <button onClick={ close }><img width="8" height="8" src={ arrow } alt="關閉" /></button>
        <div className={ style.nav }>
          <p>我的播放清單</p>
          <button><img width="18" height="18" src={ add } alt="新增" /></button>
        </div>
      </div>
      <PlayList />
      <button disabled={ active } className={ `${ style.open } ${ active ? "" : style.active }` } onClick={ open } >
        <img src={ musicList } alt="我的播放清單" />
      </button>
    </div>
  )
}

export default SideBar;