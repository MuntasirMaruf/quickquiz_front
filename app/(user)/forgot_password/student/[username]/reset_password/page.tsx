"use client";

import Link from "next/link";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type pageProps = {
    params: Promise<{ username: string }>;
};

export default function ForgotPassword({ params }: pageProps) {
    const { username } = use(params);
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    // ✅ New function to reset password
    const resetPassword = async () => {
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/student/reset_password/${username}`,
                { password },
                { withCredentials: true }
            );

            if (response.data.success) {
                setError("");
                setSuccess("Password updated successfully.");

                setTimeout(() => {
                    router.push("/login/student");
                }, 2000);
            } else {
                setError(response.data.message || "Failed to reset password.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character."
            );
            setSuccess("");
            return;
        }

        if (password !== confirm_password) {
            setError("Passwords did not match.");
            setSuccess("");
            return;
        }

        resetPassword(); // ✅ Call backend only if validation passes
    };

    return (
        <div className="max-w-6xl mx-auto m-6 flex flex-col items-center py-50 bg-gray-800 border-2 border-black rounded-md">
            <h3 className="text-4xl font-bold mb-8 text-white">Reset Password</h3>

            <form className="flex flex-col space-y-4 w-80" noValidate>
                <input
                    name="password"
                    type="password"
                    placeholder="Type a new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    name="confirm_password"
                    type="password"
                    placeholder="Retype the password"
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <div className="flex justify-center px-4 mt-6">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Confirm
                    </button>
                </div>
            </form>

            <div className="flex space-x-6 mt-6">
                <Link
                    href="/login/student"
                    className="px-5 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
                >
                    Back to Login
                </Link>
                <Link
                    href="/registration/student"
                    className="px-10 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                    Register
                </Link>
            </div>
        </div>
    );
}
