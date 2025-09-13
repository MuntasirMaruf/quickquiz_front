"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

type Item = {
    id: number | string;
    name: string;
    category: string;
    subject: string;
    marks: number;
    duration: string;
    date: string;
    status: { id: number };
};

type PageProps = {
    params: { username: string };
};

const AssignExamsPage = ({ params }: PageProps) => {
    const { username } = params;

    const [sortBy, setSortBy] = useState("name");
    const [jsonData, setJsonData] = useState<Item[] | null>(null);

    useEffect(() => {
        fetchExams();
    }, []);

    async function fetchExams() {
        try {
            const response = await axios.get(
                process.env.NEXT_PUBLIC_API_URL + "/exam_question_ssc/all/exams"
            );
            const data: Item[] = response.data;
            setJsonData(data);
        } catch (error) {
            console.error(error);
        }
    }

    // ✅ Sorting logic
    const sortedData = useMemo(() => {
        if (!jsonData) return [];

        const dataCopy = [...jsonData];

        switch (sortBy) {
            // case "name":
            //     return dataCopy.sort(
            //         (a, b) => (a.name ?? "").localeCompare(b.name ?? "")
            //     );
            // case "marks":
            //     return dataCopy.sort((a, b) => (b.marks ?? 0) - (a.marks ?? 0));
            // case "duration":
            //     return dataCopy.sort(
            //         (a, b) => parseInt(a.duration ?? "0") - parseInt(b.duration ?? "0")
            //     );
            // case "date":
            //     return dataCopy.sort(
            //         (a, b) =>
            //             new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
            //     );
            // case "status":
            //     return dataCopy.sort(
            //         (a, b) => (a.status?.id ?? ).localeCompare(b.status?.id ?? "")
            //     );
            // default:
            //     return dataCopy;
        }
    }, [jsonData, sortBy]);

    const printArray = (jsonData: Item[]) => {
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
                    <div className="flex space-x-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
                            Add Questions
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
                            View Details
                        </button>
                    </div>
                </div>
            );
        });
    };
    // const printObject = (jsonData: any) => {
    //     return (
    //         <div>
    //             <h2>Id: {jsonData.id}</h2>
    //             <h2>Name: {jsonData.name}</h2>
    //             <h2>Category: {jsonData.category}</h2>
    //             <h2>Subject: {jsonData.subject}</h2>
    //             <h2>Marks: {jsonData.marks}</h2>
    //             <h2>Duration: {jsonData.duration}</h2>
    //             <h2>Time: {jsonData.date}</h2>
    //             <h2>Status: {jsonData.status.id}</h2>
    //         </div>
    //     );
    // }

    return (
        <div className="flex p-8 bg-gray-100 w-full">
            <div className="max-w-10xl mx-auto w-full">
                <div className="bg-gray-900 rounded-lg shadow-lg mb-6 flex items-center justify-between p-6">
                    <p className="text-white text-2xl font-bold">Assign Exams</p>
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
                <div className="bg-white rounded-lg shadow-lg p-8 max-h-[70vh] overflow-y-auto">
                    {jsonData && Array.isArray(jsonData) ? printArray(jsonData) : null}
                </div>
            </div>
        </div>
    );
};

export default AssignExamsPage;
