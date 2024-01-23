import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AuthGroup from "@/components/AuthGroup";
import MusicList from "@/components/MusicList";

import themeIcon from "@/assets/svg/menu-leader-board.svg";

import browse from "@/utils/browse";

import { setMainRef } from "@/store/Display.model";
import { useRef } from "react";

const Top = function () {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const ref = useRef(null);

    const [country, setCountry] = useState("TW");
    const [list, setList] = useState([]);

    useEffect(() => {
        const token = token;
        if (!token) return;
        browse.getTopPlayListId(token, country).then(async (id) => {
            const bufferList = await browse.getTopPlayList(token, id);
            setList(bufferList);
        });
    }, [token, country]);

    useEffect(() => {
        dispatch(setMainRef(ref));
    }, [ref]);

    return (
        <div className="container">
            <AuthGroup title="排行榜" subTitle="Leaderboard" icon={themeIcon} />
            <MusicList list={list} />
        </div>
    );
};

export default Top;
