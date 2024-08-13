import React, {useState} from "react";
import {motion} from "framer-motion";
import littleRockLogo from "../assets/svg/littleRockLogoNoBg.svg";
import {useNavigate} from "react-router-dom";
import backSvg from "../assets/svg/back-svgrepo-com.svg";

const NewPayment = () => {
  const navigate = useNavigate();

  const backButtonClick = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState({
    lastName: "",
    emailAddress: "",
  });

  const bounceTransition = {
    repeat: Infinity, // Keep the animation repeating
    repeatType: "reverse" as const, // Makes it bounce back and forth
    duration: 0.6, // Adjust duration to control speed
    ease: "easeInOut", // Smooth easing for the bounce effect
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here, such as sending data to an API
  };

  return (
    <div className="bg-littleRockBlue-500 h-screen py-10 md:py-20 px-3 flex justify-center items-center">
      <div className="bg-littleRockBlue-600 p-10 lg:w-5/12 ">
        <button
          onClick={backButtonClick}
          className="flex items-center gap-2 text-littleRockWhite-500 mb-6"
        >
          <span>
            <img src={backSvg} alt="previous button" className="h-3" />
          </span>
          Back
        </button>
        {/* school icon  */}
        <div className="flex flex-col justify-center items-center gap-4 mb-10">
          <motion.img
            src={littleRockLogo}
            alt="Little Rock Logo"
            className="h-20 w-20"
            animate={{y: ["0%", "-20%"]}} // Moves up and down by 20% of its own height
            transition={bounceTransition}
          />
          <h1 className="text-littleRockWhite-500 text-xl font-semibold">
            Please fill out this form to get the complete your payment
          </h1>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* last name input field */}
          <div className="flex flex-col gap-3 text-littleRockWhite-500">
            <label htmlFor="lastName" className="font-semibold">
              Last Name :
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Your Last Name"
              className="px-5 py-3 rounded-xl"
            />
          </div>
          {/* email input field */}
          <div className="flex flex-col gap-3 text-littleRockWhite-500">
            <label htmlFor="emailAddress" className="font-semibold">
              Email Address :
            </label>
            <input
              type="email"
              name="emailAddress"
              id="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="Your Email Address"
              className="px-5 py-3 rounded-xl"
            />
          </div>
          {/* submit button */}
          <button
            type="submit"
            className="bg-littleRockWhite-500 text-littleRockBlue-500 hover:bg-littleRockBlue-500 hover:text-littleRockWhite-500 p-3 rounded-lg font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPayment;
