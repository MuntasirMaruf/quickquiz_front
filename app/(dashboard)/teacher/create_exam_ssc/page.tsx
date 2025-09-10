'use client'
import axios from 'axios';
import React, { useState } from 'react'

const page = () => {

    const[category, setCategory] = useState("");
    const[subject, setSubject] = useState("");
    const[marks, setMarks] = useState("");
    const[duration, setDuration] = useState("");
    const[date, setDate] = useState("");
    const [time, setTime] = useState("");



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = {
                category: category,
                subject: subject,
                marks: marks,
                duration: duration,
                date: `${date}T${time}`,
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
                alert("Exam creation failed: " + errorMessage);
            } else {
                alert("Something went wrong! Please try again.");
            }
        }
    }

  return (
     <div className="max-w-md mx-auto mt-6 border p-4 rounded">
            <form onSubmit={handleSubmit}>
                {/* Dropdown for category */}
                <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border p-2 mb-2"
                    required
                >
                    <option value="">Select Exam Category</option>
                    <option value="Regular">Regular</option>
                    <option value="Model">Model</option>
                    <option value="Test">Test</option>
                    <option value="Final Model Test">Final Model Test</option>
                </select>
                <select
                     name="subject"
                     value={subject}
                     onChange={(e) => setSubject(e.target.value)}
                     className="w-full border p-2 rounded"
                      required
                     >
                    <option value="">Select Exam Subject</option>
                    <option value="Physics">Physics</option>
                    <option value="Math">Math</option>
                    <option value="Bangla">Bangla</option>
                </select>


              

                <input
                    name="marks"
                    type="number"
                    placeholder="Add exam marks"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    className="w-full border p-2 mb-2"
                    required
                />

                <input
                    name="duration"
                    placeholder="Add exam duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full border p-2 mb-2"
                    required
                />

                <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border p-2 mb-2"
                    required
                />
                
                <input
                   type="time"
                   name="time"
                   value={time}
                   onChange={(e) => setTime(e.target.value)}
                   className="w-full border p-2 mb-2"
                   required
                 />
                

                <button
                    className="w-full border p-2 mt-2 rounded bg-blue-500 text-white"
                    type="submit"
                >
                    Register
                </button>
            </form>
        </div>
  )
}

export default page
