import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import style from "@/components/PlayListBar.module.css";

import PlayList from "@/components/PlayList";

import browse from "@/utils/browse";

import add from "@/assets/svg/add.svg";
import arrow from "@/assets/svg/arrow.svg";
import musicList from "@/assets/svg/music-list.svg";
import check from "@/assets/svg/check.svg";
import cross from "@/assets/svg/cross.svg";

import { setMaskDisplay } from "@/store/Display.model";
import { handleFetchPlayList } from "@/store/PlayList.model";

const PlayListBar = function () {

    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
    const playList = useSelector((state) => state.playList.playList);

    const [active, setActive] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [playListName, setPlayListName] = useState("");

    const toggle = function (status) {
        setActive(status);
        dispatch(setMaskDisplay(status));
    };


    const addPlayList = function () {
        browse.addPlayList(token, user.id, playListName).then(() => {
            dispatch(handleFetchPlayList({ token, userId: user.id }));
            setShowAdd(false);
        });
    };

    useEffect(() => {
        if (!user.id || !token) return;
        dispatch(handleFetchPlayList({ token, userId: user.id }));
    }, [user.id, token]);

    return (
        <div className={`${style.sidebar} ${active ? style.active : ""}`}>
            <div className={style.header}>
                <button onClick={() => toggle(false)}>
                    <img width="8" height="8" src={arrow} alt="關閉" />
                </button>
                <div className={style.nav}>
                    <p>我的播放清單</p>
                    <button className={ showAdd ? "hidden" : "block" } onClick={() => setShowAdd(true)}>
                        <img width="18" height="18" src={add} alt="新增" />
                    </button>
                </div>
                <div className={`pt-4 ${showAdd ? style.nav : "hidden"}`}>
                    <input type="text" className="input" placeholder="請輸入清單名稱" value={playListName} onInput={(e) => setPlayListName(e.target.value)} />
                    <button className="ml-4" onClick={() => addPlayList()}>
                        <img width="16" height="16" src={check} />
                    </button>
                    <button className="ml-4" onClick={() => setShowAdd(false)}>
                        <img width="16" height="16" src={cross} />
                    </button>
                </div>
            </div>
            { playList.map((item, index) => <PlayList key={ item.id } playlist={ item } index={ index } />) }
            <button
                disabled={active}
                className={`${style.open} ${active ? "" : style.active}`}
                onClick={() => toggle(true)}>
                <img src={musicList} alt="我的播放清單" />
            </button>
        </div>
    );
};

export default PlayListBar;
