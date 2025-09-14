"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

type ExamItem = {
    id: number | string;
    name: string;
    category: string;
    subject: string;
    marks: number;
    duration: string;
    date: string;
    time: string;
    isExpired: boolean;
};

export default function ExamsList({ username, exams }: { username: string; exams: ExamItem[] }) {
    const [searchBy, setSearchBy] = useState("name");
    const [searchTerm, setSearchTerm] = useState("");
    const [examDoneMap, setExamDoneMap] = useState<Record<string, boolean>>({});

    useEffect(() => {
        // Fetch answers for all exams to determine which are done
        exams.forEach(async (exam) => {
            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/answer_ssc/answers`,
                    { username, examid: exam.id },
                    { withCredentials: true }
                );
                setExamDoneMap((prev) => ({ ...prev, [exam.id]: Array.isArray(res.data) && res.data.length > 0 }));
            } catch (error) {
                console.error(`Error fetching answers for exam ${exam.id}:`, error);
                setExamDoneMap((prev) => ({ ...prev, [exam.id]: false }));
            }
        });
    }, [exams, username]);

    const filtered = exams.filter((exam) => {
        if (!searchTerm.trim()) return true;
        const value = (exam as any)[searchBy];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
            {/* Search + filter bar */}
            <div className="bg-gray-800 rounded-lg shadow-lg mb-4 flex items-center justify-between p-6">
                <div className="bg-gray-800 rounded-lg shadow-lg flex items-center justify-between p-1">
                    <p className="text-white text-2xl font-bold">Exams</p>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-700 text-white text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={searchBy}
                        onChange={(e) => setSearchBy(e.target.value)}
                        className="bg-gray-700 text-white text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="name">Name</option>
                        <option value="id">Id</option>
                        <option value="subject">Subject</option>
                        <option value="category">Category</option>
                        <option value="marks">Marks</option>
                        <option value="duration">Duration</option>
                    </select>
                </div>
            </div>

            {/* Exams list */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-h-[79vh] overflow-y-auto">
                {filtered.length > 0 ? (
                    filtered.map((item) => {
                        const done = examDoneMap[item.id];
                        return (
                            <div
                                key={item.id}
                                className="mb-4 p-6 space-x-150 bg-gray-700 rounded-xl shadow-lg text-white flex justify-between"
                            >
                                <div className="flex justify-between w-full text-sm sm:text-base">
                                    {/* Left column */}
                                    <div className="flex flex-col space-y-2">
                                        <p><span className="text-gray-400">ID:</span> {item.id}</p>
                                        <p><span className="text-gray-400">Name:</span> {item.name}</p>
                                        <p><span className="text-gray-400">Category:</span> {item.category}</p>
                                        <p><span className="text-gray-400">Subject:</span> {item.subject}</p>
                                    </div>

                                    {/* Right column */}
                                    <div className="flex flex-col space-y-2">
                                        <p><span className="text-gray-400">Marks:</span> {item.marks}</p>
                                        <p><span className="text-gray-400">Duration:</span> {item.duration} Minutes</p>
                                        <p><span className="text-gray-400">Date:</span> {item.date.split("T")[0]}</p>
                                        <p><span className="text-gray-400">Due:</span> {item.time}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between py-2">
                                    <Link
                                        className="bg-green-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow flex justify-center"
                                        href={`/student/${username}/exams/${item.id}`}
                                    >
                                        Details
                                    </Link>

                                    {item.isExpired ? (
                                        <button
                                            disabled
                                            className="bg-red-500 opacity-60 text-white px-4 py-2 rounded-lg shadow flex justify-center cursor-not-allowed"
                                        >
                                            Expired
                                        </button>
                                    ) : done ? (
                                        <button
                                            disabled
                                            className="bg-gray-700 opacity-60 text-white px-4 py-2 rounded-lg shadow flex justify-center cursor-not-allowed"
                                        >
                                            Done
                                        </button>
                                    ) : (
                                        <Link
                                            className="bg-blue-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow flex justify-center"
                                            href={`/student/${username}/exams/${item.id}/start`}
                                        >
                                            Start
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-400">Exam not found</p>
                )}
            </div>
        </>
    );
}
