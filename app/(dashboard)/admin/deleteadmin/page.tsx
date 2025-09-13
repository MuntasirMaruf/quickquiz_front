"use client";
import React, { useState } from "react";
import axios from "axios";

const DeleteAdmin = () => {
  const [adminId, setAdminId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!adminId) {
      setMessage("Please enter an Admin ID");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/admin/deleteAdmin/${adminId}`);
      setMessage(response.data.message || "Admin deleted successfully");
    } catch (error: any) {
      console.error(error);
      // Safe access to error.response
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data?.message || "Failed to delete admin");
      } else {
        setMessage("Failed to delete admin");
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Delete Admin</h2>
      <input
        type="number"
        placeholder="Enter Admin ID"
        value={adminId}
        onChange={(e) => setAdminId(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleDelete}
        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Delete Admin
      </button>
      {message && <p className="text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default DeleteAdmin;
