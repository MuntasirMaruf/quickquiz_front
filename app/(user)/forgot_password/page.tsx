"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp_error, setOtpError] = useState("");
  const [otp_success, setOtpSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const router = useRouter();


  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess("");
      setOtpSent(false);
      return;
    }

    setError("");
    setSuccess("OTP sent successfully.");
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (otp.trim().length === 0) {
      setOtpError("Please enter the OTP.");
      setOtpSuccess("");
      return;
    }

    setOtpError("");
    setOtpSuccess("OTP verified! You can reset your password now.");

    setTimeout(() => {
      router.push("/forgot_password/reset_password");
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto m-6 flex flex-col items-center py-50 bg-gray-800 border-2 border-black rounded-md">
      <h3 className="text-4xl font-bold mb-8 text-white">Forgot Password</h3>

      <form className="flex flex-col space-y-4 w-80" noValidate>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-lg text-white"
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <input
          name="otp"
          type="text"
          placeholder="Enter your OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="px-4 py-3 rounded-lg text-white"
          disabled={!otpSent}
        />
        {otp_error && <p className="text-red-500">{otp_error}</p>}
        {otp_success && <p className="text-green-500">{otp_success}</p>}

        <div className="flex justify-between px-4 mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Send OTP
          </button>
          <button
            type="button"
            onClick={handleVerifyOtp}
            className={`px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition ${!otpSent ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!otpSent}
          >
            Verify OTP
          </button>
        </div>
      </form>

      <div className="flex space-x-6 mt-6">
        <Link
          href="/login"
          className="px-5 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
        >
          Back to Login
        </Link>
        <Link
          href="/registration"
          className="px-10 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
