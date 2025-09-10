"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';


export default function LoginPage() {
    const [username, setUsername] = useState<string>('Price');
    const [password, setPassword] = useState<string>('Pa$$w0rd!');
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
                    router.push('/login');
                }
            } catch {
                router.push('/login');
            }
        };
        checkLogin();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const formData = {
            username: username,
            password: password
        };

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                formData,
                { withCredentials: true } // Include cookies in the request
            );
            if (res.data.student) {
                router.push(`/student/${res.data.student.username}/dashboard`);
                alert('Login successful' + res.data.student.fullname);
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="max-w-6xl mx-auto m-6 flex flex-col items-center py-80 bg-gray-800 border-2 border-black rounded-md">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <label>Username : </label>
                <input name="username" id="username" type="text" value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUsername(e.target.value)
                    }
                    placeholder="username"
                />
                <br />
                <label>Password : </label>
                <input name="pasword" id="password" type="password" value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    placeholder="password"
                />
                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}