import { useState, useRef, useEffect, useContext } from "react";

import style from "@/components/PreviewList.module.css";

import { Link } from "react-router-dom";
import { colsContext } from "@/App";

import test_preview_list from "@/test/test_preview_list.png";

const PreviewList = function (props) {

  const [size, setSize] = useState(0);
  // const [cols, setCols] = useState(7);
  const test_array = [1, 1, 1, 1, 1, 1, 1];

  const ref = useRef(0);
  const cols = useContext(colsContext);

  useEffect(() => {

    if (!ref.current) return;
    
    const gutter = 16;

    setSize(Math.floor((ref.current.offsetWidth - gutter * 4) / cols));
  }, [])

  return (
    <div ref={ ref } className={ style.preview }>
      <div className={ style.header }>
        <h3>{ props.title }</h3>
        <Link to={ props.link }>更多</Link>
      </div>
      <ul className={ style.list }>
        {
          test_array.map((item, index) => {
            return index < cols ? (
              <li className={ style.item } key={ index }>
                <img width={ size } height={ size } src={ test_preview_list } alt="" />
                <p>Thursday's Child</p>
                <small>Tomorrow x Toge...</small>
              </li>
            ) : "";
          })
        }
        {/* <li className={ style.item }>
          <img width={ size } height={ size } src={ test_preview_list } alt="" />
          <p>Thursday's Child</p>
          <small>Tomorrow x Toge...</small>
        </li>
        <li className={ style.item }>
          <img width={ size } height={ size } src={ test_preview_list } alt="" />
          <p>Thursday's Child</p>
          <small>Tomorrow x Toge...</small>
        </li>
        <li className={ style.item }>
          <img width={ size } height={ size } src={ test_preview_list } alt="" />
          <p>Thursday's Child</p>
          <small>Tomorrow x Toge...</small>
        </li>
        <li className={ style.item }>
          <img width={ size } height={ size } src={ test_preview_list } alt="" />
          <p>Thursday's Child</p>
          <small>Tomorrow x Toge...</small>
        </li>
        <li className={ style.item }>
          <img width={ size } height={ size } src={ test_preview_list } alt="" />
          <p>Thursday's Child</p>
          <small>Tomorrow x Toge...</small>
        </li> */}
      </ul>
    </div>
  )
}

export default PreviewList;