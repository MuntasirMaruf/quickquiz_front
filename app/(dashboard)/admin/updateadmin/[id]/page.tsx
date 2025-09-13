"use client";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const UpdateAdminPage = () => {
  const router = useRouter();
  const params = useParams();
  const adminId = params.id; // /admin/updateadmin/[id]

  // Form fields
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error states
  const [usernameError, setUsernameError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dobError, setDobError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [profilePicError, setProfilePicError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch admin data
  useEffect(() => {
    if (adminId) fetchAdminData();
  }, [adminId]);

  const fetchAdminData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/admin/getAdminupdate/${adminId}`);
      const data = res.data;

      setUsername(data.username || "");
      if (data.fullname) {
        const [first, ...rest] = data.fullname.split(" ");
        setFirstname(first);
        setLastname(rest.join(" "));
      }
      setEmail(data.email || "");
      setPhone(data.phone_number || "");
      setDob(data.date_of_birth ? data.date_of_birth.split("T")[0] : "");
      setGender(data.gender || "");
      setAddress(data.address || "");
    } catch (err) {
      console.error("Error fetching admin:", err);
      alert("Failed to load admin details.");
    }
  };

  // Form validation (same as AddAdmin)
  function validateForm() {
    let valid = true;
    setUsernameError("");
    setFirstnameError("");
    setLastnameError("");
    setEmailError("");
    setPhoneError("");
    setDobError("");
    setGenderError("");
    setAddressError("");
    setProfilePicError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01\d{9}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!username.trim()) {
      setUsernameError("Username required.");
      valid = false;
    } else if (!usernameRegex.test(username)) {
      setUsernameError("Username must be 3-20 characters and alphanumeric/underscores.");
      valid = false;
    }

    if (!firstname.trim()) {
      setFirstnameError("First name required.");
      valid = false;
    }
    if (!lastname.trim()) {
      setLastnameError("Last name required.");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Email required.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email address.");
      valid = false;
    }

    if (!phone.trim()) {
      setPhoneError("Phone number required.");
      valid = false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneError("Invalid 11-digit phone number.");
      valid = false;
    }

    if (!dob.trim()) {
      setDobError("Date of Birth required.");
      valid = false;
    }

    if (!gender) {
      setGenderError("Please select gender.");
      valid = false;
    }

    if (!address.trim()) {
      setAddressError("Address required.");
      valid = false;
    }

    if (password) {
      if (!passwordRegex.test(password)) {
        setPasswordError("Password must be 8+ chars, include uppercase, lowercase, number, special char.");
        valid = false;
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
        valid = false;
      }
    }

    return valid;
  }

  // Handle update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("fullname", `${firstname} ${lastname}`);
      formData.append("email", email);
      formData.append("phone_number", phone);
      formData.append("date_of_birth", dob);
      formData.append("gender", gender);
      formData.append("address", address);
      if (password) formData.append("password", password);
      if (profilePic) formData.append("profilePic", profilePic);

      await axios.put(`http://localhost:3000/admin/updateAdminupdate/${adminId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Admin updated successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating admin:", error);
      alert("Failed to update admin. Check console for details.");
    }
  };

  if (!adminId) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto m-6 flex flex-col items-center py-20 bg-gray-800 border-2 border-black rounded-md">
      <h3 className="text-3xl font-bold mb-8 text-white">Update Admin</h3>

      <form
        className="flex flex-col space-y-4 w-full max-w-lg px-4 sm:px-6 md:px-0"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none"
        />
        {usernameError && <p className="text-red-500">{usernameError}</p>}

        {/* Firstname & Lastname */}
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600"
        />
        {firstnameError && <p className="text-red-500">{firstnameError}</p>}

        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600"
        />
        {lastnameError && <p className="text-red-500">{lastnameError}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}

        {/* Phone */}
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600"
        />
        {phoneError && <p className="text-red-500">{phoneError}</p>}

        {/* DOB */}
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600"
        />
        {dobError && <p className="text-red-500">{dobError}</p>}

        {/* Gender */}
        <div className="flex space-x-3">
          {["Male", "Female", "Other"].map((g) => (
            <label key={g} className="text-gray-400 flex items-center space-x-1">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={gender === g}
                onChange={(e) => setGender(e.target.value)}
                className="w-4 h-4"
              />{" "}
              <span>{g}</span>
            </label>
          ))}
        </div>
        {genderError && <p className="text-red-500">{genderError}</p>}

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600"
        />
        {addressError && <p className="text-red-500">{addressError}</p>}

        {/* Profile picture */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfilePic(e.target.files ? e.target.files[0] : null)}
        />
        {profilePicError && <p className="text-red-500">{profilePicError}</p>}

        {/* Password */}
        <div className="flex justify-between items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password (leave blank to keep current)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 w-full"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 text-gray-400">
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {passwordError && <p className="text-red-500">{passwordError}</p>}

        {/* Confirm Password */}
        <div className="flex justify-between items-center">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 w-full"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="ml-2 text-gray-400"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}

        {/* Buttons */}
        <div className="flex justify-center space-x-6 mt-4">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Update Admin
          </button>

          <Link
            href="/admin"
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateAdminPage;
