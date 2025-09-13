"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      setError("Please enter your username.");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/student/retrieve/${username}`,
        { withCredentials: true }
      );

      if (response.data?.email) {
        setEmail(response.data.email);
        await sendOtp(response.data.email);
      } else {
        setError("No email found for this username.");
      }
    } catch (err) {
      setError("Invalid username.");
    }
  };

  const sendOtp = async (email: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/student/send_otp`,
        { email },
        { withCredentials: true }
      );

      if (response.data.success) {
        setOtpSent(true);
        setSuccess("OTP sent to your email.");
      } else {
        setError("Failed to send OTP.");
      }
    } catch (err) {
      setError("Error sending OTP. Try again.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      setOtpError("Please enter the OTP.");
      setOtpSuccess("");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/student/verify_otp`,
        { email, otp },
        { withCredentials: true }
      );

      if (response.data.verified) {
        setOtpError("");
        setOtpSuccess("OTP verified! Redirecting...");
        setTimeout(() => {
          router.push(`/forgot_password/student/${username}/reset_password`);
        }, 1500);
      } else {
        setOtpError("Invalid OTP. Try again.");
      }
    } catch (err) {
      setOtpError("Verification failed.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto m-6 flex flex-col items-center justify-center py-40 bg-gray-800 border-2 border-black rounded-md shadow-xl">
      <h3 className="text-4xl font-bold mb-10 text-white">Forgot Password</h3>

      <form className="flex flex-col space-y-6 w-96" noValidate>
        <div className="flex flex-col">
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
        </div>

        <div className="flex flex-col">
          <input
            name="otp"
            type="text"
            placeholder="Enter your OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!otpSent}
          />
          {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
          {otpSuccess && (
            <p className="text-green-500 text-sm mt-1">{otpSuccess}</p>
          )}
        </div>

        <div className="flex justify-between gap-4 mt-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
          <button
            type="button"
            onClick={handleVerifyOtp}
            className={`flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition ${!otpSent ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={!otpSent}
          >
            Verify OTP
          </button>
        </div>
      </form>

      <div className="flex space-x-6 mt-8">
        <Link
          href="/login"
          className="px-5 py-3 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
        >
          Back to Login
        </Link>
        <Link
          href="/registration"
          className="px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
