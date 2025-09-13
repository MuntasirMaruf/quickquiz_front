"use client";
import React, { useState } from "react";
import axios from "axios";

const DeleteTeacher = () => {
  const [teacherId, setTeacherId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const id = teacherId.trim();
    if (!id) {
      setMessage("Please enter a Teacher ID");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/admin/deleteTeacher/${id}`);
      setMessage(response.data.message || "Teacher deleted successfully");
    } catch (error: any) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data?.message || "Failed to delete teacher");
      } else {
        setMessage("Failed to delete teacher");
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Delete Teacher</h2>
      <input
        type="number"
        placeholder="Enter Teacher ID"
        value={teacherId}
        onChange={(e) => setTeacherId(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleDelete}
        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Delete Teacher
      </button>
      {message && <p className="text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default DeleteTeacher;
