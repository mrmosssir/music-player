import { useContext, useEffect, useState } from "react";

import AuthGroup from "@/components/AuthGroup";
import MusicList from "@/components/MusicList";

import themeIcon from "@/assets/svg/menu-leader-board.svg";

import browse from "@/utils/browse";

// import { context } from "@/App";
import { InjectContext } from "@/context";
import { setMainRef } from "@/context/Size/action";
import { useRef } from "react";

const Top = function () {
  const ref = useRef(null);
  const { authContext } = useContext(InjectContext);
  const { sizeDispatch } = useContext(InjectContext);

  const [ country, setCountry ] = useState("TW");
  const [ list, setList ] = useState([]);
  
  useEffect(() => {
    const token = authContext["token"];
    if (!token) return;
    browse.getTopPlayListId(token, country).then(async(id) => {
      const bufferList = await browse.getTopPlayList(token, id);
      setList(bufferList);
    });
  }, [authContext["token"], country]);

  useEffect(() => {
    sizeDispatch(setMainRef(ref))
  }, [ref]);

  return (
    <div className="container">
      <AuthGroup title="排行榜" subTitle="Leaderboard" icon={ themeIcon } />
      <MusicList list={ list } />
    </div>
  )
}

export default Top;