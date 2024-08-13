import React, {useState} from "react";
import {Link} from "react-router-dom";
import littleRockLogo from "../assets/svg/littleRockLogoNoBg.svg";

interface INavItem {
  name: string;
  dropdownItems: IDropdownItems[];
}

interface IDropdownItems {
  href: string;
  name: string;
}

const Header: React.FC = () => {
  const navItems: INavItem[] = [
    {
      name: "ABOUT",
      dropdownItems: [
        {
          href: "/mission-and-vision",
          name: "Our Mission and Vision",
        },
        {
          href: "/history",
          name: "Our History",
        },
        {
          href: "/management-team",
          name: "Our Management Team",
        },
      ],
    },
    {
      name: "INQUIRE",
      dropdownItems: [
        {
          href: "/payment-homepage",
          name: "Admissions",
        },
        {
          href: "/payment-homepage",
          name: "Programs",
        },
        {
          href: "/payment-homepage",
          name: "Scholarships",
        },
      ],
    },
    {
      name: "CONTACT",
      dropdownItems: [
        {
          href: "/payment-homepage",
          name: "General Inquiries",
        },
        {
          href: "/payment-homepage",
          name: "Departments",
        },
        {
          href: "/payment-homepage",
          name: "Support",
        },
      ],
    },
    {
      name: "QUICKLINKS",
      dropdownItems: [
        {
          href: "/payment-homepage",
          name: "Payment Portal",
        },
      ],
    },
  ];

  return (
    <header className="bg-littleRockBlue-600 text-white fixed top-0 right-0 left-16 z-10">
      <div className="container py-4 px-10 mx-auto flex justify-between items-center">
        <div>
          <Link to="/">
            <img
              src={littleRockLogo}
              alt="Little Rock Logo"
              className="h-16 w-auto"
            />
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-10 font-semibold">
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                <a
                  href="#"
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
