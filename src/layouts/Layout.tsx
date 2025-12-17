import SearchBar from "@/components/SearchBar";
import SideBar from "@/components/SideBar";
import Mask from "@/components/Mask";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-100 flex md:min-h-screen md:h-screen">
      <SearchBar />
      <div className="w-full transition-all duration-500 overflow-scroll">{children}</div>
      <SideBar />
      <Mask />
    </div>
  );
};

export default Layout;
