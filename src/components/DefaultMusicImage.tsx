import Icon from "@/components/Icon";

export type DefaultMusicImageProps = {
  size?: number;
};

const DefaultMusicImage = (props: DefaultMusicImageProps) => {
  return (
    <div
      className={`bg-linear-to-b from-secondary-100 to-primary-400 rounded flex items-center justify-center aspect-square ${props.size ? `w-${props.size} h-${props.size}` : "w-full h-full"}`}
    >
      <Icon icon="music" alt="music icon" width={props.size ?? 32} height={props.size ?? 32} />
    </div>
  );
};

export default DefaultMusicImage;
