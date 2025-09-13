"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ChangeProfilePage = () => {
  const router = useRouter();
  const adminId = localStorage.getItem("adminId");

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
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility
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

      // Profile picture
      if (data.display_picture) {
        setProfilePicUrl(`http://localhost:3000/admin/getimage/${data.display_picture}`);
      } else {
        setProfilePicUrl("/images/Admin-Profile-Vector-PNG-Image.png"); // fallback
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      alert("Failed to load profile details.");
    }
  };

  // Preview selected image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfilePic(file);
    if (file) {
      setProfilePicUrl(URL.createObjectURL(file));
    }
  };

  // Form validation
  const validateForm = () => {
    if (
      !username.trim() ||
      !firstname.trim() ||
      !lastname.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !dob.trim() ||
      !gender ||
      !address.trim()
    ) {
      alert("Please fill all required fields.");
      return false;
    }
    if (password && password !== confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  };

  // Submit updated profile
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

      alert("Profile updated successfully!");
      router.push("/admin");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  if (!adminId) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20 bg-gray-800 border-2 border-black rounded-md text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Change Profile</h2>

      {/* Profile Image */}
      {profilePicUrl && (
        <div className="flex justify-center mb-4">
          <img
            src={profilePicUrl}
            alt="Profile"
            className="w-32 h-32 object-cover border-2 border-gray-600 rounded-lg"
          />
        </div>
      )}

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600"
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600"
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Gender */}
        <div className="flex space-x-3">
          {["Male", "Female", "Other"].map((g) => (
            <label key={g} className="flex items-center space-x-1">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={gender === g}
                onChange={(e) => setGender(e.target.value)}
                className="w-4 h-4"
              />
              <span>{g}</span>
            </label>
          ))}
        </div>

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600"
        />

        {/* Upload new profile picture */}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* Password */}
        <div className="flex space-x-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 flex-1"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex space-x-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 flex-1"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-400"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex justify-center space-x-6 mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeProfilePage;
