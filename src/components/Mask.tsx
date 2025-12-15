import { useSelector } from "react-redux";
import { type RootState } from "@/store";

const Mask = function () {
  const maskDisplay = useSelector((state: RootState) => state.display.maskDisplay);

  return (
    <div className={ `hidden w-screen h-screen bg-black/50 absolute top-0 left-0 z-10 ${maskDisplay ? 'block' : ''}` }></div>
  )
}

export default Mask;