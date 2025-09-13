"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';


export default function StudentLoginPage() {
    const [username, setUsername] = useState('Maruf');
    const [password, setPassword] = useState('Pa$$w0rd!123');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true });
                if (res.data.loggedIn) {
                    setUsername(res.data.student.username);
                    router.push(`/student/${res.data.student.username}/dashboard`);
                } else {
                    router.push('/login/student');
                }
            } catch {
                router.push('/login/student');
            }
        };
        checkLogin();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            username: username,
            password: password
        };

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                formData,
                { withCredentials: true }
            );
            if (res.data.student) {
                router.push(`/student/${res.data.student.username}/dashboard`);
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            alert('Login failed ' + err);
        }
    };

    return (
        <div className="max-w-6xl mx-auto m-6 flex flex-col items-center justify-center py-40 bg-gray-800 border-2 border-black rounded-md shadow-xl">
            <h2 className="text-4xl font-bold text-white mb-10">Student Login</h2>

            <form onSubmit={handleSubmit} className="w-96 flex flex-col space-y-6">

                <div className="flex flex-col">
                    <label htmlFor="username" className="text-gray-300 mb-1">
                        Username
                    </label>
                    <input
                        name="username"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div className="flex flex-col">
                    <label htmlFor="password" className="text-gray-300 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            name="password"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>


                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition duration-200"
                >
                    Login
                </button>


                <div className="mt-4 flex flex-col items-center space-y-2">
                    <Link
                        href="/forgot_password/student"
                        className="text-sm text-blue-400 hover:text-blue-500 underline"
                    >
                        Forgot password?
                    </Link>
                    <Link
                        href="/registration/student"
                        className="text-sm text-blue-400 hover:text-blue-500 underline"
                    >
                        Don't have an account? Register
                    </Link>
                </div>
            </form>
        </div>

    );
}