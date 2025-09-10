"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type PageProps = {
    params: Promise<{ examid: string }>;
};

type ItemEQ = {
    exam_ssc: { id: number };
    question_cq_ssc: { id: number }
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

type ItemQ = {
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

const TakeExamPage = ({ params }: PageProps) => {
    const { examid } = React.use(params); // unwrap the promise
    const router = useRouter();


    const [jsonDataEQ, setJsonDataEQ] = useState<ItemEQ[] | null>(null);
    const [questions, setQuestions] = useState<ItemQ[]>([]);
    const [exam, setExam] = useState<ItemE>()

    useEffect(() => {
        fetchExamQuestions();
    }, []);

    async function fetchExamQuestions() {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/exam_question_ssc/all/exam_questions`
            );
            const data: ItemEQ[] = response.data;

            // Filter by examid
            const filteredData = data.filter(
                (item) => String(item.exam_ssc.id) === String(examid)
            );

            setJsonDataEQ(filteredData);

            // Fetch all detailed questions
            fetchQuestionsDetails(filteredData.map(d => d.question_cq_ssc.id));
            fetchExam(examid)
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchExam(id: (string | number)) {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/exam_question_ssc/get/exam/${id}`
            );
            const data: ItemE = response.data;
            setExam(data)

        } catch (error) {
            console.error(error);
        }
    }

    async function fetchQuestionsDetails(questionIds: (string | number)[]) {
        try {
            const responses = await Promise.all(
                questionIds.map(id =>
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/exam_question_ssc/get/question/${id}`)
                )
            );

            const dataQ: ItemQ[] = responses.map(res => res.data);
            setQuestions(dataQ);
        } catch (error) {
            console.error(error);
        }
    }

    const printArray = (questions: ItemQ[]) => {
        return questions.map((item, index) => (
            <div
                key={index}
                className="mb-4 p-6 bg-gray-700 rounded-xl shadow-lg text-white flex justify-between"
            >

                <div className="flex flex-col space-y-2 w-full">
                    <div className="flex justify-between bg-gray-900 rounded-xl p-2">
                        <p>Quesion: {index + 1}</p>
                        <p>Total Marks: {item.marks_total}</p>

                    </div>
                    <p>Scenario: {item.senario}</p>
                    <p>Question 1: {item.question_1} ({item.marks_q1} marks)</p>
                    <p>Question 2: {item.question_2} ({item.marks_q2} marks)</p>
                    <p>Question 3: {item.question_3} ({item.marks_q3} marks)</p>
                    <p>Question 4: {item.question_4} ({item.marks_q4} marks)</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="flex p-4 bg-gray-100 w-full">
            <div className="max-w-10xl mx-auto w-full">
                <div className="bg-gray-900 rounded-lg shadow-lg mb-6 flex items-center justify-between p-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Back
                    </button>
                    <p className="text-white text-2xl font-bold">Take Exams: {examid}</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 max-h-[70vh] overflow-y-auto">
                    <div className="bg-gray-900 rounded-lg shadow-lg mb-6 flex items-center justify-between p-6">
                        <p><span className="text-gray-300">Name:</span> {exam?.name}</p>
                        <p><span className="text-gray-300">Category:</span> {exam?.category}</p>
                        <p><span className="text-gray-300">Subject:</span> {exam?.subject}</p>
                        <p><span className="text-gray-300">Marks:</span> {exam?.marks}</p>
                        <p><span className="text-gray-300">Duration:</span> {exam?.duration}</p>
                    </div>
                    {questions.length > 0
                        ? printArray(questions)
                        : <p className="text-gray-500">No questions found for this exam.</p>}
                </div>
            </div>
        </div>
    );
};

export default TakeExamPage;