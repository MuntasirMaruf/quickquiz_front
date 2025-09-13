"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Student = {
  id: number;
  username: string;
  fullname: string;
};

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/getStudentbyName"); // fixed
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  const handleClick = (username: string) => {
    router.push(`/admin/updatestudent/${username}`);
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-100 rounded shadow space-y-2">
      <h2 className="text-xl font-bold mb-4">Students List</h2>
      {students.length === 0 && <p>No students found.</p>}
      <ul>
        {students.map((student) => (
          <li
            key={student.id}
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => handleClick(student.username)}
          >
            {student.fullname} ({student.username})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
