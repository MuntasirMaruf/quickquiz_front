// 'use client'
// import axios from 'axios';
// import React, { useState } from 'react'

// const page = () => {

//     const[position, setPosition] = useState("");
//     const[exam_id, setExam_id] = useState("");
//     const[question_id_cq, setQuestion_id_cq] = useState("");
    
   


//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {
//             const data = {
//                 position: position,
//                 question_id_cq: question_id_cq,
//                 exam_id: exam_id,
//                 status: 1

//             }
//             const res = await axios.post(
//                 'http://localhost:3000/exam_question_ssc/create/exam',
//                 data
//             );
//             alert("Exam Time");


//         } catch (error) {
//             console.error("Error submitting form:", error);
//             if (axios.isAxiosError(error)) {
//                 const errorMessage = error.response?.data?.message || error.message;
//                 alert("Exam Time failed: " + errorMessage);
//             } else {
//                 alert("Something went wrong! Please try again.");
//             }
//         }
//     }

//   return (
//      <div className="max-w-md mx-auto mt-6 border p-4 rounded">
//             <form onSubmit={handleSubmit}>
//                 {/* Dropdown for category */}
//                 <select
//                     name="position"
//                     value={position}
//                     onChange={(e) => setPosition(e.target.value)}
//                     className="w-full border p-2 mb-2"
//                     required
//                 >
//                     <option value="">Select  position</option>
//                     <option value="Regular">First</option>
//                     <option value="Model">Secound</option>
//                     <option value="Test">Third</option>
//                     <option value="Final Model Test">Last</option>
//                 </select>
               

//                 <input
//                     name="Exam Id"
//                     type="number"
//                     placeholder="Exam_id"
//                     value={exam_id}
//                     onChange={(e) => setExam_id(e.target.value)}
//                     className="w-full border p-2 mb-2"
//                     required
//                 />
//                  <input
//                     name="question Id CQ"
//                     type="number"
//                     placeholder="question_id_cq"
//                     value={question_id_cq}
//                     onChange={(e) => setQuestion_id_cq(e.target.value)}
//                     className="w-full border p-2 mb-2"
//                     required
//                 />

               

//                 <button
//                     className="w-full border p-2 mt-2 rounded bg-blue-500 text-white"
//                     type="submit"
//                 >
//                     Register
//                 </button>
//             </form>
//         </div>
//   )
// }

// export default page
"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type ApiStudent = {
  username: string;
  fullname: string;      // "First Last"
  email: string;
  phone_number: string;
  date_of_birth?: string; // ISO date string
  gender?: string;
  address?: string;
};

