import style from "@/components/Badge.module.css";

const Bagde = function (props) {
  return (
    <div className="flex flex-wrap">
      {
        props.list.map((item) => {
          return <span className={ style.badge } key={ item }>
              { item }
            </span>
        })
      }
    </div>
  )
}

export default Bagde;