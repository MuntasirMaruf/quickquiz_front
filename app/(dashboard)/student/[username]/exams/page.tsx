"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type PageProps = {
    params: Promise<{ username: string }>;
};

type ItemE = {
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


    const [sortBy, setSortBy] = useState("name");
    const [jsonDataE, setJsonDataE] = useState<ItemE[] | null>(null);
    const [examId, setExamId] = useState();
    const [quesionId, setQuestionId] = useState();

    useEffect(() => {
        fetchExams();
    }, []);

    async function fetchExams() {
        try {
            const response = await axios.get(
                process.env.NEXT_PUBLIC_API_URL + "/exam_question_ssc/all/exams"
            );
            const data: ItemE[] = response.data;
            setJsonDataE(data);
        } catch (error) {
            console.error(error);
        }
    }



    const printArray = (jsonData: ItemE[]) => {
        return jsonData.map((item, index) => {
            return (
                <div
                    key={index}
                    className="mb-4 p-6 bg-gray-700 rounded-xl shadow-lg text-white flex justify-between"
                >
                    {/* Info Section */}
                    <div className="flex justify-between w-200">
                        <div>
                            <p><span className="text-gray-300">ID:</span> {item.id}</p>
                            <p><span className="text-gray-300">Name:</span> {item.name}</p>
                            <p><span className="text-gray-300">Category:</span> {item.category}</p>
                            <p><span className="text-gray-300">Subject:</span> {item.subject}</p>
                        </div>
                        <div>
                            <p><span className="text-gray-300">Marks:</span> {item.marks}</p>
                            <p><span className="text-gray-300">Duration:</span> {item.duration}</p>
                            <p><span className="text-gray-300">Date:</span> {item.date}</p>
                            <p>
                                <span className="text-gray-300">Status:</span>{" "}
                                <span
                                    className={`px-2 py-1 rounded text-sm font-medium ${item.status.id === 1
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-red-500/20 text-red-400"
                                        }`}
                                >
                                    {item.status.id}
                                </span>
                            </p>
                        </div>


                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-4">
                        <Link className="bg-green-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow flex justify-center" href={`/student/${username}/exams/${item.id}`}>
                            Details
                        </Link>
                        <Link className="bg-blue-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow flex justify-center" href={`/student/${username}/exams/${item.id}`}>
                            Take
                        </Link>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="flex p-4 bg-gray-100 w-full">
            <div className="max-w-10xl mx-auto w-full">
                <div className="bg-gray-900 rounded-lg shadow-lg mb-6 flex items-center justify-between p-6">
                    <p className="text-white text-2xl font-bold">Take Exams</p>
                    {/* Sort By Dropdown */}
                    <select
                        className="bg-gray-800 text-white text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="name"
                    >
                        <option value="default" disabled>
                            Sort By
                        </option>
                        <option value="name">Name</option>
                        <option value="marks">Marks</option>
                        <option value="duration">Duration</option>
                        <option value="date">Date</option>
                        <option value="status">Status</option>
                    </select>

                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 max-h-[75svh] overflow-y-auto">
                    {jsonDataE && Array.isArray(jsonDataE) ? printArray(jsonDataE) : null}
                </div>
            </div>
        </div>
    );
};

export default ExamsPage;
