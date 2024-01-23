import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import style from "@/components/SideBar.module.css";

import PlayList from "@/components/PlayList";

import add from "@/assets/svg/add.svg";
import arrow from "@/assets/svg/arrow.svg";
import musicList from "@/assets/svg/music-list.svg";

import { setMaskDisplay, setMainRef, setPreviewListCols } from "@/store/Display.model";

const SideBar = function (props) {

    const dispatch = useDispatch();
    const mainRef = useSelector(state => state.display.mainRef);

    const [active, setActive] = useState(false);
    const ref = useRef(null);

    const handleWidth = function (status, width) {
        if (!mainRef.current) return;
        const wrapWidth = mainRef.current.offsetWidth;
        const innerWidth = window.innerWidth;

        const device = {
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            "2xl": 1536,
        };
        const sideBarDisabled =
            innerWidth > device.lg && innerWidth <= device.xl;
        const previewListDisabled = innerWidth < device.lg;
        if (status && !sideBarDisabled) {
            mainRef.current.style.width = `${wrapWidth - width}px`;
            dispatch(setMainRef(mainRef));
            if (!previewListDisabled) dispatch(setPreviewListCols(5));
        } else {
            if (sideBarDisabled) {
                dispatch(setMaskDisplay(status ? true : false ));
            }
            
            mainRef.current.style.width = "100%";
            dispatch(setMainRef(mainRef));
            dispatch(setPreviewListCols(7));
        }
    };

    const close = function () {
        setActive(false);
        handleWidth(false);
    };

    const open = function () {
        setActive(true);
        handleWidth(true, ref.current.offsetWidth);
    };

    return (
        <div
            ref={ref}
            className={`${style.sidebar} ${active ? style.active : ""}`}>
            <div className={style.header}>
                <button onClick={close}>
                    <img width="8" height="8" src={arrow} alt="關閉" />
                </button>
                <div className={style.nav}>
                    <p>我的播放清單</p>
                    <button>
                        <img width="18" height="18" src={add} alt="新增" />
                    </button>
                </div>
            </div>
            <PlayList />
            <button
                disabled={active}
                className={`${style.open} ${active ? "" : style.active}`}
                onClick={open}>
                <img src={musicList} alt="我的播放清單" />
            </button>
        </div>
    );
};

export default SideBar;
