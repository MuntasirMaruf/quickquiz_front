"use client";

import React, { useState, useEffect, use } from "react";
import axios from "axios";
import Link from "next/link";

type ExamItem = {
    id: number | string;
    name: string;
    category: string;
    subject: string;
    marks: number;
    duration: string;
    date: string;
    time: string;
    isExpired?: boolean;
};

type PageProps = {
    params: Promise<{ username: string }>;
};

const AssignExamsPage = ({ params }: PageProps) => {
    const { username } = use(params);

    const [jsonData, setJsonData] = useState<ExamItem[] | null>(null);

    useEffect(() => {
        fetchExams();
    }, []);

    async function fetchExams() {
        try {
            const response = await axios.get(
                process.env.NEXT_PUBLIC_API_URL + "/exam_question_ssc/all/exams"
            );
            const data: ExamItem[] = response.data.map((exam: any) => {
                // Convert time to 24-hour format
                const [timePart, meridiem] = exam.time.split(" ");
                let [hours, minutes] = timePart.split(":").map(Number);
                if (meridiem.toUpperCase() === "PM" && hours !== 12) hours += 12;
                if (meridiem.toUpperCase() === "AM" && hours === 12) hours = 0;

                const examDateTime = new Date(exam.date);
                examDateTime.setHours(hours, minutes, 0, 0);

                return { ...exam, isExpired: new Date() > examDateTime };
            });
            setJsonData(data);
        } catch (error) {
            console.error(error);
        }
    }

    const printArray = (jsonData: ExamItem[]) => {
        return jsonData.map((item, index) => {
            return (

                <div
                    key={index}
                    className="mb-4 p-6 bg-gray-700 rounded-xl shadow-lg text-white flex justify-between items-center"
                >
                    Info Section
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
                            <p><span className="text-gray-400">Date:</span> {item.date.split("T")[0]}</p>
                            <p><span className="text-gray-300">Due:</span> {item.time}</p>
                        </div>
                    </div>

                    <Link
                        href={`assign_exams/${item.id}`}
                        onClick={(e) => {
                            if (item.isExpired) e.preventDefault(); // prevent navigation if expired
                        }}
                        className={`px-4 py-2 rounded-lg shadow flex justify-center text-white ${item.isExpired
                            ? "bg-red-500 opacity-60 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {item.isExpired ? "Expired" : "Add Questions"}
                    </Link>

                </div>

            );
        });
    };

    return (
        <div className="flex p-8 bg-gray-100 w-full h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full h-full overflow-y-auto">
                {jsonData && Array.isArray(jsonData) ? printArray(jsonData) : null}
            </div>
        </div>
    );
};

export default AssignExamsPage;
