import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="max-w-6xl mx-auto m-6 flex flex-col items-center py-50 bg-gray-800 border-2 border-black rounded-md">
            <h3 className="text-3xl font-bold mb-8 text-white">Register as...</h3>
            <div className="flex flex-col space-y-6 mt-6">
                <Link
                    href="/registration/student"
                    className="px-10 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
                >
                    Student
                </Link>
                <Link
                    href="/registration/teacher"
                    className="px-10 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                    Teacher
                </Link>
                <Link
                    href="/registration/admin"
                    className="px-10 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                    Admin
                </Link>
            </div>
        </div>
    )
}

export default page
