import SearchBar from "@/components/SearchBar";
import Playlist from "@/components/Playlist";
import Mask from "@/components/Mask";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-100 flex md:min-h-screen md:h-screen">
      <SearchBar />
      <div className="w-full transition-all duration-500 overflow-scroll">{children}</div>
      <Playlist />
      <Mask />
    </div>
  );
};

export default Layout;
