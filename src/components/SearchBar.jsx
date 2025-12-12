import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import style from "@/components/SearchBar.module.css";

import { searchAlbum } from "@/utils/search";

import Bagde from "@/components/Badge";
import Logo from "@/components/Logo";
import Menu from "@/components/Menu";

import arrow from "@/assets/svg/arrow.svg";
import search from "@/assets/svg/search.svg";

const SearchBar = function (props) {
    const token = useSelector((state) => state.auth.token);
    const searchDisplay = useSelector((state) => state.display.searchDisplay);

    const ref = useRef(null);

    const handleKeyPress = function (event) {
        if (event.key !== "Enter") return;
        handleSearch();
    };

    const handleSearch = function () {
        if (!ref.current || !token) return;
        const keyword = ref.current.value;
        if (!keyword) return;
        searchAlbum(token, keyword);
    };

    return (
        <div className={`${style.frame} ${searchDisplay ? style.active : ""}`}>
            <Logo type="web" />
            <div className={style.search}>
                {/* <button className={style.close} onClick={props.toggle}>
                    <img src={arrow} alt="關閉" />
                </button> */}
                <input
                    type="text"
                    placeholder="搜尋曲名、歌手或專輯"
                    onKeyPress={handleKeyPress}
                    ref={ref}
                />
                <button className={style.exec} onClick={handleSearch}>
                    <img src={search} alt="搜尋" />
                </button>
            </div>
            <p className={style.title}>最近搜尋</p>
            <Bagde list={["放鬆", "搖滾", "R&B", "Hip-Hop", "測試"]} />
            <Menu
                list={[
                    { name: "我的最愛", favorite: true },
                    { name: "排行榜", path: "top" },
                    { name: "新歌推薦" },
                    { name: "最新專輯" },
                ]}
            />
        </div>
    );
}

export default SearchBar;
