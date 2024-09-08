import React, {useEffect, useState} from "react";
import axiosInstance from "../utils/axios";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import littleRockLogo from "../assets/svg/littleRockLogoNoBg.svg";
import {capitalizeFirstLetter} from "../utils/stringUtils";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

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

interface Totals {
  totalOwed: number;
  totalPaid: number;
  totalFees: number;
}

const AdminDashboard = () => {
  const {token, logout} = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [totals, setTotals] = useState<Totals>({
    totalOwed: 0,
    totalPaid: 0,
    totalFees: 0,
  });
  const [branchTotals, setBranchTotals] = useState<Record<string, Totals>>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get("/payments/get-all-payments", {
          headers: {Authorization: `Bearer ${token}`},
        });
        setPayments(response.data);
        setFilteredPayments(response.data);
        calculateTotals(response.data);
      } catch (error) {
        console.error("Error fetching payments", error);
      }
    };

    fetchPayments();
  }, [token]);

  const calculateTotals = (data: Payment[]) => {
    const totals: Totals = {totalOwed: 0, totalPaid: 0, totalFees: 0};
    const branchTotals: Record<string, Totals> = {};

    data.forEach(payment => {
      totals.totalOwed += payment.amountOwed;
      totals.totalPaid += payment.amountPaid;
      totals.totalFees += payment.totalSchoolFees;

      if (!branchTotals[payment.branchLocation]) {
        branchTotals[payment.branchLocation] = {
          totalOwed: 0,
          totalPaid: 0,
          totalFees: 0,
        };
      }
      branchTotals[payment.branchLocation].totalOwed += payment.amountOwed;
      branchTotals[payment.branchLocation].totalPaid += payment.amountPaid;
      branchTotals[payment.branchLocation].totalFees += payment.totalSchoolFees;
    });

    setTotals(totals);
    setBranchTotals(branchTotals);
  };

  useEffect(() => {
    if (branchFilter === "all") {
      setFilteredPayments(payments);
    } else {
      setFilteredPayments(
        payments.filter(payment => payment.branchLocation === branchFilter)
      );
    }
  }, [branchFilter, payments]);

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/payments/delete-payment/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      const updatedPayments = payments.filter(payment => payment.id !== id);
      setPayments(updatedPayments);
      setFilteredPayments(
        updatedPayments.filter(
          payment =>
            branchFilter === "all" || payment.branchLocation === branchFilter
        )
      );
      calculateTotals(updatedPayments);
    } catch (error) {
      console.error("Error deleting payment", error);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const bounceTransition = {
    repeat: Infinity, // Keep the animation repeating
    repeatType: "reverse" as const, // Makes it bounce back and forth
    duration: 0.6, // Adjust duration to control speed
    ease: "easeInOut", // Smooth easing for the bounce effect
  };

  const handleDeleteClick = (id: number) => {
    setPaymentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (paymentToDelete) {
      try {
        await axiosInstance.delete(
          `/payments/delete-payment/${paymentToDelete}`,
          {
            headers: {Authorization: `Bearer ${token}`},
          }
        );
        const updatedPayments = payments.filter(
          payment => payment.id !== paymentToDelete
        );
        setPayments(updatedPayments);
        setFilteredPayments(
          updatedPayments.filter(
            payment =>
              branchFilter === "all" || payment.branchLocation === branchFilter
          )
        );
        calculateTotals(updatedPayments);
      } catch (error) {
        console.error("Error deleting payment", error);
      }
    }
    setIsDeleteModalOpen(false);
    setPaymentToDelete(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between p-4">
        {/* logo and header */}
        <div className="flex justify-center items-center gap-4 mb-10">
          <motion.img
            src={littleRockLogo}
            alt="Little Rock Logo"
            className="h-20 w-20"
            animate={{y: ["0%", "-20%"]}} // Moves up and down by 20% of its own height
            transition={bounceTransition}
          />
        </div>

        <h1 className="text-2xl font-bold mb-4">
          Little Rock International Schools Admin Dashboard
        </h1>

        {/* logout button */}
        <div>
          <button
            onClick={logout}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* filter dropwdown */}
      <div className="mb-4">
        <label htmlFor="branchFilter" className="mr-2">
          Filter by Branch:
        </label>
        <select
          id="branchFilter"
          value={branchFilter}
          onChange={e => setBranchFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All Branches</option>
          <option value="lagos">Lagos</option>
          <option value="owerri">Owerri</option>
          <option value="abuja">Abuja</option>
        </select>
      </div>

      {/* totals display */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Overall Totals:</h2>
        <p>Total Amount Owed: {formatCurrency(totals.totalOwed)}</p>
        <p>Total Amount Paid: {formatCurrency(totals.totalPaid)}</p>
        <p>Total Fees Expected: {formatCurrency(totals.totalFees)}</p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Branch Totals:</h3>
        <div className="flex flex-col md:flex-row gap-3 md:gap-16">
          {Object.entries(branchTotals).map(([branch, branchTotal]) => (
            <div key={branch} className="mb-2">
              <h4 className="font-medium text-xl">
                {capitalizeFirstLetter(branch)}:
              </h4>
              <p>Amount Owed: {formatCurrency(branchTotal.totalOwed)}</p>
              <p>Amount Paid: {formatCurrency(branchTotal.totalPaid)}</p>
              <p>
                Total Fees Expected: {formatCurrency(branchTotal.totalFees)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* payments table  */}
      <div className="overflow-auto">
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
            {filteredPayments.map(payment => (
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
                <td className="border px-4 py-2">
                  {capitalizeFirstLetter(payment.branchLocation)}
                </td>
                <td className="border px-4 py-2">
                  {formatCurrency(payment.totalSchoolFees)}
                </td>
                <td className="border px-4 py-2">
                  {formatCurrency(payment.amountPaid)}
                </td>
                <td className="border px-4 py-2">
                  {formatCurrency(payment.amountOwed)}
                </td>
                <td className="border px-4 py-2">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(payment.updatedAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2 flex gap-3">
                  <button
                    onClick={() => handleDeleteClick(payment.id)}
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

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default AdminDashboard;
