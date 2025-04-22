import React, { useState, useEffect } from "react";
import Recordform from "../components/recordform";
import Recordlist from "../components/recordlist";
import Recordchart from "../components/recordchart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [records, setrecords] = useState([]);
  const navigate = useNavigate();
  const [name, setname] = useState("");

  const fetchRecords = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5001/getallrecord", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setrecords(res.data.allrecord);
      setname(res.data.name);
    } catch (error) {
      console.error("Unauthorized or error fetching records:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/auth/login");
      }
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const total = records.reduce((sum, record) => sum + Number(record.amount), 0);

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 text-gray-100">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-pink-400">
            Expense Tracker {name}
          </h1>
          <h2 className="mt-2 text-xl text-purple-300">
            Total Expenses: ₹ {total}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
            <Recordchart records={records} />
          </div>

          <div className="flex-1 bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
            <Recordform fetchRecords={fetchRecords} />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
          <Recordlist records={records} fetchRecords={fetchRecords} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
