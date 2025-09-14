"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function TeacherDashboard() {
  const router = useRouter();
  const { username } = useParams();
  if (!username) return null;

  const uname = username; 

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold">Hello {uname}</h3>
      <h1 className="mt-2 text-2xl font-bold">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                   <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
                      <h2 className="text-lg font-semibold">Profile</h2>
                      <p className="text-gray-600">Update Teacher Profile</p>
                   <button
                      onClick={() => router.push(`/teacher/${uname}/profile`)}
                      className="inline-block mt-3 px-4 py-2 bg-blue-400 text-white rounded-lg"
                    >
                      View
                   </button>
                   </div>

        {/* Assignments */}
        <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Assignments</h2>
          <p className="text-gray-600">Create assignments</p>
          {/* <Link
            href="/teacher/create_assignment" 
            className="inline-block mt-3 px-4 py-2 bg-blue-400 text-white rounded-lg"
          >
            Add a new question
          </Link> */}
        </div>

        {/* Exam */}
        <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Exam</h2>
          <p className="text-gray-600">View your class exam</p>
          <Link
            href="/teacher/create_exam_ssc"
            className="inline-block mt-3 px-4 py-2 bg-blue-400 text-white rounded-lg"
          >
            Create Exam
          </Link>
        </div>

        {/* Add SSC Question */}
        <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Add SSC Question</h2>
          <p className="text-gray-600">Question Added CQ for SSC</p>
          <Link
            href="/teacher/add_ssc_question_cq"
            className="inline-block mt-3 px-4 py-2 bg-blue-400 text-white rounded-lg"
          >
            Create Exam
          </Link>
        </div>
         {/* <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Add SSC Question</h2>
          <p className="text-gray-600">Question Added CQ for SSC</p>
          <Link
            href="/teacher/assign_exams"
            className="inline-block mt-3 px-4 py-2 bg-blue-400 text-white rounded-lg"
          >
            Create Exam
          </Link>
        </div> */}
      </div>
    </div>
  );
}
