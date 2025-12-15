import "@/assets/fonts/agency-fb.css";

import logo from "@/assets/svg/logo.svg";

export type LogoProps = {
  type: "web" | "mobile";
};

const Logo = (props: LogoProps) => {
  const titleClass = props.type === "web" ? "hidden justify-center items-end lg:flex" : "flex items-end absolute top-0 left-0 lg:hidden";

  return (
    <h1 className={titleClass}>
      <img src={logo} alt="logo" className="w-6.5 h-6.5 block mr-1" />
      <p className="hidden sm:block text-white text-2xl leading-5 font-['Agency FB', sans-serif]">Immerse</p>
    </h1>
  );
};

export default Logo;
