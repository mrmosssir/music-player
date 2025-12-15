import { useRef } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/store";

import { searchAlbum } from "@/utils/search";

import Bagde from "@/components/Badge";
import Logo from "@/components/Logo";
import Menu from "@/components/Menu";

import arrow from "@/assets/svg/arrow.svg";
import search from "@/assets/svg/search.svg";

export type SearchBarProps = {
  toggle?: () => void;
}

const SearchBar = (props: SearchBarProps) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const searchDisplay = useSelector((state: RootState) => state.display.searchDisplay);

    const ref = useRef<HTMLInputElement>(null);

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;
        handleSearch();
    };

    const handleSearch = () => {
        if (!ref.current || !token || !ref.current.value) return;
        searchAlbum(token, ref.current.value);
    };

    return (
        <div className={`hidden w-screen h-screen bg-primary-200 min-w-[350px] py-8 px-10 shadow-[5px_0px_10px_rgba(0,0,0,0.2)] z-20 absolute top-0 left-0 translate-x-[-100%] transition-all duration-500 lg:relative lg:left-0 lg:w-1/5 lg:translate-x-0 lg:block ${searchDisplay ? 'translate-x-0' : ''}`}>
            <Logo type="web" />
            <div className="w-11/12 relative mt-6 mb-3 text-right mx-auto sm:w-full">
                <button className="absolute top-[10px] left-0 rotate-180" onClick={props.toggle}>
                    <img src={arrow} alt="關閉" />
                </button>
                <input
                    type="text"
                    className="text-sm w-full rounded-full text-white bg-white/10 px-5 py-2 border"
                    placeholder="搜尋曲名、歌手或專輯"
                    onKeyUp={handleKeyUp}
                    ref={ref}
                />
                <button className="absolute top-[10px] right-5" onClick={handleSearch}>
                    <img src={search} alt="搜尋" />
                </button>
            </div>
            <p className="text-white font-bold mb-2 mt-5">最近搜尋</p>
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
