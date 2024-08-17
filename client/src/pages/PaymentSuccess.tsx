import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const storedDetails = localStorage.getItem("paymentDetails");
      if (storedDetails) {
        const details = JSON.parse(storedDetails);
        try {
          const response = await axios.post(
            "http://localhost:3000/api/payments/get-payment-details",
            {
              email: details.payment.email,
              surname: details.payment.parentLastName,
            }
          );
          setPaymentDetails(response.data);
        } catch (error) {
          console.error("Error fetching payment details:", error);
          alert("Failed to fetch payment details. Please contact support.");
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    fetchPaymentDetails();
  }, [navigate]);

  if (!paymentDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Thank you for your payment.</p>
      <p>Amount Paid: {paymentDetails.amountPaid}</p>
      <p>Total School Fees: {paymentDetails.totalSchoolFees}</p>
      <p>Amount Owed: {paymentDetails.amountOwed}</p>
    </div>
  );
};

export default PaymentSuccess;
