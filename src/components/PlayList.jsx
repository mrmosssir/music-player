import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setPlayListActive } from "@/store/PlayList.model";

import style from "@/components/PlayList.module.css";

import arrow from "@/assets/svg/arrow.svg";
import menuSec from "@/assets/svg/menu-sec.svg";
import cross from "@/assets/svg/cross.svg";

import browse from "@/utils/browse";
import { getMinute, getSecond } from "@/utils/format";


const Playlist = function (props) {

    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const playListActive = useSelector((state) => state.playList.playListActive);

    const [tracks, setTracks] = useState([]);

    const getPlayListTracks = async function (id) {
        const list = await browse.getPlayListTracks(token, id);
        return list.map((item) => {
            return {
                name: item.track.name,
                duration: item.track.duration_ms,
                id: item.track.id,
                artist: item.track.artists[0].name,
                image: item.track.album.images[0].url,
            };
        });
    };

    const togglePlayList = async function (id, index) {
        if (index === playListActive) {
            dispatch(setPlayListActive(null));
            return;
        }
        const data = await getPlayListTracks(id, index);
        dispatch(setPlayListActive(index));
        setTracks(data)
    }

    useEffect(() => {

        const init = async function (id, index) {
            const data = await getPlayListTracks(id, index);
            setTracks(data);
        }

        if (!token) return;
        if (playListActive === props.index) init(props.playlist.id, props.index);
    }, []);

    return (
        <div className={ style.playlist }>
            <button className={style.header} onClick={() => togglePlayList(props.playlist.id, props.index)}>
                <p>{`${props.playlist.name} [${props.playlist.total}]`}</p>
                <img width="8" height="8" src={arrow} className={playListActive !== props.index ? style["arrow-rotate"] : ""} />
            </button>
            <div className={ style.list }>
                {tracks.map((track) => {
                    if (playListActive === props.index) {
                        return (
                            <div key={track.id} className={style.body}>
                                <button className={style.drop}>
                                    <img width="16" height="16" src={menuSec} />
                                </button>
                                <div className={style.image}>
                                    <img src={track.image} alt={track.name} />
                                </div>
                                <div className={style.content}>
                                    <p>{track.name}</p>
                                    <small>{track.artist}</small>
                                </div>
                                <small className={style.duration}>
                                    { `${getMinute(track.duration)}:${getSecond(track.duration)}` }
                                </small>
                                <button className={style.close}>
                                    <img height="8" width="8" src={cross} alt="close" />
                                </button>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Playlist;
