"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const UpdateStudentPage = () => {
  const params = useParams();
  const username = params.username;

  const [usernameValue, setUsernameValue] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [enrolledProgram, setEnrolledProgram] = useState<number | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (username) fetchStudentData();
  }, [username]);

  const fetchStudentData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/admin/retrieve/${username}`,
        { withCredentials: true }
      );
      const data = res.data;
      const [first, ...rest] = data.fullname.split(" ");
      const last = rest.join(" ");

      setUsernameValue(data.username || "");
      setFirstname(first || "");
      setLastname(last || "");
      setEmail(data.email || "");
      setPhone(data.phone_number || "");
      setDob(data.date_of_birth ? data.date_of_birth.split("T")[0] : "");
      setGender(data.gender || "");
      setAddress(data.address || "");
      setEnrolledProgram(data.enrolled_program || null);
      setPassword(""); // always blank
    } catch (err) {
      console.error(err);
      alert("Failed to fetch student data");
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!usernameValue.trim()) newErrors.username = "Username required.";
    if (!firstname.trim()) newErrors.firstname = "First name required.";
    if (!lastname.trim()) newErrors.lastname = "Last name required.";
    if (!email.trim()) newErrors.email = "Email required.";
    if (!phone.trim()) newErrors.phone = "Phone number required.";
    if (!dob.trim()) newErrors.dob = "Date of birth required.";
    if (!gender.trim()) newErrors.gender = "Please select gender.";
    if (!address.trim()) newErrors.address = "Address required.";
    // password optional, so no error if blank
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Build body; only include password if entered
      const body: any = {
        username: usernameValue,
        fullname: `${firstname} ${lastname}`,
        email,
        phone_number: phone,
        date_of_birth: dob,
        gender,
        address,
        enrolled_program: enrolledProgram,
      };
      if (password.trim()) body.password = password;

      await axios.put(
        `http://localhost:3000/admin/update/${username}`,
        body,
        { withCredentials: true }
      );
      alert("Student updated successfully");
      setPassword(""); // clear password field after update
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update student");
    }
  };

  if (!username) return <p>Loading...</p>;

  return (
    <div className="flex justify-center p-4 bg-gray-100 w-full h-full">
      <form
        className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col space-y-4"
        onSubmit={handleUpdateStudent}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Student Details</h2>

        <input
          type="text"
          placeholder="Username"
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}

        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
        />
        {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}

        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
        />
        {errors.lastname && <p className="text-red-500">{errors.lastname}</p>}

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
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
        />
        {errors.dob && <p className="text-red-500">{errors.dob}</p>}

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
          Update Student
        </button>
      </form>
    </div>
  );
};

export default UpdateStudentPage;
