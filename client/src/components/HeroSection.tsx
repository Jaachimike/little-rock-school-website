import ReactPlayer from "react-player/youtube";

function HeroSection() {
  return (
    <div className="relative h-[600px] md:h-screen -mt-4 sm:mt-0">
      <ReactPlayer
        url="https://www.youtube.com/embed/orJy-Y-UGVg?si=y8U0qZ51xvibYj_F"
        controls={true}
        playing
        loop
        muted={true}
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
      />
      {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-white text-4xl font-bold">Explore Blake</h2>
      </div> */}
    </div>
  );
}

export default HeroSection;
