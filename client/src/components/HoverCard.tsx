import {useState, useEffect} from "react";

interface IHoverCard {
  imageSrc: string;
  headerText: string;
  content: string;
  linkText: string;
  linkUrl: string;
}

const HoverCard = ({
  imageSrc,
  headerText,
  content,
  linkText,
  linkUrl,
}: IHoverCard) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div
      className="relative w-auto md:h-[585px] text-littleRockWhite-500 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imageSrc}
        alt={headerText}
        className="w-full h-full object-cover"
      />
      <div
        className={`absolute inset-x-0 bottom-0  bg-littleRockBlue-500 bg-opacity-80 p-4 mx-6 transition-all duration-300 ease-in-out flex flex-col items-center text-center rounded-t-md ${
          isHovered || isSmallScreen ? "h-fit" : "h-16"
        }`}
      >
        <h3 className="text-lg font-bold mb-2 pb-3 group-hover:border-b border-dashed w-fit uppercase">
          {headerText}
        </h3>
        {(isHovered || isSmallScreen) && (
          <>
            <p className="my-4">{content}</p>
            <a href={linkUrl} className="text-blue-400 hover:underline">
              {linkText}
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default HoverCard;
