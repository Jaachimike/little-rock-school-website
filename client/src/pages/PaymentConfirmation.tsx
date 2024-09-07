import React, {useEffect, useState} from "react";
import {PaystackButton} from "react-paystack";
import backSvg from "../assets/svg/back-svgrepo-com.svg";
import {motion} from "framer-motion";
import littleRockLogo from "../assets/svg/littleRockLogoNoBg.svg";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../utils/axios";
import Modal from "../components/Modal";

const PaymentConfirmation = () => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payCustomPrice, setPayCustomPrice] = useState(false);
  const [selectedPercentage, setSelectedPercentage] = useState(100); // Default to 100%

  const navigate = useNavigate();

  useEffect(() => {
    const details = localStorage.getItem("paymentDetails");
    if (details) {
      setPaymentDetails(JSON.parse(details));
    } else {
      navigate("/new-payment");
    }
  }, [navigate]);

  if (!paymentDetails || !paymentDetails.payment) return <div>Loading...</div>;

  const backButtonClick = () => {
    navigate(-1);
  };

  const bounceTransition = {
    repeat: Infinity, // Keep the animation repeating
    repeatType: "reverse" as const, // Makes it bounce back and forth
    duration: 0.6, // Adjust duration to control speed
    ease: "easeInOut", // Smooth easing for the bounce effect
  };

  const handleSuccess = async () => {
    // Make API call to record the payment
    try {
      const apiResponse = await axiosInstance.post("/payments/make-payment", {
        email: paymentDetails.payment.email,
        amountPaid: !payCustomPrice
          ? paymentDetails.payment.totalSchoolFees
          : (paymentDetails.payment.totalSchoolFees * selectedPercentage) / 100,
      });
      console.log("Payment recorded:", apiResponse.data);
      setIsModalOpen(true); // Open the modal on success
    } catch (error) {
      console.error("Error recording payment:", error);
      alert(
        "Payment was successful, but there was an error recording it. Please contact support."
      );
    }
  };

  const componentProps = {
    email: paymentDetails.payment.email,
    amount: !payCustomPrice
      ? paymentDetails.payment.totalSchoolFees * 100 // Full amount in kobo
      : ((paymentDetails.payment.totalSchoolFees * selectedPercentage) / 100) *
        100, // Percentage amount in kobo
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "name",
          value: `${paymentDetails.payment.parentFirstName} ${paymentDetails.payment.parentLastName}`,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone",
          value: paymentDetails.payment.phoneNumber,
        },
        {
          display_name: "Branch Location",
          variable_name: "branch",
          value: paymentDetails.payment.branchLocation,
        },
      ],
    },
    publicKey,
    text: "Pay School Fees",
    onSuccess: handleSuccess,
    onClose: () => alert("You are about to cancel your payment"),
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPercentage(Number(e.target.value));
  };

  return (
    <div className="bg-littleRockBlue-500 py-10 md:py-20 px-3 flex justify-center items-center h-screen">
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
            animate={{y: ["0%", "-20%"]}} // Moves up and down by 30% of its own height
            transition={bounceTransition}
          />
          <h1 className=" text-littleRockWhite-500 text-xl font-semibold">
            Please confirm school fees amount
          </h1>
        </div>
        <div className="text-littleRockWhite-500">
          <h1>Amount to be paid:</h1>
          <p className="text-littleRockWhite-500 text-xl font-semibold mb-5">
            Total School Fees: {paymentDetails.payment.totalSchoolFees}
          </p>
          <div className="mb-5">
            <input
              type="checkbox"
              id="payCustomPrice"
              checked={payCustomPrice}
              onChange={e => setPayCustomPrice(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="payCustomPrice">Pay custom price</label>
          </div>
          {payCustomPrice && (
            <div className="mb-5">
              <select
                value={selectedPercentage}
                onChange={handlePercentageChange}
                className="bg-white text-black rounded p-2"
              >
                <option value={25}>25%</option>
                <option value={50}>50%</option>
                <option value={75}>75%</option>
                <option value={100}>100%</option>
              </select>
            </div>
          )}
          <p className="text-littleRockWhite-500 text-xl font-semibold mb-5">
            Amount to pay:{" "}
            {!payCustomPrice
              ? paymentDetails.payment.totalSchoolFees
              : (paymentDetails.payment.totalSchoolFees * selectedPercentage) /
                100}
          </p>
          <PaystackButton
            className="paystack-button bg-black hover:bg-littleRockWhite-500 text-white hover:text-black px-4 py-2 rounded-lg"
            {...componentProps}
          />
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              navigate("/"); // Redirect after closing the modal
            }}
            title="Payment Successful"
            message="Thank you! Your payment has been successfully recorded."
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;

// const handlePayment = async () => {
//   try {
//     // Initialize Paystack payment here
//     const handler = PaystackPop.setup({
//       key: "your_paystack_public_key", // Replace with your actual public key
//       email: paymentDetails.payment.email,
//       amount: paymentDetails.payment.totalSchoolFees * 100, // Amount in kobo
//       currency: "NGN",
//       ref: "LR_" + Math.floor(Math.random() * 1000000000 + 1), // Generate a unique reference
//       callback: async function (response: any) {
//         // Make API call to record the payment
//         try {
//           const apiResponse = await axios.post(
//             "http://localhost:3000/api/payments/make-payment",
//             {
//               email: paymentDetails.payment.email,
//               amountPaid: paymentDetails.payment.totalSchoolFees,
//             }
//           );
//           console.log("Payment recorded:", apiResponse.data);
//           alert("Payment successful. Thank you!");
//           navigate("/payment-success");
//         } catch (error) {
//           console.error("Error recording payment:", error);
//           alert(
//             "Payment was successful, but there was an error recording it. Please contact support."
//           );
//         }
//       },
//       onClose: function () {
//         alert("Payment window closed");
//       },
//     });
//     handler.openIframe();
//   } catch (error) {
//     console.error("Error initializing payment:", error);
//     alert("Failed to initialize payment. Please try again.");
//   }
// };
