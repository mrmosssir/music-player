import Icon from "@/components/Icon";

type ThemeProps = {
  icon?: string;
  main?: string;
  sub?: string;
};

const Theme = (props: ThemeProps) => {
  return (
    <div className="flex">
      {props.icon && <Icon icon={props.icon} alt={props.main} className="block w-6 h-8 mt-auto mr-2 mb-0.5" />}
      <div>
        {props.sub && <small className="hidden text-secondary text-xs tracking-[0.2rem] text-center lg:block">{props.sub}</small>}
        {props.main && <h2 className="text-white text-2xl font-bold lg:text-4xl">{props.main}</h2>}
      </div>
    </div>
  );
};

export default Theme;
