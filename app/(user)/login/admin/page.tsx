"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";   
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const router = useRouter();
  const [id, setId] = useState("");               
  const [pass, setPass] = useState("");          
  const [showPassword, setShowPassword] = useState(false);

  const [idError, setIdError] = useState("");
  const [passError, setPassError] = useState("");

  function validateForm() {
    let valid = true;
    setIdError("");
    setPassError("");

    if (!id.trim()) {
      setIdError("ID required.");
      valid = false;
    }

    if (!pass) {
      setPassError("Password required.");
      valid = false;
    }

    return valid;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:3000/admin/loginAdmin", {
        id,      
        pass,     
      });

      if (res.data?.message === "User not found") {
        alert("Login failed: User not found");
        return;
      }

      alert("Login successful!");
      router.push("/admin");  // redirect after login

      setId("");
      setPass("");
    } catch (error) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.message;
        alert("Login failed: " + errorMessage);
      } else {
        alert("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto m-6 flex flex-col items-center py-20 bg-gray-800 border-2 border-black rounded-md">
      <h3 className="text-3xl font-bold mb-8 text-white">Admin Login</h3>

      <form
        className="flex flex-col space-y-4 w-full max-w-md px-4 sm:px-6 md:px-0"
        onSubmit={handleLogin}
        noValidate
      >
        {/* ID Field */}
        <input
          id="id"
          name="id"
          type="text"
          placeholder="Enter your ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {idError && <p className="text-red-500">{idError}</p>}

        {/* Password Field */}
        <div className="relative w-full">
  <input
    id="pass"
    name="pass"
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    value={pass}
    onChange={(e) => setPass(e.target.value)}
    className="w-full px-4 py-3 pr-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>

        {passError && <p className="text-red-500">{passError}</p>}

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-blue-400 hover:text-blue-600 text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Login
          </button>
          <Link
            href="/registration/admin"
            className="px-6 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
