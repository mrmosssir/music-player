import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/store";
import { setEnabled } from "@/store/common";

import PlayList from "@/components/PlayList";
import Icon from "@/components/Icon";

const SideBar = () => {
  const dispatch = useDispatch();
  const enabled = useSelector((state: RootState) => state.common.enabled);

  return (
    <div
      className={`absolute bg-primary-200 min-w-87.5 w-1/5 h-screen top-0 right-0 transition duration-500 z-20 ${enabled.playlist ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center gap-x-4 px-8 py-6">
        <button onClick={() => dispatch(setEnabled("playlist", false))} className="rotate-180 cursor-pointer">
          <Icon icon="arrow" width="8" height="8" alt="關閉" />
        </button>
        <p className="flex-1 text-white">我的播放清單</p>
        <button>
          <Icon icon="add" width="18" height="18" alt="新增" />
        </button>
      </div>

      <PlayList />

      <button
        disabled={enabled.playlist}
        className={`hidden absolute top-8 left-0 w-12 h-12 bg-primary-100 border border-r-0 border-white/50 rounded-l-lg -translate-x-full duration-300 cursor-pointer lg:block ${enabled.playlist ? "opacity-0" : "opacity-100 delay-200"}`}
        onClick={() => dispatch(setEnabled("playlist", true))}
      >
        <Icon icon="music-list" alt="我的播放清單" className="mx-auto" />
      </button>
    </div>
  );
};

export default SideBar;
