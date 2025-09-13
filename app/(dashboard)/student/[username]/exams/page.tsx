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
    status: { id: number };
};

const ExamsPage = ({ params }: PageProps) => {
    const { username } = React.use(params); // unwrap the promise
    const [exams, setExams] = useState<ExamItem[]>([]);
    const [searchBy, setSearchBy] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchExams();
    }, []);

    async function fetchExams() {
        try {
            const response = await axios.get(
                process.env.NEXT_PUBLIC_API_URL + "/exam_question_ssc/all/exams"
            );
            setExams(response.data);
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
                    className="mb-4 p-6 bg-gray-700 rounded-xl shadow-lg text-white flex justify-between"
                >
                    {/* Info Section */}
                    <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:text-base w-full sm:w-auto">
                        <p><span className="text-gray-400">ID:</span> {item.id}</p>
                        <p><span className="text-gray-400">Marks:</span> {item.marks}</p>

                        <p><span className="text-gray-400">Name:</span> {item.name}</p>
                        <p><span className="text-gray-400">Duration:</span> {item.duration} Minutes</p>

                        <p><span className="text-gray-400">Category:</span> {item.category}</p>
                        <p><span className="text-gray-400">Date:</span> {item.date.split("T")[0]}</p>

                        <p><span className="text-gray-400">Subject:</span> {item.subject}</p>
                        <p>
                            <span className="text-gray-400">Status:</span>{" "}
                            <span
                                className={`px-2 py-1 rounded text-sm font-medium ${item.status.id === 1
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                    }`}
                            >
                                {item.status.id === 1 ? "Active" : "Inactive"}
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col justify-between py-2">
                        <Link className="bg-green-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow flex justify-center" href={`/student/${username}/exams/${item.id}`}>
                            Details
                        </Link>
                        <Link className="bg-blue-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow flex justify-center" href={`/student/${username}/exams/${item.id}/start`}>
                            Start
                        </Link>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="flex p-4 bg-gray-100 w-full h-full">
            <div className="flex flex-col max-w-10xl mx-auto w-full h-full">
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
                            defaultValue="name"
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

                <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-h-[78vh] overflow-y-auto">
                    {filteredExams.length > 0 && Array.isArray(filteredExams) ? (
                        printArray(filteredExams)
                    ) : (
                        <p className="text-gray-400">Exam not found</p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default ExamsPage;
