// src/components/AdminDashboard.tsx
import React, {useEffect, useState} from "react";
import axiosInstance from "../utils/axios";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

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

const AdminDashboard = () => {
  const {token, logout} = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get("/payments/get-all-payments", {
          headers: {Authorization: `Bearer ${token}`},
        });
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments", error);
      }
    };

    fetchPayments();
  }, [token]);

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/payments/delete-payment/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      setPayments(payments.filter(payment => payment.id !== id));
    } catch (error) {
      console.error("Error deleting payment", error);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`); // Navigate to the edit page for the selected payment
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={logout}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
      <table className="w-full border overflow-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Child(ren) Name(s)</th>
            <th className="border px-4 py-2">Child(ren) Class(es)</th>
            <th className="border px-4 py-2">Number of Children</th>
            <th className="border px-4 py-2">Branch Location</th>
            <th className="border px-4 py-2">Total Fees</th>
            <th className="border px-4 py-2">Amount Paid</th>
            <th className="border px-4 py-2">Amount Owing</th>
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Updated At</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td className="border px-4 py-2">{payment.parentFirstName}</td>
              <td className="border px-4 py-2">{payment.parentLastName}</td>
              <td className="border px-4 py-2">{payment.email}</td>
              <td className="border px-4 py-2">{payment.phoneNumber}</td>
              <td className="border px-4 py-2">
                {payment.childrenNames.join(", ")}
              </td>
              <td className="border px-4 py-2">
                {payment.childrenClasses.join(", ")}
              </td>
              <td className="border px-4 py-2">{payment.numberOfChildren}</td>
              <td className="border px-4 py-2">{payment.branchLocation}</td>
              <td className="border px-4 py-2">{payment.totalSchoolFees}</td>
              <td className="border px-4 py-2">{payment.amountPaid}</td>
              <td className="border px-4 py-2">{payment.amountOwed}</td>
              <td className="border px-4 py-2">
                {new Date(payment.createdAt).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                {new Date(payment.updatedAt).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2 flex gap-3">
                <button
                  onClick={() => handleDelete(payment.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(payment.id)}
                  className="px-2 py-1 bg-littleRockBlue-600 text-white rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
