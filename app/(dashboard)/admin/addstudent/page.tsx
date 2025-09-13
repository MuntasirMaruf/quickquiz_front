"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const AddStudentPage = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState(""); // new state
  const [address, setAddress] = useState("");
  const [program, setProgram] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error states
  const [usernameError, setUsernameError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dobError, setDobError] = useState("");
  const [genderError, setGenderError] = useState(""); // new error state
  const [addressError, setAddressError] = useState("");
  const [programError, setProgramError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function validateForm() {
    let valid = true;

    setUsernameError("");
    setFirstnameError("");
    setLastnameError("");
    setEmailError("");
    setPhoneError("");
    setDobError("");
    setGenderError("");
    setAddressError("");
    setProgramError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01\d{9}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!username.trim()) {
      setUsernameError("Username required.");
      valid = false;
    } else if (!usernameRegex.test(username)) {
      setUsernameError(
        "Username must be 3-20 characters, letters, numbers, underscores."
      );
      valid = false;
    }

    if (!firstname.trim()) {
      setFirstnameError("First name required.");
      valid = false;
    }

    if (!lastname.trim()) {
      setLastnameError("Last name required.");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Email required.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
      valid = false;
    }

    if (!phone.trim()) {
      setPhoneError("Phone number required.");
      valid = false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError("Enter a valid 11-digit phone number.");
      valid = false;
    }

    if (!dob.trim()) {
      setDobError("Date of birth required.");
      valid = false;
    } else {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 13) {
        setDobError("Student must be at least 13 years old.");
        valid = false;
      }
    }

    if (!gender) {
      setGenderError("Please select a gender.");
      valid = false;
    }

    if (!address.trim()) {
      setAddressError("Address required.");
      valid = false;
    }

    if (!program) {
      setProgramError("Please select a program.");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password required.");
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be 8+ characters, include uppercase, lowercase, number, special char."
      );
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }

    return valid;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = {
      username,
      fullname: `${firstname} ${lastname}`,
      email,
      phone_number: phone,
      date_of_birth: dob,
      gender, // ✅ include gender
      address,
      password,
      enrolled_program: parseInt(program),
    };

    try {
      const res = await axios.post(
        `http://localhost:3000/admin/addStudent`,
        formData
      );
      alert("Student added successfully.");

      setUsername("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setPhone("");
      setDob("");
      setGender("");
      setAddress("");
      setProgram("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error adding student:", error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        alert("Failed to add student: " + message);
      } else {
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto m-6 flex flex-col items-center py-20 bg-gray-800 border-2 border-black rounded-md">
      <h3 className="text-3xl font-bold mb-8 text-white">Add Student</h3>

      <form
        className="flex flex-col space-y-4 w-full max-w-lg px-4 sm:px-6 md:px-0"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {usernameError && <p className="text-red-500">{usernameError}</p>}

        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {firstnameError && <p className="text-red-500">{firstnameError}</p>}

        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {lastnameError && <p className="text-red-500">{lastnameError}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {phoneError && <p className="text-red-500">{phoneError}</p>}

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {dobError && <p className="text-red-500">{dobError}</p>}

        {/* Gender Select */}
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {genderError && <p className="text-red-500">{genderError}</p>}

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {addressError && <p className="text-red-500">{addressError}</p>}

        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Program</option>
          <option value="1">SSC Preparation</option>
          <option value="2">HSC Preparation</option>
          <option value="3">Engineering Preparation</option>
          <option value="4">Medical Preparation</option>
        </select>
        {programError && <p className="text-red-500">{programError}</p>}

        <div className="flex space-x-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-white"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {passwordError && <p className="text-red-500">{passwordError}</p>}

        <div className="flex space-x-1">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-400 hover:text-white"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {confirmPasswordError && (
          <p className="text-red-500">{confirmPasswordError}</p>
        )}

        <div className="flex justify-center space-x-6 mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Add Student
          </button>
          <Link
            href="/admin"
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddStudentPage;
