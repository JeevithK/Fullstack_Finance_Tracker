import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Recordedit = () => {
  const [recdet, setrecdet] = useState({
    description: "",
    amount: "",
    type: "",
    category: "",
    paymentmethod: "",
    date: "",
  });

  const [token, setoken] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checktoken = localStorage.getItem("token");

    if (!checktoken) {
      navigate("/auth/login");
      return;
    }

    setoken(checktoken);

    const fetchdata = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/getrecordbyid/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        setrecdet(res.data);
        console.log(res.data);
      } catch (err) {
        console.log("error fetching data");
      }
    };
    fetchdata();
  }, [id,token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const convertToDDMMYYYY = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const formatteddate = convertToDDMMYYYY(recdet.date);
      setrecdet((prev) => ({ ...prev, date: formatteddate }));

      await axios.put(`http://localhost:5001/editrecord/${id}`, recdet, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Successfully Added expense!");
      setTimeout(() => navigate("/"), 2000);
      console.log("edited");
    } catch (err) {
      toast.error("Error editing expense!");
      console.log("error editing record");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setrecdet((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-md p-6 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-300">
          Edit Record
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              value={recdet.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300"
            >
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={recdet.amount}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300"
            >
              Category
            </label>
            <select
              name="category"
              value={recdet.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Category</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Groceries">Groceries</option>
              <option value="Health & Fitness">Health & Fitness</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Education">Education</option>
              <option value="Savings">Savings</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-300"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              value={recdet.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="paymentmethod"
              className="block text-sm font-medium text-gray-300"
            >
              Payment Method
            </label>
            <select
              name="paymentmethod"
              value={recdet.paymentmethod}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Edit Record
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Recordedit;
