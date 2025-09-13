"use client";
import React from "react";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>

      {/* Admin Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Admin Management</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/viewadmin">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              View Admins
            </button>
          </Link>
          <Link href="/admin/addadmin">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add Admin
            </button>
          </Link>
          <Link href="/admin/updateadmin">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Update Admin
            </button>
          </Link>
          <Link href="/admin/deleteadmin">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete Admin
            </button>
          </Link>
        </div>
      </div>

      {/* Teacher Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Teacher Management</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/viewteacher">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              View Teachers
            </button>
          </Link>
          <Link href="/admin/addteacher">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add Teacher
            </button>
          </Link>
          <Link href="/admin/updateteacher">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Update Teacher
            </button>
          </Link>
          <Link href="/admin/deleteteacher">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete Teacher
            </button>
          </Link>
        </div>
      </div>

      {/* Student Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Student Management</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/viewstudent">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              View Students
            </button>
          </Link>
          <Link href="/admin/addstudent">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add Student
            </button>
          </Link>
          <Link href="/admin/updatestudent">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
              Update Student
            </button>
          </Link>
          <Link href="/admin/deletestudent">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Delete Student
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
