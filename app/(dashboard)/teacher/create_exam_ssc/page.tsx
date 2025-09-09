'use client'
import axios from 'axios';
import React, { useState } from 'react'

const page = () => {

    const[categroty, setCategroy] = useState("");
    const[subject, setSubject] = useState("");
    const[marks, setMarks] = useState("");
    const[duration, setDuration] = useState("");
    const[date, setDate] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = {
                categroty: categroty,
                subject: subject,
                marks: marks,
                duration: duration,
                date: date,
                status: 1

            }
            const res = await axios.post(
                'http://localhost:3000/exam_question_ssc/create/exam',
                data
            );
            alert("Exam creted");


        } catch (error) {
            console.error("Error submitting form:", error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                alert("Registration failed: " + errorMessage);
            } else {
                alert("Something went wrong! Please try again.");
            }
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
                <input
                    name="category"
                    placeholder="Add exam categroty"
                    value={categroty}
                    onChange={(e) => setCategroy(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <input
                    name="subject"
                    placeholder="Add exam Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <input
                    name="marks"
                    type ='number'
                    placeholder="Add exam marks"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <input
                    name="duration"
                    placeholder="Add exam duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <button className="w-full border p-2 mt-2 rounded"
                    type="submit"

                >Register

                </button>

        </form>
    </div>
  )
}

export default page
