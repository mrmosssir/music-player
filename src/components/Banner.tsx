import play from "@/assets/svg/play.svg";

export type BannerProps = {
  image: string;
  name: string;
  artist: string;
}

const Banner = function (props: BannerProps) {
  const innerStyle = { backgroundImage: `url("${props.image}")` };
  return (
    <div className="relative rounded-lg h-80 mt-6 overflow-hidden">
      <div className="w-full h-full bg-cover bg-center bg-no-repeat blur-lg absolute top-0 left-0 z-0 before:block before:w-full before:h-full before:bg-black-500 before:blur-lg before:absolute before:top-0 before:left-0" style={ innerStyle }></div>
      <img className="block h-full absolute top-0 left-1/2 translate-x-[-50%]" src={ props.image } alt="" />
      <div className="absolute bottom-0 w-full h-24 px-10 flex justify-between items-center bg-gradient-to-b from-transparent to-black-500">
        <div>
          <p className="text-white">{ props.name }</p>
          <small className="block text-white-500 text-xs mt-1">{ props.artist }</small>
        </div>
        <button className="w-9 h-9 rounded-full bg-gradient-to-b from-secondary-100 to-primary-400 z-10">
          <img width="10" height="10" src={ play } alt="播放" className="block mx-auto" />
        </button>
      </div>
    </div>
  )
}

export default Banner;