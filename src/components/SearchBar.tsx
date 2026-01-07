import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ColorThief from "colorthief";

import { type RootState } from "@/store";
import { setEnabled } from "@/store/common";

import { searchAlbum } from "@/utils/search";
import { getCategories, type Category } from "@/utils/browse";

import Icon from "@/components/Icon";

const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gradientColors: string[] = [
    "#ff5e67",
    "#f65970",
    "#ed5479",
    "#e44f82",
    "#db4a8b",
    "#d24595",
    "#c9409e",
    "#c03ba7",
    "#b736b0",
    "#ae31b9",
    "#a52cc2",
    "#9c27cb",
    "#9322ce",
    "#8a1dc2",
    "#8118b6",
    "#7813aa",
    "#6f0e9e",
    "#660992",
    "#5d0486",
    "#7600ae",
  ];

  const colorThief = new ColorThief();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const enabled = useSelector((state: RootState) => state.common.enabled);

  const [recent, setRecent] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<{ [key: string]: string }>({});
  const [fontColors, setFontColors] = useState<{ [key: string]: string }>({});

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

  const handleGetDominateColor = (event: HTMLImageElement, index: number): void => {
    try {
      const color = colorThief.getColor(event) || [0, 0, 0];
      setColors((prev) => ({ ...prev, [index]: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }));
      setFontColors((prev) => {
        const brightness = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
        return { ...prev, [index]: brightness > 125 ? "#000000" : "#ffffff" };
      });
    } catch (error) {
      // 如果跨域錯誤，使用漸層色作為 fallback
      setColors((prev) => ({ ...prev, [index]: gradientColors[index % gradientColors.length] }));
      setFontColors((prev) => ({ ...prev, [index]: "#ffffff" }));
    }
  };

  useEffect(() => {
    handleGetRecent();
  }, []);

  useEffect(() => {
    if (!token) return;
    getCategories(token, user?.country).then((categories) => setCategories(categories));
  }, [token, user]);

  return (
    <div
      className={`min-h-full w-full bg-primary-200 py-8 px-10 z-20 absolute top-0 left-0 -translate-x-full transition-all duration-500 lg:relative lg:translate-x-0 lg:block lg:shadow-[5px_0px_10px_rgba(0,0,0,0.2)] ${enabled.search ? "translate-x-0" : ""}`}
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
        <div className="w-11/12 flex items-center gap-x-4 relative bg-white/10 px-5 text-right border border-white/50 rounded-full mx-auto sm:w-full">
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
      <div className="grid grid-cols-2 gap-3 mt-6">
        {categories.map((item, index) => {
          return (
            <Link
              to={`/music-player/list?name=${encodeURIComponent(item.name)}`}
              className="relative h-24 col-span-1 overflow-hidden rounded p-2 cursor-pointer"
              style={{ backgroundColor: colors[index] }}
              key={item.id}
            >
              <p className="text-sm text-white" style={{ color: fontColors[index] }}>
                {item.name}
              </p>
              <img
                id={`category-image-${index}`}
                className="absolute -right-2 top-9 h-18 rounded rotate-15"
                src={item.image}
                alt={item.name}
                crossOrigin="anonymous"
                onLoad={(e) => handleGetDominateColor(e.currentTarget, index)}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
