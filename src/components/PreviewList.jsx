import { useState, useRef, useEffect, useContext } from "react";

import style from "@/components/PreviewList.module.css";

import { Link } from "react-router-dom";
import { context } from "@/App";

const PreviewList = function (props) {

  const test_array = [1, 1, 1, 1, 1, 1, 1];

  const ref = useRef(null);
  const consumer = useContext(context);

  const [size, setSize] = useState("100%")

  const sizeChange = function (column) {
    const width = ref.current.offsetWidth;
    const gutter = 2; // percents
    const size = width / 100 * (100 - (gutter * (column - 1))) / column;
    setSize(`${size}px`);
  }

  useEffect(() => {
    if (!ref.current) return;
    const display = test_array.filter((item, index) => index < consumer.cols);
    ref.current.classList.add("opacity-0");
    setTimeout(() => {
      sizeChange(consumer.cols);
    }, 400)
    setTimeout(() => { ref.current.classList.remove("opacity-0") }, 500);
  }, [consumer.cols])

  return (
    <div ref={ ref } className={ style.preview }>
      <div className={ style.header }>
        <h3>{ props.title }</h3>
        <Link to={ props.link }>更多</Link>
      </div>
      <ul className={ style.list }>
        {
          props.list.filter((item, index) => {
            return index < consumer.cols;
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