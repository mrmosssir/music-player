import style from "@/components/Theme.module.css";

const Theme = function (props) {
  const icon = props.icon ? <img src={ props.icon } alt={ props.main } /> : "";
  const mainTitle = props.main ? <h2>{ props.main }</h2> : "";
  const subTitle = props.sub ? <small>{ props.sub }</small> : "";
  return (
    <div className={ style.theme }>
      { icon }
      <div className={ style.content }>
        { subTitle }
        { mainTitle }
      </div>
    </div>
  )
}

export default Theme;