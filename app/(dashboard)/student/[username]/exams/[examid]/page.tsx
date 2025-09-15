"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type PageProps = {
    params: Promise<{ username: string; examid: string }>;
};

type ExamQuestionItem = {
    exam_ssc: { id: number };
    question_cq_ssc: { id: number }
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
    isExpired: boolean;
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

const ExamDetailsPage = ({ params }: PageProps) => {
    const { username, examid } = React.use(params);
    const router = useRouter();

    const [examQuestions, setexamQuestions] = useState<ExamQuestionItem[] | null>(null);
    const [questions, setQuestions] = useState<QuestionItem[]>([]);
    const [exam, setExam] = useState<ExamItem>()
    const [empty, setEmpty] = useState(false);
    const [loading, setLoading] = useState(true);
    const [examDone, setExamDone] = useState(false);

    useEffect(() => {
        fetchExamQuestions();
        fetchAnswers();
    }, []);

    async function fetchAnswers() {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/answer_ssc/answers`,
                { username, examid },
                { withCredentials: true }
            );

            if (Array.isArray(res.data) && res.data.length > 0) {
                setExamDone(true);
            } else {
                setExamDone(false);
            }
        } catch (error) {
            console.error("Error fetching answers:", error);
            setExamDone(false);
        }
    }

    async function fetchExamQuestions() {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/exam_question_ssc/all/exam_questions`
            );
            const data: ExamQuestionItem[] = response.data;

            // Filter by examid
            const filteredData = data.filter(
                (item) => String(item.exam_ssc.id) === String(examid)
            );

            setexamQuestions(filteredData);

            // Fetch all detailed questions
            fetchQuestionsDetails(filteredData.map(d => d.question_cq_ssc.id));
            fetchExam(examid)
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchExam(id: string | number) {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/exam_question_ssc/get/exam/${id}`
            );

            const exam = response.data;
            // Parse the time string (e.g., "10:30 AM")
            const [timePart, meridiem] = exam.time.split(" ");
            let [hours, minutes] = timePart.split(":").map(Number);

            if (meridiem.toUpperCase() === "PM" && hours !== 12) hours += 12;
            if (meridiem.toUpperCase() === "AM" && hours === 12) hours = 0;

            const examDateTime = new Date(exam.date);
            examDateTime.setHours(hours, minutes, 0, 0);

            exam.isExpired = new Date() > examDateTime;

            setExam(exam);
        } catch (error) {
            console.error(error);
        }
    }


    async function fetchQuestionsDetails(questionIds: (string | number)[]) {
        try {
            if (questionIds.length === 0) {
                setQuestions([]);
                setEmpty(true);
                setLoading(false);
                return;
            }

            const responses = await Promise.all(
                questionIds.map(id =>
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/exam_question_ssc/get/question/${id}`)
                )
            );

            const dataQ: QuestionItem[] = responses.map(res => res.data);
            setQuestions(dataQ);
            setEmpty(dataQ.length === 0);
        } catch (error) {
            console.error(error);
            setEmpty(true);
        } finally {
            setLoading(false);
        }
    }

    const printArray = (questions: QuestionItem[]) => {
        return questions.map((item, index) => (
            <div
                key={index}
                className="mb-6 p-6 bg-gray-700 rounded-2xl shadow-xl text-white"
            >
                {/* Question Header */}
                <div className="flex justify-between items-center bg-gray-900 rounded-xl p-3 mb-4">
                    <p className="font-semibold text-lg">Question {index + 1}</p>
                    <p className="text-gray-300 font-medium">Total Marks: {item.marks_total}</p>
                </div>

                {/* Question Details */}
                <div className="flex flex-col space-y-3 text-gray-100">
                    {item.senario && (
                        <p>
                            <span className="font-semibold text-gray-300">Scenario:</span> {item.senario}
                        </p>
                    )}
                    {item.question_1 && (
                        <p>
                            <span className="font-semibold text-gray-300">Q1:</span> {item.question_1}{" "}
                            <span className="text-gray-400">({item.marks_q1} marks)</span>
                        </p>
                    )}
                    {item.question_2 && (
                        <p>
                            <span className="font-semibold text-gray-300">Q2:</span> {item.question_2}{" "}
                            <span className="text-gray-400">({item.marks_q2} marks)</span>
                        </p>
                    )}
                    {item.question_3 && (
                        <p>
                            <span className="font-semibold text-gray-300">Q3:</span> {item.question_3}{" "}
                            <span className="text-gray-400">({item.marks_q3} marks)</span>
                        </p>
                    )}
                    {item.question_4 && (
                        <p>
                            <span className="font-semibold text-gray-300">Q4:</span> {item.question_4}{" "}
                            <span className="text-gray-400">({item.marks_q4} marks)</span>
                        </p>
                    )}
                </div>
            </div>
        ));

    };

    return (
        <div className="flex justify-center bg-gray-100 min-h-screen p-4">
            <div className="w-full max-w-10xl space-y-4">
                <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center px-4 py-2 bg-green-700 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Back
                    </button>

                    <div className="bg-gray-900 rounded-lg shadow-inner px-4 py-2 flex flex-wrap gap-6 justify-between flex-1">
                        <p><span className="font-semibold text-gray-300">Id:</span> {examid}</p>
                        <p><span className="font-semibold text-gray-300">Name:</span> {exam?.name}</p>
                        <p><span className="font-semibold text-gray-300">Category:</span> {exam?.category}</p>
                        <p><span className="font-semibold text-gray-300">Subject:</span> {exam?.subject}</p>
                        <p><span className="font-semibold text-gray-300">Marks:</span> {exam?.marks}</p>
                        <p><span className="font-semibold text-gray-300">Duration:</span> {exam?.duration} Minutes</p>
                    </div>

                    {loading ? (
                        <button
                            disabled
                            className="bg-gray-500 opacity-60 text-white px-4 py-2 rounded-lg shadow flex justify-center cursor-not-allowed"
                        >
                            Loading...
                        </button>
                    ) : exam?.isExpired || empty ? (
                        <button
                            disabled
                            className="bg-red-500 opacity-60 text-white px-4 py-2 rounded-lg shadow flex justify-center cursor-not-allowed"
                        >
                            {exam?.isExpired ? "Expired" : "No Questions"}
                        </button>
                    ) : examDone ? (
                        <Link
                            href='#'
                            className="flex items-center px-4 py-2 bg-gray-600 rounded-lg"
                        >
                            Completed
                        </Link>
                    ) : (
                        <Link
                            href={`/student/${username}/exams/${examid}/start`}
                            className="flex items-center px-4 py-2 bg-blue-700 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Start
                        </Link>
                    )}
                </div>

                <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-h-[79vh] overflow-y-auto">
                    {loading ? (
                        <p className="text-gray-400 text-center italic">Loading questions...</p>
                    ) : questions.length > 0 ? (
                        printArray(questions)
                    ) : (
                        <p className="text-gray-500 text-center italic">
                            No questions found for this exam.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );

};

export default ExamDetailsPage;