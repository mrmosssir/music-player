import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import style from "@/components/PlayList.module.css";

import arrow from "@/assets/svg/arrow.svg";
import play from "@/assets/svg/play.svg";

import browse from "@/utils/browse";

import test_image from "@/test/test_list_image.png";

const Playlist = function () {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

    const [playList, setPlayList] = useState([]);
    const [activeIdx, setActiveIdx] = useState(2);
    const [tracks, setTracks] = useState([]);

    const getPlayListTracks = function (id, idx) {
        browse.getPlayListTracks(token, id).then((list) => {
            const tracksData = list.map((item) => {
                return {
                    name: item.track.name,
                    duration: item.track.duration_ms,
                    id: item.track.id,
                    artist: item.track.artists[0].name,
                    image: item.track.album.images[0].url,
                };
            });
            setActiveIdx(idx);
            setTracks(tracksData);
        });
    };

    const togglePlayList = function (id, idx) {
        console.log(id, activeIdx)
        if (idx === activeIdx) setActiveIdx(null);
        else getPlayListTracks(id, idx);
    }

    const getMinute = function (time) {
        const minute = Math.floor(time / 60000);
        return minute < 10 ? `0${minute}` : minute;
    }

    const getSecond = function (time) {
        const second = Math.floor(time / 1000 % 60);
        return second < 10 ? `0${second}` : second;
    }

    useEffect(() => {
        if (!user.id || !token) return;
        browse.getUserPlayList(token, user.id).then((list) => {
            setPlayList(list);
            getPlayListTracks(list[0].id, 0);
        });
    }, [user.id, token]);

    return (
        <div className={style.playlist}>
            {playList.map((item, index) => {
                return (
                    <div key={item.id}>
                        <button
                            className={style.header}
                            onClick={() => togglePlayList(item.id, index)}>
                            <p>{`${item.name} [${item.total}]`}</p>
                            <img width="8" height="8" src={arrow} className={activeIdx !== index ? style["arrow-rotate"] : ""} />
                        </button>
                        {tracks.map((track) => {
                            if (activeIdx === index) {
                                return (
                                    <div key={track.id}
                                        className={`${style.body} ${style.active}`}>
                                        <button className={style.play}>
                                            <img width="8" height="8" src={play} />
                                        </button>
                                        <img src={track.image} alt="測試" className={style.image} />
                                        <div className={style.content}>
                                            <p>{track.name}</p>
                                            <small>{track.artist}</small>
                                        </div>
                                        <small className={style.duration}>
                                            { `${getMinute(track.duration)}:${getSecond(track.duration)}` }
                                        </small>
                                        <button className={style.close}>Ｘ</button>
                                    </div>
                                );
                            }
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Playlist;
