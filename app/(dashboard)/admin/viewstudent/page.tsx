"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Student {
  id: number;
  fullname: string;
  email: string;
  username: string;
}

const ViewStudentPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get<Student[]>('http://localhost:3000/admin/getStudents');
        setStudents(res.data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Students</h1>
      {loading ? (
        <p className="text-center">Loading students...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 flex flex-col space-y-2"
            >
              <p className="font-semibold">ID: {student.id}</p>
              <p className="font-semibold">Name: {student.fullname}</p>
              <p>Email: {student.email}</p>
              <p>Username: {student.username}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewStudentPage;
