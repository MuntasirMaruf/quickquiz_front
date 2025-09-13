"use client";
import React, { useState } from "react";
import axios from "axios";

const DeleteStudent = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setMessage("Please enter a Student Username");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.delete(
        `http://localhost:3000/admin/deleteStudent/${trimmedUsername}`
      );
      setMessage(response.data.message || "Student deleted successfully");
      setUsername(""); // Clear input after deletion
    } catch (error: any) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data?.message || "Failed to delete student");
      } else {
        setMessage("Failed to delete student");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Delete Student</h2>

      <input
        type="text"
        placeholder="Enter Student Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        disabled={loading}
      />

      <button
        onClick={handleDelete}
        className={`w-full p-2 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
        }`}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Student"}
      </button>

      {message && <p className="text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default DeleteStudent;
