function Sidebar() {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 bg-littleRockWhite-500 flex flex-col items-center justify-between py-4 shadow-lg">
      <div>
        <button className="p-2 hover:bg-gray-300 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#02284b"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className="writing-mode-vertical-rl transform rotate-180 text-gray-700 flex-1 text-center hover:underline underline-offset-2 cursor-pointer font-semibold">
        LEARN MORE
      </div>
    </div>
  );
}

export default Sidebar;
