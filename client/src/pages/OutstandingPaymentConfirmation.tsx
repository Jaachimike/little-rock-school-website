import React, {useContext, useEffect, useState} from "react";
import {PaystackButton} from "react-paystack";
import {useNavigate} from "react-router-dom";
import {OutstandingPaymentContext} from "../contexts/OutstandingPaymentContext";
import axiosInstance from "../utils/axios";
import Modal from "../components/Modal";
import littleRockLogo from "../assets/svg/littleRockLogoNoBg.svg";
import backSvg from "../assets/svg/back-svgrepo-com.svg";

const OutstandingPaymentConfirmation = () => {
  const {paymentDetails} = useContext(OutstandingPaymentContext)!;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payCustomPrice, setPayCustomPrice] = useState(false);
  const [selectedPercentage, setSelectedPercentage] = useState(100); // Default to 100%

  useEffect(() => {
    if (!paymentDetails) {
      navigate("/new-payment");
    }
  }, [navigate, paymentDetails]);

  if (!paymentDetails) return <div>Loading...</div>;

  const handleSuccess = async () => {
    try {
      const apiResponse = await axiosInstance.post("/payments/make-payment", {
        email: paymentDetails.email,
        amountPaid: !payCustomPrice
          ? paymentDetails.amountOwed
          : (paymentDetails.amountOwed * selectedPercentage) / 100,
      });
      console.log("Payment recorded:", apiResponse.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error recording payment:", error);
      alert(
        "Payment was successful, but there was an error recording it. Please contact support."
      );
    }
  };

  const componentProps = {
    email: paymentDetails.email,
    amount: !payCustomPrice
      ? paymentDetails.amountOwed * 100
      : ((paymentDetails.amountOwed * selectedPercentage) / 100) * 100,
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "name",
          value: `${paymentDetails.parentFirstName} ${paymentDetails.parentLastName}`,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone",
          value: paymentDetails.phoneNumber,
        },
        {
          display_name: "Branch Location",
          variable_name: "branch",
          value: paymentDetails.branchLocation,
        },
      ],
    },
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    text: "Pay School Fees",
    onSuccess: handleSuccess,
    onClose: () => alert("You are about to cancel your payment"),
  };

  return (
    <div className="bg-littleRockBlue-500 py-10 md:py-20 px-3 flex justify-center items-center h-screen">
      <div className="bg-littleRockBlue-600 p-10 lg:w-5/12 ">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-littleRockWhite-500 mb-6"
        >
          <span>
            <img src={backSvg} alt="previous button" className="h-3" />
          </span>
          Back
        </button>
        <div className="flex flex-col justify-center items-center gap-4 mb-10">
          <img
            src={littleRockLogo}
            alt="Little Rock Logo"
            className="h-20 w-20"
          />
          <h1 className=" text-littleRockWhite-500 text-xl font-semibold">
            Please confirm school fees amount
          </h1>
        </div>
        <div className="text-littleRockWhite-500">
          <h1>Amount to be paid:</h1>
          <p className="text-littleRockWhite-500 text-xl font-semibold mb-5">
            Outstanding School Fees: {paymentDetails.amountOwed}
          </p>
          {paymentDetails.amountOwed > 0 ? (
            <>
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
                    onChange={e =>
                      setSelectedPercentage(Number(e.target.value))
                    }
                    className="bg-white text-black rounded p-2"
                  >
                    <option value={25}>25%</option>
                    <option value={50}>50%</option>
                    <option value={75}>75%</option>
                    <option value={100}>100%</option>
                  </select>
                </div>
              )}
              <p className="text-littleRockWhite-500 text-lg font-semibold mb-5">
                Amount to Pay:{" "}
                {payCustomPrice
                  ? (paymentDetails.amountOwed * selectedPercentage) / 100
                  : paymentDetails.amountOwed}
              </p>
              <PaystackButton {...componentProps} />
            </>
          ) : (
            <p className="text-littleRockWhite-500 text-lg font-semibold">
              School fees payment complete
            </p>
          )}
        </div>
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
  );
};

export default OutstandingPaymentConfirmation;
