"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

type ProfilePageProps = {
    params: Promise<{ username: string }>;
}

const ProfilePage = ({ params }: ProfilePageProps) => {
    const [id, setId] = useState();
    const [username_id, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [displayPicture, setDisplayPicture] = useState('');
    const [enrolledProgram, setEnrolldedProgram] = useState();
    const [password, setPassword] = useState('');

    // Error states
    const [usernameError, setUsernameError] = useState('');
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [dobError, setDobError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [displayPictureError, setDisplayPictureError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { username } = use(params);

    const [jsonData, setJsonData] = useState(null);

    // ✅ Profile Picture states
    const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
    const [profilePic, setProfilePic] = useState<string>('');
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, [username]);

    async function fetchData() {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/student/retrieve/${username}`,
                { withCredentials: true }
            );
            const data = response.data;

            const [first, ...rest] = data.fullname.split(" ");
            const last = rest.join(" ");

            setId(data.id);
            setUsername(data.username || '');
            setFirstname(first || '');
            setLastname(last || '');
            setEmail(data.email || '');
            setPhone(data.phone_number || '');
            setDob(data.date_of_birth ? data.date_of_birth.split("T")[0] : '');
            setGender(data.gender || '');
            setAddress(data.address || '');
            setEnrolldedProgram(data?.program.id || 0);
            setPassword('');

            // ✅ Load profile picture directly when data.id is available
            if (data.id) {
                setProfilePic(`${process.env.NEXT_PUBLIC_API_URL}/student/profile/get_dp/${data.id}`);
            }

        } catch (error) {
            console.error(error);
        }
    }


    function validateForm() {
        let valid = true;

        setUsernameError('');
        setFirstnameError('');
        setLastnameError('');
        setEmailError('');
        setPhoneError('');
        setDobError('');
        setGenderError('');
        setAddressError('');
        setDisplayPictureError('');
        setPasswordError('');

        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^01\d{9}$/;
        const nameRegex = /^[a-zA-Z\s]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!username_id.trim()) {
            setUsernameError('Username required.');
            valid = false;
        } else if (!usernameRegex.test(username)) {
            setUsernameError(
                'Username must be 3-20 characters long and can include letters, numbers, and underscores only.'
            );
            valid = false;
        }

        if (!firstname.trim()) {
            setFirstnameError('First name required.');
            valid = false;
        } else if (!nameRegex.test(firstname)) {
            setFirstnameError(
                'Invalid name.'
            );
            valid = false;
        }

        if (!lastname.trim()) {
            setLastnameError('Last name required.');
            valid = false;
        } else if (!nameRegex.test(firstname)) {
            setLastnameError(
                'Invalid name.'
            );
            valid = false;
        }

        if (!email.trim()) {
            setEmailError('Email required.');
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        }

        if (!phone.trim()) {
            setPhoneError('Phone number required.');
            valid = false;
        } else if (!phoneRegex.test(phone)) {
            setPhoneError('Please enter a valid 11-digit phone number.');
            valid = false;
        }

        if (!dob.trim()) {
            setDobError('Date of Birth required.');
            valid = false;
        } else {
            const today = new Date();
            const birthDate = new Date(dob);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference =
                today.getMonth() - birthDate.getMonth();
            if (
                monthDifference < 0 ||
                (monthDifference === 0 && today.getDate() < birthDate.getDate())
            ) {
                age--;
            }
            if (age < 13) {
                setDobError('You must be at least 13 years old to register.');
                valid = false;
            }
        }

        if (!gender) {
            setGenderError('Please select your gender.');
            valid = false;
        }

        if (!address.trim()) {
            setAddressError('Address required.');
            valid = false;
        }

        if (!password) {
            setPasswordError('Password required.');
            valid = false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError(
                'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.'
            );
            valid = false;
        }

        return valid;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Create form data from actual form inputs
        const formData = {
            username: username_id,
            fullname: `${firstname} ${lastname}`, // Combine first and last name
            email: email,
            phone_number: phone,
            date_of_birth: dob,
            gender: gender,
            address: address,
            display_picture: displayPicture,
            enrolled_program: enrolledProgram,
            password: password,
        };

        try {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/student/update/` + id,
                formData,
                { withCredentials: true }
            );
            alert("Profile updated successful");

            setPassword('');

        } catch (error) {
            console.error("Error submitting form:", error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                alert("Update failed: " + errorMessage);
            } else {
                alert("Something went wrong! Please try again.");
            }
        }
    };

    const router = useRouter();
    const handleLogout = async () => {
        await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
        router.push('/login/student');
    };


    // Right Section – Updated Profile Picture Upload

    const handleUpdatePicture = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profilePicFile) return alert("Please select an image.");

        const formData = new FormData();
        formData.append("display_picture", profilePicFile);

        try {
            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/student/update_dp/${id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            // ✅ Refresh image after updating (bypass cache with timestamp)
            setProfilePic(`${process.env.NEXT_PUBLIC_API_URL}/student/profile/get_dp/${id}?t=${Date.now()}`);
            setPreview(null);
            setProfilePicFile(null);
            alert("Profile picture updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update profile picture.");
        }
    };

    return (
        <div className="flex gap-6 p-4 bg-gray-100 w-full h-full">
            {/* Left Section */}
            <div className="flex-1 bg-gray-800 rounded-lg shadow-lg mb-6 flex items-center justify-center p-6">
                <div className="w-full max-w-3xl flex flex-col items-center bg-gray-800 border-2 border-black rounded-md p-8">
                    <h3 className="text-3xl font-bold mb-8 text-white">
                        Student Profile
                    </h3>

                    <form
                        className="flex flex-col space-y-4 w-full"
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {usernameError && <p className="text-red-500">{usernameError}</p>}

                        <input
                            id="firstname"
                            name="firstname"
                            type="text"
                            placeholder="Enter your First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {firstnameError && <p className="text-red-500">{firstnameError}</p>}

                        <input
                            id="lastname"
                            name="lastname"
                            type="text"
                            placeholder="Enter your Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {lastnameError && <p className="text-red-500">{lastnameError}</p>}

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {emailError && <p className="text-red-500">{emailError}</p>}

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter your Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {phoneError && <p className="text-red-500">{phoneError}</p>}

                        <input
                            id="dob"
                            name="dob"
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {dobError && <p className="text-red-500">{dobError}</p>}

                        {/* Gender Section */}
                        <div className="flex space-x-3 w-full">
                            <p className="text-gray-400 font-semibold">Gender:</p>

                            <div className="flex items-center space-x-3">
                                <input
                                    id="gender_male"
                                    name="gender"
                                    type="radio"
                                    value="Male"
                                    checked={gender === "Male"}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <label htmlFor="gender_male" className="text-gray-400 cursor-pointer">
                                    Male
                                </label>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    id="gender_female"
                                    name="gender"
                                    type="radio"
                                    value="Female"
                                    checked={gender === "Female"}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-4 h-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                                />
                                <label htmlFor="gender_female" className="text-gray-400 cursor-pointer">
                                    Female
                                </label>
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    id="gender_others"
                                    name="gender"
                                    type="radio"
                                    value="Others"
                                    checked={gender === "Others"}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                                />
                                <label htmlFor="gender_others" className="text-gray-400 cursor-pointer">
                                    Others
                                </label>
                            </div>
                        </div>
                        {genderError && <p className="text-red-500">{genderError}</p>}

                        <input
                            id="address"
                            name="address"
                            type="text"
                            placeholder="Enter your home Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {addressError && <p className="text-red-500">{addressError}</p>}

                        <div className="flex items-center space-x-2 w-full">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-white"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {passwordError && <p className="text-red-500">{passwordError}</p>}

                        <div className="flex justify-center space-x-20 mt-4">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleLogout}
                                type="button"
                                className="px-8 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex-1 bg-gray-800 rounded-lg shadow-lg mb-6 flex items-center justify-center p-6">
                <div className="w-full max-w-md flex flex-col items-center bg-gray-800 border-2 border-black rounded-md p-6">
                    <h3 className="text-2xl font-bold mb-6 text-white">Update Profile Picture</h3>

                    <form
                        onSubmit={handleUpdatePicture}
                        className="flex flex-col items-center w-full space-y-4"
                        encType="multipart/form-data"
                    >
                        {/* Preview */}
                        <div className="mb-4">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-full border-2 border-gray-600"
                                />
                            ) : profilePic ? (
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    className="w-32 h-32 object-cover rounded-full border-2 border-gray-600"
                                />
                            ) : (
                                <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>

                        {/* File Input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                setProfilePicFile(file);
                                if (file) setPreview(URL.createObjectURL(file));
                            }}
                            className="w-full text-white file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:cursor-pointer focus:outline-none"
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            Update Picture
                        </button>
                    </form>
                </div>
            </div>
        </div>


        // <div className="max-w-10xl mx-auto m-6 flex flex-col items-center py-20 bg-gray-800 border-2 border-black rounded-md">
        //     <h3 className="text-3xl font-bold mb-8 text-white">
        //         Student Profile
        //     </h3>

        //     <form
        //         className="flex flex-col space-y-4 w-full max-w-lg px-4 sm:px-6 md:px-0"
        //         onSubmit={handleSubmit}
        //         noValidate
        //     >
        //         <input
        //             id="username"
        //             name="username"
        //             type="text"
        //             placeholder="Enter your username"
        //             value={username}
        //             onChange={(e) => setUsername(e.target.value)}
        //             className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //         />
        //         {usernameError && <p className="text-red-500">{usernameError}</p>}

        //         <input
        //             id="firstname"
        //             name="firstname"
        //             type="text"
        //             placeholder="Enter your First Name"
        //             value={firstname}
        //             onChange={(e) => setFirstname(e.target.value)}
        //             className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //         />
        //         {firstnameError && <p className="text-red-500">{firstnameError}</p>}

        //         <input
        //             id="lastname"
        //             name="lastname"
        //             type="text"
        //             placeholder="Enter your Last Name"
        //             value={lastname}
        //             onChange={(e) => setLastname(e.target.value)}
        //             className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //         />
        //         {lastnameError && <p className="text-red-500">{lastnameError}</p>}

        //         <input
        //             id="email"
        //             name="email"
        //             type="email"
        //             placeholder="Enter your Email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //         />
        //         {emailError && <p className="text-red-500">{emailError}</p>}

        //         <input
        //             id="phone"
        //             name="phone"
        //             type="tel"
        //             placeholder="Enter your Phone Number"
        //             value={phone}
        //             onChange={(e) => setPhone(e.target.value)}
        //             className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //         />
        //         {phoneError && <p className="text-red-500">{phoneError}</p>}

        //         <input
        //             id="dob"
        //             name="dob"
        //             type="date"
        //             value={dob}
        //             onChange={(e) => setDob(e.target.value)}
        //             className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //         />
        //         {dobError && <p className="text-red-500">{dobError}</p>}

        //         <div className="flex space-x-3">
        //             <p className="text-gray-400 font-semibold">Gender:</p>

        //             <div className="flex items-center space-x-3">
        //                 <input
        //                     id="gender_male"
        //                     name="gender"
        //                     type="radio"
        //                     value="Male"
        //                     checked={gender === "Male"}
        //                     onChange={(e) => setGender(e.target.value)}
        //                     className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
        //                 />
        //                 <label htmlFor="gender_male" className="text-gray-400 cursor-pointer">
        //                     Male
        //                 </label>
        //             </div>

        //             <div className="flex items-center space-x-3">
        //                 <input
        //                     id="gender_female"
        //                     name="gender"
        //                     type="radio"
        //                     value="Female"
        //                     checked={gender === "Female"}
        //                     onChange={(e) => setGender(e.target.value)}
        //                     className="w-4 h-4 text-pink-600 focus:ring-pink-500 border-gray-300"
        //                 />
        //                 <label htmlFor="gender_female" className="text-gray-400 cursor-pointer">
        //                     Female
        //                 </label>
        //             </div>

        //             <div className="flex items-center space-x-3">
        //                 <input
        //                     id="gender_others"
        //                     name="gender"
        //                     type="radio"
        //                     value="Others"
        //                     checked={gender === "Others"}
        //                     onChange={(e) => setGender(e.target.value)}
        //                     className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
        //                 />
        //                 <label htmlFor="gender_others" className="text-gray-400 cursor-pointer">
        //                     Others
        //                 </label>
        //             </div>
        //         </div>
        //         {genderError && <p className="text-red-500">{genderError}</p>}

        //         <input
        //             id="address"
        //             name="address"
        //             type="text"
        //             placeholder="Enter your home Address"
        //             value={address}
        //             onChange={(e) => setAddress(e.target.value)}
        //             className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //         />
        //         {addressError && <p className="text-red-500">{addressError}</p>}

        //         <div className="flex justify-center space-x-1">
        //             <input
        //                 id="password"
        //                 name="password"
        //                 type={showPassword ? "text" : "password"}
        //                 placeholder="Password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //             />
        //             <button
        //                 type="button"
        //                 onClick={() => setShowPassword(!showPassword)}
        //                 className="right-3  text-gray-400 hover:text-white"
        //             >
        //                 {showPassword ? "Hide" : "Show"}
        //             </button>
        //         </div>
        //         {passwordError && <p className="text-red-500">{passwordError}</p>}

        //         <div className="flex justify-center space-x-20 mt-4">
        //             <button
        //                 type="submit"
        //                 className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        //             >
        //                 Update
        //             </button>
        //             <button
        //                 onClick={handleLogout}
        //                 type="button"
        //                 className={"px-8 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"}
        //             >
        //                 Logout
        //             </button>
        //         </div>
        //     </form>
        // </div>
    );
}

export default ProfilePage