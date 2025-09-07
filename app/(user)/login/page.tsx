"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function LoginPage() {
    const [username, setUsername] = useState<string>('akash');
    const [password, setPassword] = useState<string>('111111');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        console.log('Login attempt:', { username, password });

        router.push('/teacher');
    };

    return (
        <div className="max-w-6xl mx-auto m-6 flex flex-col items-center py-80 bg-gray-800 border-2 border-black rounded-md">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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

                <button type="submit">LOG IN</button>
                <br />
                <p>Don't have an account? <Link href="/register">Register</Link></p>
                <br />
                <div>
                    <p>Forgot Password? <Link href="/forgot_password"> Forgot_Password</Link></p>
                </div>
            </form>
        </div>
    );
}