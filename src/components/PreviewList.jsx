import style from "@/components/PreviewList.module.css";

import { Link } from "react-router-dom";

import test_preview_list from "@/test/test_preview_list.png";

const PreviewList = function (props) {
  return (
    <div className={ style.preview }>
      <div className={ style.header }>
        <h3>{ props.title }</h3>
        <Link to={ props.link }>更多</Link>
      </div>
      <div className={ style.list }>
        <div className={ style.item }>
          <img width="150" height="150" src={ test_preview_list } alt="" />
          <p>Thursday's Child</p>
          <small>Tomorrow x Toge...</small>
        </div>
        <div className={ style.item }>
          <img width="150" height="150" src={ test_preview_list } alt="" />
          <p>Thursday's Child</p>
          <small>Tomorrow x Toge...</small>
        </div>
        <div className={ style.item }>
          <img width="150" height="150" src={ test_preview_list } alt="" />
          <p>Thursday's Child</p>
          <small>Tomorrow x Toge...</small>
        </div>
        <div className={ style.item }>
          <img width="150" height="150" src={ test_preview_list } alt="" />
          <p>Thursday's Child</p>
          <small>Tomorrow x Toge...</small>
        </div>
        <div className={ style.item }>
          <img width="150" height="150" src={ test_preview_list } alt="" />
          <p>Thursday's Child</p>
          <small>Tomorrow x Toge...</small>
        </div>
      </div>
    </div>
  )
}

export default PreviewList;