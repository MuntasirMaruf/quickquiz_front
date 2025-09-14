"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type PageProps = {
    params: Promise<{ username: string; examid: string }>;
};

type ExamQuestionItem = {
    id: number;
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

const StartExamPage = ({ params }: PageProps) => {
    const { username, examid } = React.use(params);
    const router = useRouter();

    const [examQuestions, setexamQuestions] = useState<ExamQuestionItem[] | null>(null);
    const [questions, setQuestions] = useState<QuestionItem[]>([]);
    const [exam, setExam] = useState<ExamItem>();
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    const [studentId, setStudentId] = useState();

    useEffect(() => {
        fetchExamQuestions();
        fetchStudent();
    }, []);

    const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!exam?.duration || questions.length === 0) return; // Don't start timer if no questions

        const totalMinutes = Number(exam.duration); // duration in minutes
        const examEndTime = Date.now() + totalMinutes * 60 * 1000;

        setTimeLeft({ minutes: totalMinutes, seconds: 0 });

        const interval = setInterval(() => {
            const diff = examEndTime - Date.now();
            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft({ minutes: 0, seconds: 0 });
                alert("Time is up! Your answers will be submitted automatically.");

                // Auto-submit answers
                handleSubmitAuto();
                return;
            }

            const minutes = Math.floor(diff / 1000 / 60);
            const seconds = Math.floor((diff / 1000) % 60);
            setTimeLeft({ minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, [exam?.duration, questions.length]);


    const handleSubmitAuto = async () => {
        if (!examQuestions || examQuestions.length === 0) return;

        try {
            for (let i = 0; i < examQuestions.length; i++) {
                const q = examQuestions[i];

                const payload = {
                    answer_1: answers[`q${i}_1`] || "",
                    answer_2: answers[`q${i}_2`] || "",
                    answer_3: answers[`q${i}_3`] || "",
                    answer_4: answers[`q${i}_4`] || "",
                    exam_question_id: q.id,
                    exam_id: examid,
                    student_id: studentId,
                    teacher_id: null,
                };

                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/answer_ssc/create`,
                    payload,
                    { withCredentials: true }
                );
            }

            alert("All answers saved successfully!");
            router.back();
        } catch (error) {
            console.error(error);
            alert("Something went wrong while submitting answers.");
        }
    };



    async function fetchExamQuestions() {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/exam_question_ssc/all/exam_questions`
            );
            const data: ExamQuestionItem[] = response.data;

            const filteredData = data.filter(
                (item) => String(item.exam_ssc.id) === String(examid)
            );

            setexamQuestions(filteredData);
            fetchQuestionsDetails(filteredData.map(d => d.question_cq_ssc.id));
            fetchExam(examid);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchStudent() {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/student/retrieve/${username}`,
                {
                    withCredentials: true
                }
            );
            setStudentId(response.data.id)
        }
        catch (error) {
            console.error(error);
        }
    }

    async function fetchExam(id: (string | number)) {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/exam_question_ssc/get/exam/${id}`
            );
            setExam(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchQuestionsDetails(questionIds: (string | number)[]) {
        try {
            if (questionIds.length === 0) {
                setQuestions([]);
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
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (key: string, value: string) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmitAuto();
    };

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

                {/* Question Details + Answer Fields */}
                <div className="flex flex-col space-y-3 text-gray-100">
                    {item.senario && (
                        <p>
                            <span className="font-semibold text-gray-300">Scenario:</span> {item.senario}
                        </p>
                    )}
                    {item.question_1 && (
                        <div>
                            <p>
                                <span className="font-semibold text-gray-300">Q1:</span> {item.question_1}{" "}
                                <span className="text-gray-400">({item.marks_q1} marks)</span>
                            </p>
                            <textarea
                                value={answers[`q${index}_1`] || ""}
                                onChange={(e) => handleChange(`q${index}_1`, e.target.value)}
                                placeholder="Write your answer..."
                                className="mt-1 w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                                rows={3}
                            />
                        </div>
                    )}
                    {item.question_2 && (
                        <div>
                            <p>
                                <span className="font-semibold text-gray-300">Q2:</span> {item.question_2}{" "}
                                <span className="text-gray-400">({item.marks_q2} marks)</span>
                            </p>
                            <textarea
                                value={answers[`q${index}_2`] || ""}
                                onChange={(e) => handleChange(`q${index}_2`, e.target.value)}
                                placeholder="Write your answer..."
                                className="mt-1 w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                                rows={3}
                            />
                        </div>
                    )}
                    {item.question_3 && (
                        <div>
                            <p>
                                <span className="font-semibold text-gray-300">Q3:</span> {item.question_3}{" "}
                                <span className="text-gray-400">({item.marks_q3} marks)</span>
                            </p>
                            <textarea
                                value={answers[`q${index}_3`] || ""}
                                onChange={(e) => handleChange(`q${index}_3`, e.target.value)}
                                placeholder="Write your answer..."
                                className="mt-1 w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                                rows={3}
                            />
                        </div>
                    )}
                    {item.question_4 && (
                        <div>
                            <p>
                                <span className="font-semibold text-gray-300">Q4:</span> {item.question_4}{" "}
                                <span className="text-gray-400">({item.marks_q4} marks)</span>
                            </p>
                            <textarea
                                value={answers[`q${index}_4`] || ""}
                                onChange={(e) => handleChange(`q${index}_4`, e.target.value)}
                                placeholder="Write your answer..."
                                className="mt-1 w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                                rows={3}
                            />
                        </div>
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

                    {exam?.duration && (
                        <p className="font-bold text-green-400">
                            Time Left: {timeLeft.minutes}:{timeLeft.seconds.toString().padStart(2, "0")}
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
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

                        {questions.length > 0 && (
                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-semibold shadow-lg transition duration-300"
                                >
                                    Submit Answers
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StartExamPage;
