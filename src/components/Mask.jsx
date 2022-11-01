import style from "@/components/Mask.module.css";

import { InjectContext } from "@/context";
import { useContext } from "react";

const Mask = function () {
  const { displayContext } = useContext(InjectContext);
  return (
    <div className={ `${style.mask} ${displayContext["maskDisplay"] ? style.active : ''}` }></div>
  )
}

export default Mask;