"use client";

import { useState } from "react";
import axios from "axios";
import Button from "@/app/components/teacher/Button";

export default function AddTeacherPage() {
    const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [salary, setSalary] = useState<string>("");

    const [error, setError] = useState("");

    const validate = () => {
        if (!username) return "Username is required.";
        if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Username must contain only letters, numbers, and underscores.";
        if (username.length > 100) return "Username must not exceed 100 characters.";

        if (!fullName) return "Full name is required.";
        if (!/^[A-Za-z ]+$/.test(fullName)) return "Full name must contain only letters and spaces.";

        if (!email) return "Email is required.";
        if (email.length > 200) return "Email must not exceed 200 characters.";
        const basicEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!basicEmail.test(email)) return "Please enter a valid email address.";

        if (!phoneNumber) return "Phone number is required.";
        if (!/^01\d{9}$/.test(phoneNumber)) return "Invalid phone number.";

        if (!dateOfBirth) return "Date of birth is required.";

        if (!/^(Male|Female|Others)$/.test(gender)) return "Gender must be Male/Female/Others.";

        if (address.length > 300) return "Address must not exceed 300 characters.";

        if (!password) return "Password is required.";
        if (password.length < 6) return "Password must be at least 6 characters.";
        if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter.";

        if (!/^\d+(\.\d+)?$/.test(salary)) return "Salary must be a valid non-negative number.";

        return "";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const msg = validate();
        if (msg) {
            setError(msg);
            return;
        }

        try {
            const data = {
                username: username,
                fullname: fullName,
                email: email,
                phone_number: phoneNumber,
                date_of_birth: new Date(dateOfBirth), // send as Date
                gender: gender,
                address: address,
                password: password,
                salary: Number(salary), // convert to number
            };

            await axios.post("http://localhost:3000/admin/addteacher", data, {
                headers: { "Content-Type": "application/json" },
            });

            alert("Teacher added successfully ");

            // reset form
            setUsername("");
            setFullName("");
            setEmail("");
            setPhoneNumber("");
            setDateOfBirth("");
            setGender("");
            setAddress("");
            setPassword("");
            setSalary("");

        } catch (error) {
            console.error("Error adding teacher:", error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                alert("Failed to add teacher: " + errorMessage);
            } else {
                alert("Something went wrong! Please try again.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-6 p-4 rounded bg-black text-white">
            <h2 className="text-xl font-semibold mb-3">Add Teacher</h2>
            <div className="h-4">{error && <p className="mb-3 text-sm text-red-600">{error}</p>}</div>

            <form onSubmit={handleSubmit} className="space-y-2">
                <input className="w-full p-2 border rounded bg-gray-800 text-white" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className="w-full p-2 border rounded bg-gray-800 text-white" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <input type="email" className="w-full p-2 border rounded bg-gray-800 text-white" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="w-full p-2 border rounded bg-gray-800 text-white" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <input type="date" className="w-full p-2 border rounded bg-gray-800 text-white" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                <select className="w-full p-2 border rounded bg-gray-800 text-white" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
                <textarea className="w-full p-2 border rounded bg-gray-800 text-white" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input type="password" className="w-full p-2 border rounded bg-gray-800 text-white" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" className="w-full p-2 border rounded bg-gray-800 text-white" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                <Button type="submit">Add Teacher</Button>
            </form>
        </div>
    );
}
