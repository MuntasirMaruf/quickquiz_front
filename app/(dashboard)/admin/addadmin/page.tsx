"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const AddAdminPage = () => {
  const router = useRouter();

  // Form state
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [profilePic, setProfilePic] = useState<File | null>(null);

  // Error state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Debounced uniqueness check
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const { username, email, phone } = form;

        if (username) {
          const res = await axios.post("http://localhost:3000/admin/check-username", { username });
          setErrors(prev => ({ ...prev, username: res.data.exists ? "Username already exists." : "" }));
        }

        if (email) {
          const res = await axios.post("http://localhost:3000/admin/check-email", { email });
          setErrors(prev => ({ ...prev, email: res.data.exists ? "Email already exists." : "" }));
        }

        if (phone) {
          const res = await axios.post("http://localhost:3000/admin/check-phone", { phone_number: phone });
          setErrors(prev => ({ ...prev, phone: res.data.exists ? "Phone number already exists." : "" }));
        }
      } catch (err) {
        console.error("Uniqueness check failed:", err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [form.username, form.email, form.phone]);

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01\d{9}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!form.username.trim()) newErrors.username = "Username required.";
    else if (!usernameRegex.test(form.username)) newErrors.username = "Username must be 3-20 chars and alphanumeric/underscores.";

    if (!form.firstname.trim()) newErrors.firstname = "First name required.";
    if (!form.lastname.trim()) newErrors.lastname = "Last name required.";

    if (!form.email.trim()) newErrors.email = "Email required.";
    else if (!emailRegex.test(form.email)) newErrors.email = "Invalid email address.";

    if (!form.phone.trim()) newErrors.phone = "Phone number required.";
    else if (!phoneRegex.test(form.phone)) newErrors.phone = "Invalid 11-digit phone number.";

    if (!form.dob) newErrors.dob = "Date of Birth required.";
    else {
      const age = new Date().getFullYear() - new Date(form.dob).getFullYear();
      if (age < 25) newErrors.dob = "Admin must be at least 25 years old.";
    }

    if (!form.gender) newErrors.gender = "Please select gender.";
    if (!form.address.trim()) newErrors.address = "Address required.";

    if (!profilePic) newErrors.profilePic = "Profile picture is required.";

    if (!form.password) newErrors.password = "Password required.";
    else if (!passwordRegex.test(form.password)) newErrors.password = "Password must be 8+ chars, include uppercase, lowercase, number, special char.";

    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("fullname", `${form.firstname} ${form.lastname}`);
      formData.append("email", form.email);
      formData.append("phone_number", form.phone);
      formData.append("date_of_birth", form.dob);
      formData.append("gender", form.gender);
      formData.append("address", form.address);
      formData.append("password", form.password);
      if (profilePic) formData.append("profilePic", profilePic);

      await axios.post("http://localhost:3000/admin/addAdminnew", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Admin added successfully!");
      router.push("/admin");

      // Reset form
      setForm({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
      setProfilePic(null);
      setErrors({});
    } catch (err: any) {
      console.error("Error adding admin:", err);
      alert(err?.response?.data?.message || "Failed to add admin. Check console.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto m-6 flex flex-col items-center py-20 bg-gray-800 border-2 border-black rounded-md">
      <h3 className="text-3xl font-bold mb-8 text-white">Add Admin</h3>
      <form className="flex flex-col space-y-4 w-full max-w-lg px-4 sm:px-6 md:px-0" onSubmit={handleSubmit} noValidate>

        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.username && <p className="text-red-500">{errors.username}</p>}

        <input type="text" name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}

        <input type="text" name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.lastname && <p className="text-red-500">{errors.lastname}</p>}

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}

        <input type="date" name="dob" value={form.dob} onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.dob && <p className="text-red-500">{errors.dob}</p>}

        <div className="flex space-x-3">
          {['Male', 'Female', 'Other'].map(g => (
            <label key={g} className="text-gray-400 flex items-center space-x-1">
              <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange}
                className="w-4 h-4 focus:ring-blue-500 border-gray-300" /> <span>{g}</span>
            </label>
          ))}
        </div>
        {errors.gender && <p className="text-red-500">{errors.gender}</p>}

        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.address && <p className="text-red-500">{errors.address}</p>}

        <input type="file" accept="image/*" onChange={e => setProfilePic(e.target.files ? e.target.files[0] : null)} />
        {errors.profilePic && <p className="text-red-500">{errors.profilePic}</p>}

        <div className="flex justify-between items-center">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={form.password} onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 text-gray-400">{showPassword ? "Hide" : "Show"}</button>
        </div>
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <div className="flex justify-between items-center">
          <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="ml-2 text-gray-400">{showConfirmPassword ? "Hide" : "Show"}</button>
        </div>
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

        <div className="flex justify-center space-x-6 mt-4">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Admin</button>
          <Link href="/admin" className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">Back</Link>
        </div>
      </form>
    </div>
  );
};

export default AddAdminPage;
