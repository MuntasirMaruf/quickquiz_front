"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Button from "@/app/components/teacher/Button";

export default function Page() {
  const router = useRouter();
  const { username } = useParams<{ username: string }>();


  if (!username) return null;

  // state
  const [id, setId] = useState<number | null>(null);
  const [user_name, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [displayPicture, setDisplayPicture] = useState<File | null>(null);
  const [salary, setSalary] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(`${base}/teacher/byusername/${username}`);
        const data = res.data;
        alert(data.username)

        setId(data.id ?? null);
        setUsername(data.username ?? "");
        setFullName(data.fullname ?? "");
        setEmail(data.email ?? "");
        setPhoneNumber(data.phone_number ?? "");
        setDateOfBirth(data.date_of_birth ? data.date_of_birth.split("T")[0] : "");
        setGender(data.gender ?? "");
        setAddress(data.address ?? "")
        setPassword("");
      } catch (err) {
        console.error(err);
        setError("Failed to load teacher data.");
      }
    };

    fetchData();
  }, [username]);

  const handleDelete = async () => {
    try {
      alert(id)
      const base = process.env.NEXT_PUBLIC_API_URL;
      const res = await axios.delete(`${base}/teacher/delete/${id}`);
      alert("deleted")
      router.push("/login/teacher");
    } catch (err) {
      console.error(err);
      setError("Failed to load teacher data.");
    }
  };


  // validation
  const validate = () => {
    if (!user_name) return "Username is required.";
    if (!/^[a-zA-Z0-9_]+$/.test(user_name))
      return "Username must contain only letters, numbers, and underscores.";

    if (!fullName) return "Full name is required.";
    if (!/^[A-Za-z ]+$/.test(fullName))
      return "Name must contain letters and spaces only.";

    if (!email) return "Email is required.";
    if (email.length > 200) return "Email must not exceed 200 characters.";
    const basicEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmail.test(email)) return "Please enter a valid email address.";

    if (!phoneNumber) return "Phone number is required.";
    if (!/^01\d{9}$/.test(phoneNumber)) return "Invalid phone number.";

    if (!dateOfBirth) return "Date of birth is required.";

    if (!/^(Male|Female|Others)$/.test(gender))
      return "Gender must be Male/Female/Others.";

    if (address.length > 300) return "Address must not exceed 300 characters.";

    // Make password optional for updates (when id exists).
    if (!id && !password) return "Password is required.";
    if (password) {
      if (password.length < 6) return "Password must be at least 6 characters.";
      if (!/(?=.*[a-z])/.test(password))
        return "Password must contain at least one lowercase letter.";
    }

    if (!salary) return "Salary is required.";
    if (!/^\d+(\.\d+)?$/.test(salary))
      return "Salary must be a valid non-negative number.";

    return "";
  };

  // submit (update existing teacher)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    try {
      const base = process.env.NEXT_PUBLIC_API_URL;

      const payload: Record<string, unknown> = {
        username: user_name,
        fullname: fullName,
        email,
        phone_number: phoneNumber,
        date_of_birth: dateOfBirth,
        gender,
        address,
        salary,
      };

      // Only include password if user provided a new one
      if (password) payload.password = password;

      if (id == null) {
        // create
        await axios.post(`${base}/teacher/create`, payload);
        alert("Registration successful");
      } else {
        // update
        await axios.put(`${base}/teacher/update/${id}`, payload);
        alert("Update successful");
      }

      router.push(`/teacher/${username}/profile`);
    } catch (err) {
      console.error("Error submitting form:", err);
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        alert("Request failed: " + errorMessage);
      } else {
        setError("Something went wrong. Please try again.");
        alert("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 border p-4 rounded">
      <h2 className="text-xl font-semibold mb-3">Teacher {id ? "Update" : "Registration"}</h2>
      <div className="h-4">{error && <p className="mb-3 text-sm text-red-600">{error}</p>}</div>

      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={user_name}
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
          placeholder={id ? "New Password (optional)" : "Password"}
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

        <div className="flex gap-2">
          <Button type="submit">{id ? "Update" : "Register"}</Button>
        </div>
      </form>
      <div className="flex gap-2">
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  );
}
