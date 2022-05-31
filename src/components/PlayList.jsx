// import { useState } from "react";

import style from "@/components/PlayList.module.css";

import arrow from "@/assets/svg/arrow.svg";
import play from "@/assets/svg/play.svg";

import test_image from "@/test/test_list_image.png";

const Playlist = function () {

  return (
    <div className={ style.playlist }>
      <button className={ style.header }>
        <p>KPOP</p>
        <img width="8" height="8" src={ arrow } />
      </button>
      <div className={ `${ style.body } ${ style.active }` }>
        <button className={ style.play }><img width="8" height="8" src={ play } /></button>
        <img src={ test_image } alt="測試" />
        <div className={ style.content }>
          <p>Stay Alive(Prod.Suga of BTS)</p>
          <small>Jungkook</small>
        </div>
        <small className={ style.duration }>3:30</small>
        <button className={ style.close }>Ｘ</button>
      </div>
    </div>
  )
}

export default Playlist;