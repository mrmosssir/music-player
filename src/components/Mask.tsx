import { useSelector } from "react-redux";
import { type RootState } from "@/store";

const Mask = () => {
  const enabled = useSelector((state: RootState) => state.common.enabled);

  return <div className={`hidden w-screen h-screen bg-black/50 absolute top-0 left-0 z-10 ${enabled.mask ? "block" : ""}`}></div>;
};

export default Mask;
