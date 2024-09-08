import React from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import littleRockLogo from "../assets/svg/littleRockLogoNoBg.svg";

const BranchSelection = () => {
  const navigate = useNavigate();

  const branches = [
    {name: "Lagos", value: "lagos"},
    {name: "Abuja", value: "abuja"},
    {name: "Owerri", value: "owerri"},
  ];

  const handleBranchSelect = (branchValue: string) => {
    localStorage.setItem("selectedBranch", branchValue);
    navigate("/new-payment");
  };

  const bounceTransition = {
    repeat: Infinity, // Keep the animation repeating
    repeatType: "reverse" as const, // Makes it bounce back and forth
    duration: 0.6, // Adjust duration to control speed
    ease: "easeInOut", // Smooth easing for the bounce effect
  };

  return (
    <div className="bg-littleRockBlue-500 min-h-screen py-10 md:py-20 px-3 flex justify-center items-center">
      <div className="bg-littleRockBlue-600 p-10 lg:w-5/12 rounded-lg">
        <div className="flex flex-col justify-center items-center gap-4 mb-10">
          <motion.img
            src={littleRockLogo}
            alt="Little Rock Logo"
            className="h-20 w-20"
            animate={{y: ["0%", "-20%"]}}
            transition={bounceTransition}
          />
          <h1 className="text-littleRockWhite-500 text-2xl font-semibold text-center">
            Select Branch
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          {branches.map(branch => (
            <button
              key={branch.value}
              onClick={() => handleBranchSelect(branch.value)}
              className="bg-littleRockWhite-500 text-littleRockBlue-500 hover:bg-littleRockBlue-500 hover:text-littleRockWhite-500 p-4 rounded-lg font-semibold transition-colors duration-300"
            >
              {branch.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchSelection;
