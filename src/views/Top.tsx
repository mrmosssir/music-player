import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store";

import AuthGroup from "@/components/AuthGroup";
import MusicList from "@/components/MusicList";

import themeIcon from "@/assets/svg/menu-leader-board.svg";

import { getTopPlayListId, getTopPlayList, type MusicItem } from "@/utils/browse";

import { setMainRef } from "@/store/Display.model";
import { useRef } from "react";

const Top = function () {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);

    const ref = useRef<HTMLDivElement>(null);

    const [country] = useState<string>("TW");
    const [list, setList] = useState<MusicItem[]>([]);

    useEffect(() => {
        if (!token) return;
        getTopPlayListId(token, country).then(async (id) => {
            const bufferList = await getTopPlayList(token, id);
            setList(bufferList);
        });
    }, [token, country]);

    useEffect(() => {
        dispatch(setMainRef(ref));
    }, [ref]);

    return (
        <div className="h-full w-4/5 mx-auto py-10">
            <AuthGroup title="排行榜" subTitle="Leaderboard" icon={themeIcon} />
            <MusicList list={list} />
        </div>
    );
};

export default Top;
