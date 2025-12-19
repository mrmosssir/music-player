import { useSelector } from "react-redux";
import { type RootState } from "@/store";

import SearchBar from "@/components/SearchBar";
import Playlist from "@/components/Playlist";
import TransportControl from "@/components/TransportControl";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="h-screen w-full grid grid-cols-1 lg:grid-cols-[360px_1fr] grid-rows-[1fr_96px]">
      {/* 左側搜尋欄 */}
      <aside>
        <SearchBar />
      </aside>

      {/* 主要內容區域 */}
      <div className="w-full bg-primary-100 transition-all duration-500 overflow-scroll">{children}</div>

      {/* 底部播放控制區域 */}
      <footer className="col-span-2 z-30">
        <TransportControl className="col-span-2" />
      </footer>

      {user.id && <Playlist className="pb-24" />}
    </div>
  );
};

export default Layout;
