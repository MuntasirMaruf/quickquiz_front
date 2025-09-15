"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type ExamItem = {
    id: number;
    name: string;
    category: string;
    subject: string;
    marks: number;
    duration: number;
};

type QuestionItem = {
    id: number;
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
    params: Promise<{ examid: number }>;
};

const QuestionsPage = ({ params }: PageProps) => {
    const router = useRouter();
    const [examid, setExamId] = useState<number | null>(null);
    const [exam, setExam] = useState<ExamItem | null>(null);
    const [questions, setQuestions] = useState<QuestionItem[]>([]);
    const [selectedQuestions, setSelectedQuestions] = useState<QuestionItem[]>([]);
    const [assignedQuestions, setAssignedQuestions] = useState<QuestionItem[]>([]);

    useEffect(() => {
        async function resolveParams() {
            const p = await params;
            setExamId(p.examid);
        }
        resolveParams();
    }, [params]);

    useEffect(() => {
        if (!examid) return;
        fetchExam();
        fetchQuestions();
        fetchAssignedQuestions();
    }, [examid]);

    async function fetchExam() {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/exam_question_ssc/get/exam/${examid}`);
            setExam(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchQuestions() {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/exam_question_ssc/all/questions`);
            setQuestions(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchAssignedQuestions() {
        if (!examid) return;
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/exam_question_ssc/exam_questions/${examid}`
            );
            const assigned = res.data.map((q: any) => q.question_cq_ssc);
            setAssignedQuestions(assigned);
        } catch (err) {
            console.error(err);
        }
    }

    const toggleQuestion = (q: QuestionItem) => {
        if (selectedQuestions.find((item) => item.id === q.id)) {
            setSelectedQuestions(selectedQuestions.filter((item) => item.id !== q.id));
        } else {
            if (selectedQuestions.length >= 10) return;
            setSelectedQuestions([...selectedQuestions, q]);
        }
    };

    const confirmQuestions = async () => {
        if (!examid || selectedQuestions.length === 0) return;

        try {
            for (let i = 0; i < selectedQuestions.length; i++) {
                const q = selectedQuestions[i];
                const data = {
                    exam_id: examid,
                    question_id_cq: q.id,
                    position: i + 1,
                };
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/exam_question_ssc/create/exam_question`, data);
            }
            alert("Questions added successfully!");
            try {
                const res = await axios.post('http://localhost:3000/notifications/send', {
                    interest: 'hello',
                    title: 'New exam assigned!',
                    message: 'Teacher has assigned a new exam. Check it out!',
                });
            } catch (err) {
                console.error(err);
                alert('Failed to send notification');
            }
            setSelectedQuestions([]);
            fetchAssignedQuestions();
        } catch (err) {
            console.error(err);
            alert("Failed to add questions.");
        }
    };

    return (
        <div className="flex flex-col p-8 bg-gray-100 min-h-screen">
            {/* Exam Info */}
            <div className="bg-gray-900 rounded-lg shadow-inner px-4 py-2 flex flex-wrap gap-6 justify-between mb-4">
                <p><span className="font-semibold text-gray-300">Id:</span> {examid}</p>
                <p><span className="font-semibold text-gray-300">Name:</span> {exam?.name}</p>
                <p><span className="font-semibold text-gray-300">Category:</span> {exam?.category}</p>
                <p><span className="font-semibold text-gray-300">Subject:</span> {exam?.subject}</p>
                <p><span className="font-semibold text-gray-300">Marks:</span> {exam?.marks}</p>
                <p><span className="font-semibold text-gray-300">Duration:</span> {exam?.duration} Minutes</p>
            </div>

            {/* Questions List */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-full h-full overflow-y-auto space-y-6">
                {questions
                    // Filter questions by exam subject
                    .filter((item) => item.subject === exam?.subject)
                    // Map over each question and return JSX
                    .map((item) => {
                        const isSelected = selectedQuestions.some((q) => q.id === item.id);
                        const isAssigned = assignedQuestions.some((q) => q.id === item.id);

                        return (
                            <div
                                key={item.id} // Unique key for React DOM
                                className={`mb-6 p-6 bg-gray-800 rounded-2xl shadow-lg text-white hover:shadow-2xl transition-shadow duration-300 
                                    ${isSelected ? "border-4 border-green-500" : ""}`}
                            >
                                <div className="flex flex-col sm:flex-row gap-6 p-2">
                                    {/* Left column: Scenario & Questions */}
                                    <div className="flex-1 bg-gray-700 p-5 rounded-xl space-y-3 border border-gray-600">
                                        {item.senario && <p><span className="font-semibold text-gray-300">{item.id}. Scenario:</span> {item.senario}</p>}
                                        {item.question_1 && <p><span className="font-semibold text-gray-300">Q1:</span> {item.question_1} <span className="text-gray-400">({item.marks_q1} marks)</span></p>}
                                        {item.question_2 && <p><span className="font-semibold text-gray-300">Q2:</span> {item.question_2} <span className="text-gray-400">({item.marks_q2} marks)</span></p>}
                                        {item.question_3 && <p><span className="font-semibold text-gray-300">Q3:</span> {item.question_3} <span className="text-gray-400">({item.marks_q3} marks)</span></p>}
                                        {item.question_4 && <p><span className="font-semibold text-gray-300">Q4:</span> {item.question_4} <span className="text-gray-400">({item.marks_q4} marks)</span></p>}
                                    </div>

                                    {/* Right column: Exam Details */}
                                    <div className="flex-1 bg-gray-700 p-5 rounded-xl space-y-2 border border-gray-600">
                                        <p><span className="font-semibold text-gray-300">Subject:</span> {item.subject}</p>
                                        <p><span className="font-semibold text-gray-300">Chapter:</span> {item.chapter}</p>
                                        <p><span className="font-semibold text-gray-300">Total Marks:</span> {item.marks_total}</p>
                                        <p><span className="font-semibold text-gray-300">Exam Name:</span> {item.exam_name}</p>
                                        <p><span className="font-semibold text-gray-300">Institution:</span> {item.institution}</p>
                                        <p><span className="font-semibold text-gray-300">Year:</span> {item.year}</p>
                                    </div>
                                </div>

                                {/* Add / Remove / Assigned Button */}
                                <div className="flex justify-center mt-4">
                                    <button
                                        className={`px-5 py-2 rounded-xl shadow-md transition-all duration-200 text-white 
                                            ${isAssigned ? "bg-gray-500 cursor-not-allowed"
                                                : isSelected
                                                    ? "bg-red-500 hover:bg-red-600"
                                                    : selectedQuestions.length >= 10
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
                                            }`}
                                        onClick={() => !isAssigned && toggleQuestion(item)}
                                        disabled={isAssigned || (!isSelected && selectedQuestions.length >= 10)}
                                    >
                                        {isAssigned ? "Assigned" : isSelected ? "Remove" : "Add"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                {/* Confirm Button */}
                <div className="flex justify-center mt-4">
                    <button
                        className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white shadow-md transition-all duration-200"
                        onClick={confirmQuestions}
                        disabled={selectedQuestions.length === 0}
                    >
                        Confirm Add Questions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionsPage;
