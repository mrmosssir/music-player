import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store";
import { setEnabled } from "@/store/common";

import { searchAlbum } from "@/utils/search";

import Icon from "@/components/Icon";

const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menu = [{ name: "我的最愛", favorite: true }, { name: "排行榜", path: "top" }, { name: "新歌推薦" }, { name: "最新專輯" }];

  const token = useSelector((state: RootState) => state.auth.token);
  const enabled = useSelector((state: RootState) => state.common.enabled);

  const [recent, setRecent] = useState<string[]>([]);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    handleSearch(event.currentTarget.value);
  };

  const handleSearch = (str: string) => {
    if (!token || !str) return;
    searchAlbum(token, str);
    const updatedRecent = [str, ...recent.filter((item) => item !== str)].slice(0, 8);
    setRecent(updatedRecent);
    localStorage.setItem("recent", JSON.stringify(updatedRecent));
  };

  const handleBackHome = () => {
    navigate("/music-player");
  };

  const handleGetRecent = () => {
    const storedRecent = localStorage.getItem("recent");
    if (storedRecent) {
      setRecent(JSON.parse(storedRecent));
    }
  };

  const handleClickRecentBadge = async (item: string) => {
    setKeyword(item);
    handleSearch(item);
  };

  useEffect(() => {
    handleGetRecent();
  }, []);

  return (
    <div
      className={`h-full w-full bg-primary-200 py-8 px-10 z-20 absolute top-0 left-0 -translate-x-full transition-all duration-500 lg:relative lg:translate-x-0 lg:block lg:shadow-[5px_0px_10px_rgba(0,0,0,0.2)] ${enabled.search ? "translate-x-0" : ""}`}
    >
      {/* Logo */}
      <h1 className="flex justify-center items-end cursor-pointer" onClick={() => handleBackHome()}>
        <Icon icon="logo" className="w-6.5 h-6.5 block mr-1" alt="logo" />
        <p className="text-white text-2xl leading-5 font-agency">Immerse</p>
      </h1>

      {/* 搜尋框 */}
      <div className="w-full flex items-stretch gap-x-4 mt-6 mb-3">
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
          <button onClick={() => handleSearch(keyword)} className="cursor-pointer">
            <Icon icon="search" alt="搜尋" className="w-3" />
          </button>
        </div>
      </div>

      {/* 搜尋紀錄 */}
      {!!recent.length && (
        <>
          <p className="text-white font-bold mb-2 mt-5">最近搜尋</p>

          <div className="flex flex-wrap">
            {recent.map((item) => {
              return (
                <button
                  className="text-sm bg-primary-300 rounded-full py-1 px-4 text-white mr-2 mt-2 cursor-pointer"
                  key={item}
                  onClick={() => handleClickRecentBadge(item)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* 選單 */}
      <ul className="mt-6">
        {menu.map((item) => {
          return (
            <li className={`flex mt-3 ${item.favorite ? "text-secondary" : "text-white"}`} key={item.name}>
              <Link to={`/music-player/${item.path ?? ""}`}>{item.name}</Link>
              {item.favorite ? <Icon icon="favorite-fill" alt="最愛" className="ml-3" /> : ""}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchBar;
