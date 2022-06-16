import { useState, useRef, useEffect, useContext } from "react";

import style from "@/components/PreviewList.module.css";

import { Link } from "react-router-dom";
import { colsContext } from "@/App";

import test_preview_list from "@/test/test_preview_list.png";

const PreviewList = function (props) {

  const test_array = [1, 1, 1, 1, 1, 1, 1];

  const ref = useRef(0);
  const colsConsumer = useContext(colsContext);
  const [list, setList] = useState(test_array);
  
  useEffect(() => {
    const display = test_array.filter((item, index) => index < colsConsumer);
    if (colsConsumer < 7) setList(display);
    else setTimeout(() => { setList(display) }, 500)
  }, [colsConsumer])

  return (
    <div ref={ ref } className={ style.preview }>
      <div className={ style.header }>
        <h3>{ props.title }</h3>
        <Link to={ props.link }>更多</Link>
      </div>
      <ul className={ style.list }>
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