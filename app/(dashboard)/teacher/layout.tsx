// app/teacher/layout.tsx
"use client";

import React from "react";
import Link from "next/link";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Teacher Panel</h2>

        <div className="active flex flex-col space-y-3">
          <Link href={`/teacher/{akash}`} className="py-2 px-3 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link href="/registration/teacher" className="py-2 px-3 rounded hover:bg-gray-700">
            Register
          </Link>
           <Link   href="/teacher/assign_exams" className="py-2 px-3 rounded hover:bg-gray-700">
            Assign_Exam
          </Link>
        </div> 
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}