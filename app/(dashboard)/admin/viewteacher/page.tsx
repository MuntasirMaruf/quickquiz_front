"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Teacher {
  id: number;
  fullname: string;
  email: string;
  username: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  salary: number;
  address: string;
  display_picture?: string; // optional if exists
}

const ViewTeacherPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get<Teacher[]>('http://localhost:3000/admin/getAllTeachers');
        setTeachers(res.data);
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Teachers</h1>
      {loading ? (
        <p className="text-center">Loading teachers...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 flex flex-col space-y-2"
            >
              {teacher.display_picture && (
                <img
                  src={`http://localhost:3000/teacher/getimage/${teacher.display_picture}`}
                  alt={teacher.fullname}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                />
              )}
              <p className="font-semibold">ID: {teacher.id}</p>
              <p className="font-semibold">Name: {teacher.fullname}</p>
              <p>Email: {teacher.email}</p>
              <p>Username: {teacher.username}</p>
              <p>Phone: {teacher.phone_number}</p>
              <p>DOB: {new Date(teacher.date_of_birth).toLocaleDateString()}</p>
              <p>Gender: {teacher.gender}</p>
              <p>Salary: {teacher.salary}</p>
              <p>Address: {teacher.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTeacherPage;
