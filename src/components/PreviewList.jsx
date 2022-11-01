import { useState, useRef, useEffect, useContext } from "react";

import style from "@/components/PreviewList.module.css";

import { Link } from "react-router-dom";
import { InjectContext } from "@/context";

const PreviewList = function (props) {

  const ref = useRef(null);
  const { sizeContext } = useContext(InjectContext);

  const [size, setSize] = useState("100%")

  const sizeChange = function (column) {
    const device = {
      "sm": 640,
      "md": 768,
      "lg": 1024,
      "xl": 1280,
      "2xl": 1536
    };
    const width = ref.current.offsetWidth;
    const innerWidth = window.innerWidth
    const gutter = 2; // percents
    let size = 100
    if (innerWidth > device.lg) size = width / 100 * (100 - (gutter * (column - 1))) / column;
    setSize(`${size}px`);
  }

  useEffect(() => {
    if (!ref.current) return;
    ref.current.classList.add("opacity-0");
    setTimeout(() => {
      sizeChange(sizeContext["previewListCols"]);
    }, 400)
    setTimeout(() => { ref.current.classList.remove("opacity-0") }, 500);
  }, [sizeContext["previewListCols"]])

  return (
    <div ref={ ref } className={ style.preview }>
      <div className={ style.header }>
        <h3>{ props.title }</h3>
        <Link to={ props.link }>更多</Link>
      </div>
      <ul className={ style.list }>
        {
          props.list.filter((item, index) => {
            return index < sizeContext["previewListCols"];
          }).map((item, index) => {
            return (
              <li className={ style.item } style={{ width: size }} key={ index }>
                <img width={ "100%" } height={ "100%" } src={ item.image } alt="" />
                <p>{ item.name }</p>
                <small>{ item.artist }</small>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default PreviewList;