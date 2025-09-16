"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Teacher = {
  id: number;
  fullname: string;
  email: string;
};

const TeacherList = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/getTeachersu"); // Adjust endpoint
      setTeachers(res.data);
    } catch (err) {
      console.error("Failed to fetch teachers:", err);
    }
  };

  const handleClick = (id: number) => {
    router.push(`/admin/updateteacher/${id}`);
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gray-100 rounded shadow space-y-2">
      <h2 className="text-xl font-bold mb-4">Teachers List</h2>
      {teachers.length === 0 && <p>No teachers found.</p>}
      <ul>
        {teachers.map((teacher) => (
          <li
  key={teacher.id}
  className="cursor-pointer text-blue-600 hover:underline"
  onClick={() => handleClick(teacher.id)}
>
  {teacher.fullname} ({teacher.id})
</li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherList;
