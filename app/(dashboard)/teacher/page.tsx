import Link from "next/link";

export default function TeacherDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        

        <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Assignments</h2>
          <p className="text-gray-600">Create and grade assignments</p>
          <Link
            href="/teacher/create_assignment"
           className="inline-block mt-3 px-4 py-2 bg-blue-400 text-white rounded-lg "
          >
            Add a new question
          </Link>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Exam</h2>
          <p className="text-gray-600">View your class exam</p>
          <Link
            href="/teacher/create_exam_ssc"
           className="inline-block mt-3 px-4 py-2 bg-blue-400 text-white rounded-lg "
          >
            Create Exam
          </Link>
        </div>
         <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Add Ssc Question</h2>
          <p className="text-gray-600">Question Added CQ for SSC</p>
          <Link
            href="/teacher/add_ssc_question_cq"
           className="inline-block mt-3 px-4 py-2 bg-blue-400 text-white rounded-lg "
          >
            Create Exam
          </Link>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Exam Time</h2>
          <p className="text-gray-600">Exam day</p>
          <Link
            href="/teacher/exam_time"
            className="inline-block mt-3 px-4 py-2 bg-blue-400 text-white rounded-lg "
          >
            View Messages
          </Link>
        </div>
      </div>
    </div>
  );
}
