import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store";
import { setEnabled } from "@/store/common";

import { searchAlbum } from "@/utils/search";

import Bagde from "@/components/Badge";
import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import Icon from "@/components/Icon";

export type SearchBarProps = {
  toggle?: () => void;
};

const SearchBar = (props: SearchBarProps) => {
  const [keyword, setKeyword] = useState<string>("");

  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const enabled = useSelector((state: RootState) => state.common.enabled);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    handleSearch();
  };

  const handleSearch = () => {
    if (!token || !keyword) return;
    searchAlbum(token, keyword);
  };

  return (
    <div
      className={`w-screen h-screen bg-primary-200 min-w-87.5 py-8 px-10 shadow-[5px_0px_10px_rgba(0,0,0,0.2)] z-20 absolute top-0 left-0 -translate-x-full transition-all duration-500 lg:relative lg:left-0 lg:w-1/5 lg:translate-x-0 lg:block ${enabled.search ? "translate-x-0" : ""}`}
    >
      <Logo type="web" />
      <div className="flex items-stretch gap-x-4 mt-6 mb-3">
        <button onClick={() => dispatch(setEnabled("search", false))} className="rotate-180 cursor-pointer lg:hidden">
          <Icon icon="arrow" width="12" height="12" alt="關閉" />
        </button>
        <div className="w-11/12 flex items-center gap-x-4 relative bg-white/10 px-5 text-right border border-white rounded-full mx-auto sm:w-full">
          <input
            type="text"
            className="text-sm text-white py-2 flex-1 outline-none"
            placeholder="搜尋曲名、歌手或專輯"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <button onClick={handleSearch} className="cursor-pointer">
            <Icon icon="search" alt="搜尋" className="w-3" />
          </button>
        </div>
      </div>

      <p className="text-white font-bold mb-2 mt-5">最近搜尋</p>
      <Bagde list={["放鬆", "搖滾", "R&B", "Hip-Hop", "測試"]} />
      <Menu list={[{ name: "我的最愛", favorite: true }, { name: "排行榜", path: "top" }, { name: "新歌推薦" }, { name: "最新專輯" }]} />
    </div>
  );
};

export default SearchBar;
