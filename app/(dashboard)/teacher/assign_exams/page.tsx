"use client";

import React, { useState, useEffect, useMemo, use } from "react";
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
    isExpired: boolean
};

type QuestionItem = {
    id: number | string;
    subject: string;
    chapter: string;
    senario: string;
    question_1: string;
    marks_q1: number;
    question_2: string;
    marks_q2: number;
    question_3: string;
    marks_q3: number;
    question_4: string;
    marks_q4: number;
    marks_total: number;
    exam_name: string;
    institution: string;
    year: number;
    status: { id: number };
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
            const data: ExamItem[] = response.data;
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
                            <p><span className="text-gray-400">Date:</span> {item.date.split("T")[0]}</p>
                            <p><span className="text-gray-300">Due:</span> {item.time}</p>
                        </div>


                    </div>

                    <Link className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow flex justify-center"
                        href={`assign_exams/${item.id}`}
                    >
                        Add Questions
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
