"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Bell } from "lucide-react";

const DashboardPage = () => {
  const router = useRouter();
  const [adminName, setAdminName] = useState("Admin");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [latestNotification, setLatestNotification] = useState<string | null>(null);

  // Fetch logged-in admin
  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (!adminId) return router.push("/login/admin");

    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/admin/getAdminupdate/${adminId}`, { withCredentials: true });
        setAdminName(res.data.fullname || "Admin");

        // Show session message once
        if (res.data.sessionMessage) {
          setNotifications(prev => [res.data.sessionMessage, ...prev]);
          setLatestNotification(res.data.sessionMessage);
          setTimeout(() => setLatestNotification(null), 5000);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("adminId");
        router.push("/login/admin");
      }
    };

    fetchAdmin();
  }, [router]);

  // Auto-logout if session expires
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/check-session", { withCredentials: true });
        if (!res.data.loggedIn) {
          localStorage.removeItem("adminId");
          router.push("/login/admin");
        }
      } catch {
        localStorage.removeItem("adminId");
        router.push("/login/admin");
      }
    }, 5000); // check every 5 seconds

    return () => clearInterval(interval);
  }, [router]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminId");
    router.push("/login/admin");
  };

  // Notification dropdown component
  const NotificationDropdown = () => (
    <div className="absolute right-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 p-3">
      <h2 className="font-bold mb-2">📢 Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-400">No notifications</p>
      ) : (
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {notifications.map((note, idx) => (
            <li key={idx} className="p-2 bg-gray-700 rounded-md text-sm">{note}</li>
          ))}
        </ul>
      )}
      {notifications.length > 0 && (
        <button onClick={() => setNotifications([])} className="mt-2 text-red-400 text-xs hover:underline">
          🗑 Clear All
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-8 relative">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-xl font-semibold">{adminName}</div>
        <div className="flex items-center gap-6 relative">
          {/* Notification Bell */}
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 rounded-full hover:bg-gray-700 relative">
              <Bell size={22} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">{notifications.length}</span>
              )}
            </button>
            {showNotifications && <NotificationDropdown />}
          </div>

          {/* Toast */}
          {latestNotification && (
            <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-slide-in">
              {latestNotification}
            </div>
          )}

          {/* Settings Menu */}
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
              <span>Settings</span>
              <svg className={`w-4 h-4 transform transition-transform ${menuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                <Link href="/admin/changeprofile" className="block px-4 py-2 hover:bg-gray-700 rounded-t-lg">Change Profile</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-b-lg">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Management Sections */}
      {["Admin", "Teacher", "Student"].map((type) => (
        <div key={type} className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">{type} Management</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href={`/admin/view${type.toLowerCase()}`}><button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">View {type}s</button></Link>
            <Link href={`/admin/add${type.toLowerCase()}`}><button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add {type}</button></Link>
            <Link href={`/admin/update${type.toLowerCase()}`}><button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Update {type}</button></Link>
            <Link href={`/admin/delete${type.toLowerCase()}`}><button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete {type}</button></Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
