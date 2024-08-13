import littleRockLogo from "../assets/svg/littleRockLogoNoBg.svg";
const Header = () => {
  return (
    <header
      className={` bg-littleRockBlue-600 text-white fixed top-0 right-0 left-16 z-10`}
    >
      <div className="container py-4 px-10 mx-auto flex justify-between items-center">
        <div>
          <img src={littleRockLogo} alt="" className="h-16 w-auto" />
        </div>

        <nav>
          <ul className="flex space-x-10 font-semibold">
            <li>
              <a
                href="#"
                className="hover:text-gray-300 hover:underline underline-offset-8"
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-300 hover:underline underline-offset-8"
              >
                INQUIRE
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-300 hover:underline underline-offset-8"
              >
                CONTACT
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-300 hover:underline underline-offset-8"
              >
                QUICKLINKS
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
