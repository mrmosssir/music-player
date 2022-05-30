import style from "@/components/Banner.module.css";

import play from "@/assets/svg/play.svg";

const Banner = function (props) {
  const innerStyle = { backgroundImage: `url("${props.image}")` };
  return (
    <div className={ style.banner } style={ innerStyle }>
      <div className={ style.content }>
        <div>
          <p>{ props.name }</p>
          <small>{ props.artist }</small>
        </div>
        <button>
          <img width="10" height="10" src={ play } alt="播放" />
        </button>
      </div>
    </div>
  )
}

export default Banner;