import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import littleRockLogo from "../assets/svg/littleRockLogoNoBg.svg";

const PaymentHomepage = () => {
  const bounceTransition = {
    repeat: Infinity, // Keep the animation repeating
    repeatType: "reverse" as const, // Makes it bounce back and forth
    duration: 0.6, // Adjust duration to control speed
    ease: "easeInOut", // Smooth easing for the bounce effect
  };

  return (
    <div className="bg-littleRockBlue-500 h-screen py-10 md:py-20 px-3 flex justify-center items-center">
      <div className="bg-littleRockBlue-600 p-10 lg:w-5/12">
        {/* school icon  */}
        <div className="flex flex-col justify-center items-center gap-4 mb-10">
          <motion.img
            src={littleRockLogo}
            alt="Little Rock Logo"
            className="h-20 w-20"
            animate={{y: ["0%", "-20%"]}} // Moves up and down by 30% of its own height
            transition={bounceTransition}
          />
          <h1 className=" text-littleRockWhite-500 text-xl font-semibold">
            Welcome to our payment platform, please select and option below
          </h1>
        </div>
        {/* buttons */}
        <div className="flex flex-col gap-4 w-8/12 mx-auto">
          <Link
            to="/new-payment"
            className="bg-littleRockWhite-500 hover:bg-littleRockBlue-500 hover:text-littleRockWhite-500 rounded-lg px-3 py-2 text-center font-semibold"
          >
            Make New Payment
          </Link>
          <Link
            to="/outstanding-payment"
            className="bg-littleRockWhite-500 hover:bg-littleRockBlue-500 hover:text-littleRockWhite-500 rounded-lg px-3 py-2 text-center font-semibold"
          >
            Complete Outstanding Payments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentHomepage;
