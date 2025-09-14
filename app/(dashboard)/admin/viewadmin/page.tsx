"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Admin {
  id: number;
  fullname: string;
  email: string;
  username: string;
  display_picture?: string;
}

const ViewAdminPage = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionChecked, setSessionChecked] = useState(false);//here
  const router = useRouter();

  // Check session immediately on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/check-session", { withCredentials: true });
        if (!res.data.loggedIn) {
          localStorage.removeItem("adminId");
          router.push("/login/admin");
        } else {
          setSessionChecked(true); // session valid, allow fetching admins
        }
      } catch (err) {
        localStorage.removeItem("adminId");
        router.push("/login/admin");
      }
    };

    checkSession();
  }, [router]);

  // Fetch admins only after session is verified
  useEffect(() => {
    if (!sessionChecked) return;

    const fetchAdmins = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/getAdmin");
        setAdmins(res.data);
      } catch (error) {
        console.error("Failed to fetch admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [sessionChecked]);

  // Optional: keep session alive with interval
  useEffect(() => {
    if (!sessionChecked) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/check-session", { withCredentials: true });
        if (!res.data.loggedIn) {
          localStorage.removeItem("adminId");
          router.push("/login/admin");
        }
      } catch (err) {
        localStorage.removeItem("adminId");
        router.push("/login/admin");
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [router, sessionChecked]);

  if (!sessionChecked) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Admins</h1>

      {loading ? (
        <p className="text-center">Loading admins...</p>
      ) : admins.length === 0 ? (
        <p className="text-center">No admins found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 flex items-center space-x-4"
            >
              <img
                src={
                  admin.display_picture
                    ? `http://localhost:3000/admin/getimage/${admin.display_picture}`
                    : "/images/Admin-Profile-Vector-PNG-Image.png"
                }
                alt={admin.fullname}
                className="w-16 h-16 rounded-full border border-gray-600"
              />
              <div>
                <p className="font-semibold">ID: {admin.id}</p>
                <p className="font-semibold">Name: {admin.fullname}</p>
                <p>Email: {admin.email}</p>
                <p>Username: {admin.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAdminPage;
