"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Admin = {
  id: number;
  fullname: string;
  email: string;
};

const AdminList = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/getAdminsforup"); // ✅ Adjust endpoint
      setAdmins(res.data);
    } catch (err) {
      console.error("Failed to fetch admins:", err);
    }
  };

  const handleClick = (id: number) => {
    router.push(`/admin/updateadmin/${id}`);
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-100 rounded shadow space-y-2">
      <h2 className="text-xl font-bold mb-4">Admins List</h2>
      {admins.length === 0 && <p>No admins found.</p>}
      <ul>
        {admins.map((admin) => (
          <li
            key={admin.id}
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => handleClick(admin.id)}
          >
            {admin.fullname} ({admin.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;
