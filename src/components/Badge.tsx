export type BadgeProps = {
  list: string[];
}

const Bagde = function (props: BadgeProps) {
  return (
    <div className="flex flex-wrap">
      {
        props.list.map((item) => {
          return <span className="text-sm bg-primary-300 rounded-full py-1 px-4 text-white mr-2 mt-2" key={ item }>
              { item }
            </span>
        })
      }
    </div>
  )
}

export default Bagde;