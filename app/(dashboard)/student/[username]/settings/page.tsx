import Link from 'next/link'
import React from 'react'

const SettingsPage = () => {
    return (
        <div className="flex p-8 bg-gray-100 w-full">
            <div className="max-w-10xl mx-auto w-full">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <p className="text-gray-600 mb-4">This is Settings Page</p>
                        <Link href={`/teacher/assign_exams`} className="">
                            Assign Exams yourself.
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage