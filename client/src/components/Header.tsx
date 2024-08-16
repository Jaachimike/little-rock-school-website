import React, {useState} from "react";
import {Link} from "react-router-dom";
import littleRockLogo from "../assets/svg/littleRockLogoNoBg.svg";

interface INavItem {
  name: string;
  mainhref: string;
  dropdownItems: IDropdownItem[];
}

interface IDropdownItem {
  href: string;
  name: string;
}

const navItems: INavItem[] = [
  {
    name: "ABOUT",
    mainhref: "/history",
    dropdownItems: [
      {href: "/mission-and-vision", name: "Our Mission and Vision"},
      // {href: "/history", name: "Our History"},
      {href: "/management-team", name: "Our Management Team"},
    ],
  },
  {
    name: "GALLERY",
    mainhref: "#",
    dropdownItems: [
      {href: "/payment-homepage", name: "Admissions"},
      {href: "/payment-homepage", name: "Programs"},
      {href: "/payment-homepage", name: "Scholarships"},
    ],
  },
  {
    name: "CONTACT",
    mainhref: "#",
    dropdownItems: [
      {href: "/payment-homepage", name: "General Inquiries"},
      {href: "/payment-homepage", name: "Departments"},
      {href: "/payment-homepage", name: "Support"},
    ],
  },
  {
    name: "QUICKLINKS",
    mainhref: "#",
    dropdownItems: [{href: "/payment-homepage", name: "Payment Portal"}],
  },
];

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <header className="bg-littleRockBlue-600 text-white fixed top-0 right-0 left-0 z-10">
      <div className="container py-4 px-4 md:px-10 mx-auto flex justify-between items-center">
        <Link to="/">
          <img
            src={littleRockLogo}
            alt="Little Rock Logo"
            className="h-12 md:h-16 w-auto"
          />
        </Link>
        <nav className="hidden md:block">
          <DesktopMenu navItems={navItems} />
        </nav>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <HamburgerIcon />
        </button>
      </div>
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        navItems={navItems}
      />
    </header>
  );
};

const DesktopMenu: React.FC<{navItems: INavItem[]}> = ({navItems}) => (
  <ul className="flex space-x-10 font-semibold">
    {navItems.map((item, index) => (
      <li key={index} className="relative group">
        <a
          href={item.mainhref}
          className="hover:text-gray-300 hover:underline underline-offset-8"
        >
          {item.name}
        </a>
        <ul className="absolute -left-8 mt-2 bg-white text-littleRockBlue-600 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out text-nowrap">
          {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
            <li key={dropdownIndex}>
              <a
                href={dropdownItem.href}
                className="block px-8 py-3 hover:bg-littleRockBlue-500 hover:text-littleRockWhite-500"
              >
                {dropdownItem.name}
              </a>
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
);

const MobileSidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  navItems: INavItem[];
}> = ({isOpen, onClose, navItems}) => (
  <div
    className={`fixed inset-y-0 right-0 w-64 bg-littleRockBlue-600 text-white transform ${
      isOpen ? "translate-x-0" : "translate-x-full"
    } transition-transform duration-300 ease-in-out z-20`}
  >
    <button onClick={onClose} className="absolute top-4 right-4 text-white">
      <CloseIcon />
    </button>
    <nav className="pt-16 px-4">
      <ul className="space-y-4">
        {navItems.map((item, index) => (
          <li key={index}>
            <span className="font-semibold">{item.name}</span>
            <ul className="ml-4 mt-2 space-y-2">
              {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                <li key={dropdownIndex}>
                  <a
                    href={dropdownItem.href}
                    className="block hover:text-gray-300"
                  >
                    {dropdownItem.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

const HamburgerIcon: React.FC = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default Header;
