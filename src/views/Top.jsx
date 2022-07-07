import { useContext, useEffect, useState } from "react";

import AuthGroup from "@/components/AuthGroup";
import MusicList from "@/components/MusicList";

import themeIcon from "@/assets/svg/menu-leader-board.svg";

import browse from "@/utils/browse";

import { context } from "@/App";

const Top = function () {
  
  const consumer = useContext(context);

  const [ country, setCountry ] = useState("TW");
  const [ list, setList ] = useState([]);
  
  useEffect(() => {
    if (!consumer.token) return;
    browse.getTopPlayListId(consumer.token, country).then(async(id) => {
      const bufferList = await browse.getTopPlayList(consumer.token, id);
      setList(bufferList);
    });
  }, [consumer.token, country]);

  return (
    <div className="container">
      <AuthGroup title="排行榜" subTitle="Leaderboard" icon={ themeIcon } />
      <MusicList list={ list } />
    </div>
  )
}

export default Top;