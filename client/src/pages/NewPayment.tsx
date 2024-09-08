import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../utils/axios";
import littleRockLogo from "../assets/svg/littleRockLogoNoBg.svg";
import backSvg from "../assets/svg/back-svgrepo-com.svg";
import DynamicDoubleInput from "../components/DynamicDoubleInput";

const NewPayment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    childrenNames: [] as string[],
    childrenClasses: [] as string[],
    numberOfChildren: 0,
    branchLocation: "",
  });

  useEffect(() => {
    const selectedBranch = localStorage.getItem("selectedBranch");
    if (!selectedBranch) {
      navigate("/branch-selection");
    } else {
      setFormData(prevData => ({...prevData, branchLocation: selectedBranch}));
    }
  }, [navigate]);

  const backButtonClick = () => {
    navigate("/branch-selection");
  };

  const bounceTransition = {
    repeat: Infinity,
    repeatType: "reverse" as const,
    duration: 0.6,
    ease: "easeInOut",
  };

  const handleChildrenDataChange = (names: string[], classes: string[]) => {
    setFormData({
      ...formData,
      childrenNames: names,
      childrenClasses: classes,
      numberOfChildren: names.length,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    try {
      const response = await axiosInstance.post("/payments/register", {
        parentFirstName: formData.firstName,
        parentLastName: formData.lastName,
        email: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        childrenNames: formData.childrenNames,
        childrenClasses: formData.childrenClasses,
        branchLocation: formData.branchLocation,
      });

      console.log("Response data:", response.data);

      localStorage.setItem("paymentDetails", JSON.stringify(response.data));
      navigate("/payment-confirmation");
    } catch (error: any) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="bg-littleRockBlue-500 py-10 md:py-20 px-3 flex justify-center items-center">
      <div className="bg-littleRockBlue-600 p-10 lg:w-5/12 ">
        <button
          onClick={backButtonClick}
          className="flex items-center gap-2 text-littleRockWhite-500 mb-6"
        >
          <span>
            <img src={backSvg} alt="previous button" className="h-3" />
          </span>
          Back to Branch Selection
        </button>
        {/* school icon  */}
        <div className="flex flex-col justify-center items-center gap-4 mb-10">
          <motion.img
            src={littleRockLogo}
            alt="Little Rock Logo"
            className="h-20 w-20"
            animate={{y: ["0%", "-20%"]}}
            transition={bounceTransition}
          />
          <h1 className=" text-littleRockWhite-500 text-xl font-semibold">
            Please fill out this form to get the cost of school fees
          </h1>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* first name input field */}
          <div className="flex flex-col gap-3 text-littleRockWhite-500">
            <label htmlFor="firstName" className="font-semibold">
              First Name :
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Your First Name"
              className="px-5 py-3 rounded-xl text-black"
            />
          </div>
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
              className="px-5 py-3 rounded-xl text-black"
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
              className="px-5 py-3 rounded-xl text-black"
            />
          </div>
          {/* phone number input field */}
          <div className="flex flex-col gap-3 text-littleRockWhite-500">
            <label htmlFor="phoneNumber" className="font-semibold">
              Phone Number :
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Your Phone Number"
              className="px-5 py-3 rounded-xl text-black"
            />
          </div>
          {/* children data input fields */}
          <div className="flex flex-col col-span-2 ">
            <DynamicDoubleInput
              label="Please kindly input Child(ren)'s classes"
              firstPlaceholder="Child's First Name"
              onChange={handleChildrenDataChange}
              error=""
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
