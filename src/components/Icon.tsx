const icons = import.meta.glob("@/assets/svg/*.svg", { eager: true, import: "default" }) as Record<string, string>;

const iconMap: Record<string, string> = Object.keys(icons).reduce(
  (acc, path) => {
    const name = path.match(/\/([^/]+)\.svg$/)?.[1];
    if (name) {
      acc[name] = icons[path];
    }
    return acc;
  },
  {} as Record<string, string>,
);

export type IconProps = {
  icon: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  alt?: string;
};

const Icon = (props: IconProps) => {
  const { icon, width, height, className, alt } = props;

  const iconSrc = iconMap[icon];

  return <img src={iconSrc} alt={alt || icon} width={width} height={height} className={className} />;
};

export default Icon;
