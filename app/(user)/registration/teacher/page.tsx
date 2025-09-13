"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/app/components/teacher/Button";

export default function RegistrationPage() {
    const router = useRouter();

    // individual fields
    const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [displayPicture, setDisplayPicture] = useState<File | null>(null);
    const [salary, setSalary] = useState<string>("");

    const [error, setError] = useState("");
    

    // 🔎 validation 
    const validate = () => {
        if (!username) return "Username is required.";
        if (!/^[a-zA-Z0-9_]+$/.test(username))
            return "Username must contain only letters, numbers, and underscores.";

        if (!fullName) return "Full name is required.";
        if (!/^[A-Za-z ]+$/.test(fullName))
            return "Name must contain letters and spaces only.";

        if (!email) return "Email is required.";
        if (email.length > 200) return "Email must not exceed 200 characters.";
        // (Optional) keep email format basic check
        const basicEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!basicEmail.test(email)) return "Please enter a valid email address.";

        if (!phoneNumber) return "Phone number is required.";
        if (!/^01\d{9}$/.test(phoneNumber)) return "Invalid phone number.";

        if (!dateOfBirth) return "Date of birth is required.";

        if (!/^(Male|Female|Others)$/.test(gender))
            return "Gender must be Male/Female/Others.";

        if (address.length > 300)
            return "Address must not exceed 300 characters.";

        if (!password) return "Password is required.";
        if (password.length < 6)
            return "Password must be at least 6 characters.";
        if (!/(?=.*[a-z])/.test(password))
            return "Password must contain at least one lowercase letter.";

        if (!/^\d+(\.\d+)?$/.test(salary))
            return "Salary must be a valid non-negative number.";


        // display picture optional
        // if (!displayPicture) return "Display picture is required.";

        return "";


    };

    // 🔎 submit
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
                date_of_birth: dateOfBirth,
                gender: gender,
                address: address,
                password: password,
                salary:salary

            }
            const res = await axios.post(
                'http://localhost:3000/teacher/register',
                data
            );
            alert("Registration successful");


        } catch (error) {
            console.error("Error submitting form:", error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                alert("Registration failed: " + errorMessage);
            } else {
                alert("Something went wrong! Please try again.");
            }
        }
        router.push("/login");
       
    };

    return (
        <div className="max-w-md mx-auto mt-6 border p-4 rounded">
            <h2 className="text-xl font-semibold mb-3">Teacher Registration</h2>
            <div className="h-4">
                {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <input
                    name="fullName"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <input
                    name="phone_number"
                    placeholder="Phone Number (e.g., 01XXXXXXXXX)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <input
                    type="date"
                    name="date_of_birth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border p-2 mb-2"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>

                <textarea
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <input
                    type="file"
                    name="display_picture"
                    accept="image/*"
                    onChange={(e) => setDisplayPicture(e.target.files?.[0] || null)}
                    className="w-full border p-2 mb-2"
                />
                <input
                    type="text"
                    name="salary"
                    placeholder="Salary (e.g., 50000)"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <Button type="submit">Register</Button>

            </form>
        </div>
    );
}