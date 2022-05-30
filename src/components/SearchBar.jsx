import Bagde from "@/components/Badge";
import Menu from "@/components/Menu";

import style from "@/components/SearchBar.module.css";

import logo from "@/assets/svg/logo.svg";
import search from "@/assets/svg/search.svg";

function SearchBar() {
  return (
    <div className={ style.frame }>
      <img src={ logo } alt="logo" className={ style.logo } />
      <div className={ style.search }>
        <input type="text" placeholder="搜尋曲名、歌手或專輯" />
        <button>
          <img src={ search } alt="搜尋" />
        </button>
      </div>
      <Bagde list={ ["放鬆", "搖滾", "R&B", "Hip-Hop", "測試"] } />
      <Menu list={ [{ name: "我的最愛", favorite: true }, { name: "排行榜" }, { name: "新歌推薦" }, { name: "最新專輯" }] }/>
    </div>
  )
}

export default SearchBar