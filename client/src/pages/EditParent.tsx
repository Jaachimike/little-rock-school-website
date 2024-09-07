import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useParams, useNavigate} from "react-router-dom"; // Import useParams and useNavigate hooks
import axiosInstance from "../utils/axios";
import {useAuth} from "../contexts/AuthContext";

interface Payment {
  id: number;
  parentFirstName: string;
  parentLastName: string;
  email: string;
  phoneNumber: string;
  childrenNames: string[];
  childrenClasses: string[];
  numberOfChildren: number;
  branchLocation: string;
  totalSchoolFees: number;
  amountPaid: number;
  amountOwed: number;
  createdAt: string;
  updatedAt: string;
}

const EditParent: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const {token} = useAuth();
  const navigate = useNavigate();

  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const response = await axiosInstance.get(
          `/payments/get-payment/${id}`,
          {
            headers: {Authorization: `Bearer ${token}`},
          }
        );
        setPayment(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment details", error);
      }
    };

    fetchPayment();
  }, [id, token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = e.target;
    if (payment) {
      setPayment({...payment, [name]: value});
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (payment) {
        await axiosInstance.put(`/payments/update-payment/${id}`, payment, {
          headers: {Authorization: `Bearer ${token}`},
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error updating payment", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!payment) {
    return <div>Payment not found</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Link className="underline" to="/dashboard">
        Back to Dashboard
      </Link>
      <h2 className="text-2xl font-bold mb-4">Edit Parent Details</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div></div>
        <input
          type="text"
          name="parentFirstName"
          value={payment.parentFirstName}
          onChange={handleInputChange}
          placeholder="Parent First Name"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="parentLastName"
          value={payment.parentLastName}
          onChange={handleInputChange}
          placeholder="Parent Last Name"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={payment.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="phoneNumber"
          value={payment.phoneNumber}
          onChange={handleInputChange}
          placeholder="Phone Number"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="childrenNames"
          value={payment.childrenNames.join(", ")}
          onChange={e =>
            setPayment({...payment, childrenNames: e.target.value.split(",")})
          }
          placeholder="Children Names"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="childrenClasses"
          value={payment.childrenClasses.join(", ")}
          onChange={e =>
            setPayment({
              ...payment,
              childrenClasses: e.target.value.split(","),
            })
          }
          placeholder="Children Classes"
          className="w-full px-4 py-2 border rounded"
        />
        <select
          name="branchLocation"
          value={payment.branchLocation}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="lagos">Lagos</option>
          <option value="abuja">Abuja</option>
          <option value="owerri">Owerri</option>
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditParent;
