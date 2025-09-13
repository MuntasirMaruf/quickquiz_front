"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type PageProps = {
    params: Promise<{ username: string }>;
};

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

const ExamsPage = ({ params }: PageProps) => {
    const [username, setUsername] = useState<string>("");
    const [exams, setExams] = useState<ExamItem[]>([]);
    const [searchBy, setSearchBy] = useState("name"); // ✅ default to name
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function resolveParams() {
            const p = await params;
            setUsername(p.username);
        }
        resolveParams();
    }, [params]);

    useEffect(() => {
        fetchExams();
    }, []);

    async function fetchExams() {
        try {
            const response = await axios.get(
                process.env.NEXT_PUBLIC_API_URL + "/exam_question_ssc/all/exams"
            );

            const examsWithStatus = response.data.map((exam: any) => {
                // Parse the time string (e.g., "10:30 AM")
                const [timePart, meridiem] = exam.time.split(" ");
                let [hours, minutes] = timePart.split(":").map(Number);

                if (meridiem.toUpperCase() === "PM" && hours !== 12) hours += 12;
                if (meridiem.toUpperCase() === "AM" && hours === 12) hours = 0;

                const examDateTime = new Date(exam.date);
                examDateTime.setHours(hours, minutes, 0, 0);

                exam.isExpired = new Date() > examDateTime;
                return exam;
            });

            setExams(examsWithStatus);
        } catch (error) {
            console.error(error);
        }
    }

    const filteredExams = exams.filter((exam) => {
        if (!searchTerm.trim()) return true;
        const value = (exam as any)[searchBy];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });

    const printArray = (jsonData: ExamItem[]) => {
        return jsonData.map((item, index) => {
            return (
                <div
                    key={index}
                    className="mb-4 p-6 space-x-150 bg-gray-700 rounded-xl shadow-lg text-white flex justify-between"
                >
                    <div className="flex justify-between w-full text-sm sm:text-base">
                        {/* Left Column */}
                        <div className="flex flex-col space-y-2">
                            <p><span className="text-gray-400">ID:</span> {item.id}</p>
                            <p><span className="text-gray-400">Name:</span> {item.name}</p>
                            <p><span className="text-gray-400">Category:</span> {item.category}</p>
                            <p><span className="text-gray-400">Subject:</span> {item.subject}</p>
                        </div>

                        {/* Right Column */}
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
        });
    };

    return (
        <div className="flex p-4 bg-gray-100 w-full h-full">
            <div className="flex flex-col max-w-10xl mx-auto w-full h-full">
                {/* Header */}
                <div className="bg-gray-800 rounded-lg shadow-lg mb-6 flex items-center justify-between p-6">
                    <p className="text-white text-2xl font-bold">Exams</p>

                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-700 text-white text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            className="bg-gray-700 text-white text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchBy}
                            onChange={(e) => setSearchBy(e.target.value)}
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

                {/* Scrollable List */}
                <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-h-[78vh] overflow-y-auto">
                    {filteredExams.length > 0 ? printArray(filteredExams) : (
                        <p className="text-gray-400">Exam not found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExamsPage;