const ProfilePage: React.FC = () => {
  const router = useRouter();
  // ✅ App Router: client component-এ params পেতে useParams()
  const { username: routeUsernameRaw } = useParams() as { username?: string | string[] };
  const routeUsername = useMemo(
    () => (Array.isArray(routeUsernameRaw) ? routeUsernameRaw[0] : routeUsernameRaw) ?? "",
    [routeUsernameRaw]
  );

  // 🔧 একটাই সোর্স-অফ-ট্রুথ: username
  const [username, setUsername] = useState<string>(routeUsername);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  // পাসওয়ার্ড: current + new (নতুন পাসওয়ার্ড ঐচ্ছিক; দিলে স্ট্রং হতে হবে)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Errors
  const [usernameError, setUsernameError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dobError, setDobError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  // UI
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  // ⬇️ প্রোফাইল ডেটা লোড
  useEffect(() => {
    if (!API || !routeUsername) return;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get<ApiStudent>(`${API}/student/retrieve/${routeUsername}`);
        const data = res.data;

        // fullname থেকে first/last split
        const [first, ...rest] = (data.fullname ?? "").trim().split(" ");
        const last = rest.join(" ");

        setUsername(data.username ?? routeUsername);
        setFirstname(first ?? "");
        setLastname(last ?? "");
        setEmail(data.email ?? "");
        setPhone(data.phone_number ?? "");
        setDob(data.date_of_birth ? data.date_of_birth.split("T")[0] : "");
        setGender(data.gender ?? "");
        setAddress(data.address ?? "");
        // সিকিউরিটি কারণে পাসওয়ার্ড ইনপুট ফাঁকা
        setCurrentPassword("");
        setNewPassword("");
      } catch (err) {
        console.error("Failed to load profile:", err);
        alert("প্রোফাইল লোড করা যায়নি।");
      } finally {
        setLoading(false);
      }
    })();
  }, [API, routeUsername]);

  // ✅ Regex গুলো (Unicode-friendly নামের জন্য \p{L})
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegexBD = /^01\d{9}$/; // BD: মোট ১১ ডিজিট, 01 দিয়ে শুরু
  const nameRegex = /^[\p{L} .'-]+$/u; // José, আনোয়ার, Anne-Marie সব সাপোর্ট
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}._-])[A-Za-z\d@$!%*?&#^()[\]{}._-]{8,}$/;

  function resetErrors() {
    setUsernameError("");
    setFirstnameError("");
    setLastnameError("");
    setEmailError("");
    setPhoneError("");
    setDobError("");
    setGenderError("");
    setAddressError("");
    setCurrentPasswordError("");
    setNewPasswordError("");
  }

  // ⛑️ ভ্যালিডেশন
  function validateForm() {
    let valid = true;
    resetErrors();

    if (!username.trim()) {
      setUsernameError("ইউজারনেম প্রয়োজন।");
      valid = false;
    } else if (!usernameRegex.test(username)) {
      setUsernameError("ইউজারনেম ৩–২০ অক্ষর, শুধুমাত্র অক্ষর/সংখ্যা/আন্ডারস্কোর।");
      valid = false;
    }

    if (!firstname.trim()) {
      setFirstnameError("ফার্স্ট নেম প্রয়োজন।");
      valid = false;
    } else if (!nameRegex.test(firstname)) {
      setFirstnameError("নামের ফরম্যাট সঠিক নয়।");
      valid = false;
    }

    if (!lastname.trim()) {
      setLastnameError("লাস্ট নেম প্রয়োজন।");
      valid = false;
    } else if (!nameRegex.test(lastname)) {
      setLastnameError("নামের ফরম্যাট সঠিক নয়।");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("ইমেইল প্রয়োজন।");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("বৈধ ইমেইল দিন।");
      valid = false;
    }

    if (!phone.trim()) {
      setPhoneError("ফোন নম্বর প্রয়োজন।");
      valid = false;
    } else if (!phoneRegexBD.test(phone)) {
      setPhoneError("বৈধ ১১ ডিজিট BD নম্বর দিন (01*********).");
      valid = false;
    }

    if (!dob.trim()) {
      setDobError("জন্ম তারিখ প্রয়োজন।");
      valid = false;
    } else {
      const today = new Date();
      const birth = new Date(dob);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      if (age < 13) {
        setDobError("রেজিস্ট্রেশনের জন্য কমপক্ষে ১৩ বছর বয়স লাগবে।");
        valid = false;
      }
    }

    if (!gender) {
      setGenderError("জেন্ডার সিলেক্ট করুন।");
      valid = false;
    }

    if (!address.trim()) {
      setAddressError("ঠিকানা প্রয়োজন।");
      valid = false;
    }

    // 🔐 পাসওয়ার্ড আপডেট লজিক:
    // নতুন পাসওয়ার্ড দিলে currentPassword বাধ্যতামূলক + স্ট্রং হতে হবে
    if (newPassword) {
      if (!currentPassword) {
        setCurrentPasswordError("কারেন্ট পাসওয়ার্ড দিন।");
        valid = false;
      }
      if (!strongPasswordRegex.test(newPassword)) {
        setNewPasswordError(
          "নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষর, বড়/ছোট হাতের অক্ষর, সংখ্যা ও স্পেশাল ক্যারেক্টার থাকতে হবে।"
        );
        valid = false;
      }
    }

    return valid;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!API) {
      alert("API বেস URL (NEXT_PUBLIC_API_URL) সেট নেই।");
      return;
    }
    if (!validateForm()) return;

    // 📨 আপডেট payload
    const payload: Record<string, any> = {
      username,
      fullname: `${firstname} ${lastname}`.trim(),
      email,
      phone_number: phone,
      date_of_birth: dob,
      gender,
      address,
    };

    // শুধু নতুন পাসওয়ার্ড থাকলে পাঠাবো
    if (newPassword) {
      payload.current_password = currentPassword;
      payload.new_password = newPassword;
    }

    try {
      setLoading(true);
      // 🔁 প্রোফাইল আপডেট (আপনার API অনুযায়ী route/verb বদলান)
      const url = `${API}/student/update/${encodeURIComponent(routeUsername || username)}`;
      await axios.put(url, payload, { withCredentials: true });
      alert("প্রোফাইল সফলভাবে আপডেট হয়েছে।");
    } catch (error: any) {
      console.error("Update failed:", error);
      const msg =
        (error?.response?.data?.message as string) ||
        error?.message ||
        "আপডেট করা যায়নি।";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (!API) throw new Error("API base URL not set");
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("লগআউট করা যায়নি।");
    }
  };

  return (
    <div className="max-w-6xl mx-auto m-6 flex flex-col items-center py-20 bg-gray-800 border-2 border-black rounded-md">
      <h3 className="text-3xl font-bold mb-8 text-white">
        Student Profile
      </h3>

      <form
        className="flex flex-col space-y-4 w-full max-w-lg px-4 sm:px-6 md:px-0"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Username — route থেকে আসা বলে lock রাখা উত্তম */}
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled
          className="px-4 py-3 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-400 border border-gray-600 focus:outline-none"
        />
        {usernameError && <p className="text-red-500">{usernameError}</p>}

        <input
          id="firstname"
          name="firstname"
          type="text"
          placeholder="Enter your First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {firstnameError && <p className="text-red-500">{firstnameError}</p>}

        <input
          id="lastname"
          name="lastname"
          type="text"
          placeholder="Enter your Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {lastnameError && <p className="text-red-500">{lastnameError}</p>}

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}

        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {phoneError && <p className="text-red-500">{phoneError}</p>}

        <input
          id="dob"
          name="dob"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {dobError && <p className="text-red-500">{dobError}</p>}

        {/* Gender */}
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-gray-400 font-semibold">Gender:</p>

          {["Male", "Female", "Others"].map((g) => (
            <label key={g} className="flex items-center space-x-2 text-gray-300 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={gender === g}
                onChange={(e) => setGender(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
        {genderError && <p className="text-red-500">{genderError}</p>}

        <input
          id="address"
          name="address"
          type="text"
          placeholder="Enter your home Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {addressError && <p className="text-red-500">{addressError}</p>}

        {/* Password (current) */}
        <div className="flex items-center space-x-2">
          <input
            id="current_password"
            name="current_password"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Current Password (only if changing)"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword((s) => !s)}
            className="text-gray-400 hover:text-white"
          >
            {showCurrentPassword ? "Hide" : "Show"}
          </button>
        </div>
        {currentPasswordError && <p className="text-red-500">{currentPasswordError}</p>}

        {/* Password (new) */}
        <div className="flex items-center space-x-2">
          <input
            id="new_password"
            name="new_password"
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password (optional)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword((s) => !s)}
            className="text-gray-400 hover:text-white"
          >
            {showNewPassword ? "Hide" : "Show"}
          </button>
        </div>
        {newPasswordError && <p className="text-red-500">{newPasswordError}</p>}

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-8 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
