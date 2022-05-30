import style from "@/components/SideBar.module.css";

import PlayList from "@/components/PlayList";

import add from "@/assets/svg/add.svg";
import arrow from "@/assets/svg/arrow.svg";

const SideBar = function () {
  return (
    <div className={ style.sidebar }>
      <div className={ style.header }>
        <button><img width="8" height="8" src={ arrow } alt="關閉" /></button>
        <div className={ style.nav }>
          <p>我的播放清單</p>
          <button><img width="18" height="18" src={ add } alt="新增" /></button>
        </div>
      </div>
      <PlayList />
    </div>
  )
}

export default SideBar;