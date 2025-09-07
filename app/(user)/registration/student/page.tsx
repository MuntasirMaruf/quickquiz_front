"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';

const StudentRegistration = () => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [program, setProgram] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Error states
    const [usernameError, setUsernameError] = useState('');
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [dobError, setDobError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [programError, setProgramError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function validateForm() {
        let valid = true;

        // Reset errors
        setUsernameError('');
        setFirstnameError('');
        setLastnameError('');
        setEmailError('');
        setPhoneError('');
        setDobError('');
        setGenderError('');
        setAddressError('');
        setProgramError('');
        setPasswordError('');
        setConfirmPasswordError('');

        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^01\d{9}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!username.trim()) {
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
        }

        if (!lastname.trim()) {
            setLastnameError('Last name required.');
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

        if (!program) {
            setProgramError('Please select a program.');
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

        if (!confirmPassword) {
            setConfirmPasswordError('Please confirm your password.');
            valid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
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
            username: username,
            fullname: `${firstname} ${lastname}`, // Combine first and last name
            email: email,
            phone_number: phone,
            date_of_birth: dob,
            gender: gender,
            address: address,
            password: password,
            enrolled_program: parseInt(program), // Ensure it's a number
        };

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/student/register`,
                formData
            );
            alert("Registration successful");

            // Clear form after successful registration
            setUsername('');
            setFirstname('');
            setLastname('');
            setEmail('');
            setPhone('');
            setDob('');
            setGender('');
            setAddress('');
            setProgram('');
            setPassword('');
            setConfirmPassword('');

        } catch (error) {
            console.error("Error submitting form:", error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                alert("Registration failed: " + errorMessage);
            } else {
                alert("Something went wrong! Please try again.");
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto m-6 flex flex-col items-center py-20 bg-gray-800 border-2 border-black rounded-md">
            <h3 className="text-3xl font-bold mb-8 text-white">
                Student registration
            </h3>

            <form
                className="flex flex-col space-y-4 w-full max-w-lg px-4 sm:px-6 md:px-0"
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
                    className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                <div className="flex space-x-3">
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
                            id="gender_other"
                            name="gender"
                            type="radio"
                            value="Others"
                            checked={gender === "Other"}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                        />
                        <label htmlFor="gender_other" className="text-gray-400 cursor-pointer">
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
                    className="px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {addressError && <p className="text-red-500">{addressError}</p>}

                <div className="w-full mx-auto">
                    <select
                        name="program"
                        id="program"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                        <option value="" disabled>Select Program</option>
                        <option value="1">SSC Preparation</option>
                        <option value="2">HSC Preparation</option>
                        <option value="3">Engineering Preparation</option>
                        <option value="4">Medical Preparation</option>
                    </select>
                </div>
                {programError && <p className="text-red-500">{programError}</p>}

                <div className="flex justify-center space-x-1">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="right-3  text-gray-400 hover:text-white"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                {passwordError && <p className="text-red-500">{passwordError}</p>}

                <div className="flex justify-center space-x-1">
                    <input
                        id="confirm_password"
                        name="confirm_password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Retype the password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="right-3  text-gray-400 hover:text-white"
                    >
                        {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                </div>
                {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}

                <div className="flex justify-center space-x-20 mt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                    <Link
                        href="/login"
                        type="button"
                        className={"px-8 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"}
                    >
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default StudentRegistration;