import { useState, useRef, useEffect, useContext } from "react";

import style from "@/components/PreviewList.module.css";

import { Link } from "react-router-dom";
import { colsContext } from "@/App";

import test_preview_list from "@/test/test_preview_list.png";

const PreviewList = function (props) {

  const test_array = [1, 1, 1, 1, 1, 1, 1];

  const ref = useRef(null);
  const colsConsumer = useContext(colsContext);
  const [list, setList] = useState(test_array);
  
  useEffect(() => {
    if (!ref.current) return;
    const display = test_array.filter((item, index) => index < colsConsumer);
    ref.current.classList.add("opacity-0");
    setTimeout(() => { setList(display) }, 400)
    setTimeout(() => { ref.current.classList.remove("opacity-0") }, 500);
  }, [colsConsumer])

  return (
    <div className={ style.preview }>
      <div className={ style.header }>
        <h3>{ props.title }</h3>
        <Link to={ props.link }>更多</Link>
      </div>
      <ul ref={ ref } className={ style.list }>
        {
          list.map((item, index) => {
            return (
              <li className={ style.item } key={ index }>
                <img width="100" height="100" src={ test_preview_list } alt="" />
                <p>Thursday's Child</p>
                <small>Tomorrow x Toge...</small>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default PreviewList;