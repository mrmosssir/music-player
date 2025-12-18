import Icon from "@/components/Icon";

export type LogoProps = {
  type: "web" | "mobile";
  className?: string;
};

const Logo = (props: LogoProps) => {
  const titleClass = props.type === "web" ? "hidden justify-center items-end lg:flex" : "flex items-end lg:hidden";
  const finalClass = props.className ? `${titleClass} ${props.className}` : titleClass;

  return (
    <h1 className={finalClass}>
      <Icon icon="logo" className="w-6.5 h-6.5 block mr-1" alt="logo" />
      <p className="hidden sm:block text-white text-2xl leading-5 font-agency sans-serif">Immerse</p>
    </h1>
  );
};

export default Logo;
