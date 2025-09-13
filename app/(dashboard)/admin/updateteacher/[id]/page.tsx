"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const UpdateTeacherPage = () => {
  const params = useParams();
  const teacherId = params.id; // Assuming your route is /admin/updateteacher/[id]

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [salary, setSalary] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (teacherId) fetchTeacherData();
  }, [teacherId]);

  const fetchTeacherData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/admin/getTeacher/${teacherId}`,
        { withCredentials: true }
      );
      const data = res.data;

      setUsername(data.username || "");
      setFullName(data.fullname || "");
      setEmail(data.email || "");
      setPhoneNumber(data.phone_number || "");
      setDateOfBirth(data.date_of_birth ? data.date_of_birth.split("T")[0] : "");
      setGender(data.gender || "");
      setAddress(data.address || "");
      setSalary(data.salary?.toString() || "");
      setPassword(""); // always blank
    } catch (err) {
      console.error(err);
      alert("Failed to fetch teacher data");
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!username.trim()) newErrors.username = "Username required.";
    if (!fullName.trim()) newErrors.fullName = "Full name required.";
    if (!email.trim()) newErrors.email = "Email required.";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number required.";
    if (!dateOfBirth.trim()) newErrors.dateOfBirth = "Date of birth required.";
    if (!gender.trim()) newErrors.gender = "Please select gender.";
    if (!address.trim()) newErrors.address = "Address required.";
    if (!/^\d+(\.\d+)?$/.test(salary)) newErrors.salary = "Salary must be a valid number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const body: any = {
        username,
        fullname: fullName,
        email,
        phone_number: phoneNumber,
        date_of_birth: dateOfBirth,
        gender,
        address,
        salary: parseFloat(salary),
      };
      if (password.trim()) body.password = password;

      await axios.put(
        `http://localhost:3000/admin/updateTeacher/${teacherId}`,
        body,
        { withCredentials: true }
      );
      alert("Teacher updated successfully");
      setPassword(""); // clear password
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update teacher");
    }
  };

  if (!teacherId) return <p>Loading...</p>;

  return (
    <div className="flex justify-center p-4 bg-gray-100 w-full h-full">
      <form
        className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col space-y-4"
        onSubmit={handleUpdateTeacher}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Teacher Details</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
        />
        {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
        />
        {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}

        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
        />
        {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth}</p>}

        <div className="flex space-x-4">
          {["Male", "Female", "Others"].map((g) => (
            <label key={g} className="text-white flex items-center space-x-2">
              <input
                type="radio"
                value={g}
                checked={gender === g}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
        {errors.gender && <p className="text-red-500">{errors.gender}</p>}

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
        />
        {errors.address && <p className="text-red-500">{errors.address}</p>}

        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
        />
        {errors.salary && <p className="text-red-500">{errors.salary}</p>}

        <div className="flex items-center space-x-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-white"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Update Teacher
        </button>
      </form>
    </div>
  );
};

export default UpdateTeacherPage;
