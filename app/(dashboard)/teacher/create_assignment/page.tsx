"use client";

import React, { useState } from "react";
import axios from "axios";
import Button from "@/app/components/teacher/Button";

export default function CreateAssignment() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState(""); 
  const [dueDate, setDueDate] = useState("");
  const [instructions, setInstructions] = useState("");
  const [questions, setQuestions] = useState([
    { prompt: "", points: "" as number | string },
  ]);
  
  const [error, setError] = useState("");

  const addQuestion = () =>
    setQuestions((q) => [...q, { prompt: "", points: "" }]);

  const removeQuestion = (index: number) => {
  if (questions.length > 1) {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  }
};


  const changePrompt = (index: number, value: string) =>
    setQuestions((q) => q.map((it, i) => (i === index ? { ...it, prompt: value } : it)));

  const changePoints = (index: number, value: string) =>
    setQuestions((q) =>
      q.map((it, i) => (i === index ? { ...it, points: value } : it))
    );

  const totalPoints = questions.reduce(
    (sum, q) => sum + Number(q.points || 0),
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !subject || !className || !dueDate) {
      setError("Please fill Title, Subject, Class and Due date.");
      return;
    }
    if (questions.some((q) => !q.prompt || q.points === "")) {
      setError("Fill every question and its points.");
      return;
    }

    const data = {
      title,
      subject,
      class: className, // key sent to backend is "class"
      due_at: new Date(dueDate).toISOString(),
      instructions,
      total_points: totalPoints,
      questions: questions.map((q, i) => ({
        order: i + 1,
        prompt: q.prompt,
        points: Number(q.points),
      })),
    };

    try {
      await axios.post("http://localhost:3000/assignments", data);
      alert("Assignment created!");
      // reset
      setTitle("");
      setSubject("");
      setClassName("");
      setDueDate("");
      setInstructions("");
      setQuestions([{ prompt: "", points: "" }]);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Something went wrong.");
    } 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto w-full max-w-3xl rounded-xl border bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-semibold">Create Assignment</h1>

        {error && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />

          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Class / Section"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />

          <input
            type="datetime-local"
            className="w-full rounded border px-3 py-2"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <textarea
            className="w-full rounded border px-3 py-2"
            rows={3}
            placeholder="Instructions (optional)"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Questions</h2>
              <div className="text-sm text-gray-600">
                Total points: <b>{totalPoints}</b>
              </div>
            </div>

            {questions.map((q, i) => (
              <div key={i} className="rounded border bg-gray-50 p-3">
                <input
                  className="mb-2 w-full rounded border px-3 py-2"
                  placeholder={`Question ${i + 1}`}
                  value={q.prompt}
                  onChange={(e) => changePrompt(i, e.target.value)}
                  required
                />
                <input
                  type="number"
                  min={0}
                  className="w-40 rounded border px-3 py-2"
                  placeholder="Points"
                  value={q.points}
                  onChange={(e) => changePoints(i, e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="ml-3 rounded bg-red-600 px-3 py-2 text-sm text-white disabled:opacity-50"
                  onClick={() => removeQuestion(i)}
                  disabled={questions.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}

           
             <Button type="submit"> Add question</Button>
          </div>

           <Button type="submit">Create Assignment</Button>
        </form>
      </div>
    </div>
  );
}
