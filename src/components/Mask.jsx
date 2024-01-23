import { useSelector } from "react-redux";

import style from "@/components/Mask.module.css";


const Mask = function () {
  const maskDisplay = useSelector((state) => state.display.maskDisplay);

  return (
    <div className={ `${style.mask} ${maskDisplay ? style.active : ''}` }></div>
  )
}

export default Mask;