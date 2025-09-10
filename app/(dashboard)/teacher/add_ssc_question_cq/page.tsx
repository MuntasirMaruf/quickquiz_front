'use client'
import axios from 'axios';
import React, { useState } from 'react'

const page = () => {

    const[subject, setSubject] = useState("");
    const[chapter, setchapter] = useState("");
    const[senario, setsenario] = useState("");
    const[question_1, setquestion_1] = useState("");
    const[marks_q1, setmarks_q1] = useState(0);
    const[question_2, setquestion_2] = useState("");
    const[marks_q2, setmarks_q2] = useState(0);
    const[question_3, setquestion_3] = useState("");
    const[marks_q3, setmarks_q3] = useState(0);
    const[question_4, setquestion_4] = useState("");
    const[marks_q4, setmarks_q4] = useState(0);
    const[marks_total, setmarks_total] = useState(0);
    const[exam_name, setexam_name] = useState("");
    const[institution, setinstitution] = useState("");
    const[year,setyear]= useState("");



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = {
                subject: subject,
                chapter: chapter,
                senario: senario,
                question_1: question_1,
                marks_q1: marks_q1,
                question_2: question_2,
                marks_q2: marks_q2,
                question_3 : question_3,
                marks_q3: marks_q3,
                question_4 : question_4,
                marks_q4: marks_q4,
                marks_total: marks_total,
                exam_name : exam_name,
                institution: institution,
                year: year,

            }
            const res = await axios.post(
                'http://localhost:3000/exam_question_ssc/create/question',
                data
            );
            alert("Question  creted");


        } catch (error) {
            console.error("Error Question  submitting form:", error);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || error.message;
                alert("Question  creation failed: " + errorMessage);
            } else {
                alert("Something went wrong! Please try again.");
            }
        }
    }

  return (
      <div className="max-w-3xl mx-auto mt-8 bg-white shadow rounded-2xl p-6">
      <h1 className="text-xl font-semibold mb-4">Create Exam </h1>

      <form onSubmit={handleSubmit}>
        <select
                     name="subject"
                     value={subject}
                     onChange={(e) => setSubject(e.target.value)}
                     className="w-full border p-2 mb-2 rounded"
                      required
                     >
                    <option value="">Select Exam Subject</option>
                    <option value="Physics">Physics</option>
                    <option value="Math">Math</option>
                    <option value="Bangla">Bangla</option>
        </select>
        
        <input
          name="chapter"
          placeholder="Chapter"
          value={chapter}
          onChange={(e) => setchapter(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <input
          name="senario"
          placeholder="Scenario"
          value={senario}
          onChange={(e) => setsenario(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />

        {/* Questions + Marks */}
        <input
          name="question_1"
          placeholder="Question 1"
          value={question_1}
          onChange={(e) => setquestion_1(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <input
          name="marks_q1"
          type="number"
          placeholder="Marks Q1"
          value={marks_q1}
          onChange={(e) => setmarks_q1(e.target.valueAsNumber)}
          className="w-full border p-2 mb-2 rounded"
          required
        />

        <input
          name="question_2"
          placeholder="Question 2"
          value={question_2}
          onChange={(e) => setquestion_2(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <input
          name="marks_q2"
          type="number"
          placeholder="Marks Q2"
          value={marks_q2}
          onChange={(e) => setmarks_q2(e.target.valueAsNumber)}
          className="w-full border p-2 mb-2 rounded"
          required
        />

        <input
          name="question_3"
          placeholder="Question 3"
          value={question_3}
          onChange={(e) => setquestion_3(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <input
          name="marks_q3"
          type="number"
          placeholder="Marks Q3"
          value={marks_q3}
          onChange={(e) => setmarks_q3(e.target.valueAsNumber)}
          className="w-full border p-2 mb-2 rounded"
          required
        />

        <input
          name="question_4"
          placeholder="Question 4"
          value={question_4}
          onChange={(e) => setquestion_4(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <input
          name="marks_q4"
          type="number"
          placeholder="Marks Q4"
          value={marks_q4}
          onChange={(e) => setmarks_q4(e.target.valueAsNumber)}
          className="w-full border p-2 mb-2 rounded"
          required
        />

        <input
          name="marks_total"
          type="number"
          placeholder="Total Marks"
          value={marks_total}
          readOnly
          className="w-full border p-2 mb-2 rounded bg-gray-100"
        />

        <input
          name="exam_name"
          placeholder="Exam Name"
          value={exam_name}
          onChange={(e) => setexam_name(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <input
          name="institution"
          placeholder="Institution"
          value={institution}
          onChange={(e) => setinstitution(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <input
          name="year"
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setyear(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default page
