import style from "@/components/MusicList.module.css";

import player from "@/assets/svg/player.svg";

const MusicList = function (props) {
  return (
    <ul className={ style.musiclist }>
      {
        props.list.map((item, index) => {
          return <li key={ item.key } className={ style.music }>
            <span className={ style.number }>{ index + 1 }</span>
            <div className={ style.image }>
              <img width="80" height="80" src={ item.image } alt={ item.name } />
              <button><img width="30" height="30" src={ player } alt="播放" /></button>
            </div>
            <div className={ style.content }>
              <h3>{ item.name }</h3>
              <p>{ item.artist }</p>
            </div>
          </li>
        })
      }
    </ul>
  )
}

export default MusicList;