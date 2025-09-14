'use client'
import axios from 'axios';
import React, { useState } from 'react'

const page = () => {

    const[position, setPosition] = useState("");
    const[exam_id, setExam_id] = useState("");
    const[question_id_cq, setQuestion_id_cq] = useState("");
    
   


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = {
                position: position,
                question_id_cq: question_id_cq,
                exam_id: exam_id,
                status: 1

            }
            const res = await axios.post(
                'http://localhost:3000/exam_question_ssc/create/exam',
                data
            );
            alert("Exam Time");


        } catch (error) {
            console.error("Error submitting form:", error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                alert("Exam Time failed: " + errorMessage);
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
                    name="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full border p-2 mb-2"
                    required
                >
                    <option value="">Select  position</option>
                    <option value="Regular">First</option>
                    <option value="Model">Secound</option>
                    <option value="Test">Third</option>
                    <option value="Final Model Test">Last</option>
                </select>
               

                <input
                    name="Exam Id"
                    type="number"
                    placeholder="Exam_id"
                    value={exam_id}
                    onChange={(e) => setExam_id(e.target.value)}
                    className="w-full border p-2 mb-2"
                    required
                />
                 <input
                    name="question Id CQ"
                    type="number"
                    placeholder="question_id_cq"
                    value={question_id_cq}
                    onChange={(e) => setQuestion_id_cq(e.target.value)}
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
