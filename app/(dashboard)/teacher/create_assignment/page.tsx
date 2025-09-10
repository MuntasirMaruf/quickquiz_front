"use client";

import React, { useMemo, useState } from "react";
import axios from "axios";

type Question = {
  id: string;
  prompt: string;
  points: number | "";
};

const TeacherCreateAssignmentPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [klass, setKlass] = useState(""); // class/section
  const [dueDate, setDueDate] = useState("");
  const [instructions, setInstructions] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { id: crypto.randomUUID(), prompt: "", points: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const totalPoints = useMemo(
    () =>
      questions.reduce(
        (sum, q) => sum + (typeof q.points === "number" ? q.points : 0),
        0
      ),
    [questions]
  );

  const addQuestion = () =>
    setQuestions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), prompt: "", points: "" },
    ]);

  const removeQuestion = (id: string) =>
    setQuestions((prev) => (prev.length > 1 ? prev.filter((q) => q.id !== id) : prev));

  const updateQuestion = (id: string, patch: Partial<Question>) =>
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...patch } : q))
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // simple validation
    if (!title || !subject || !klass || !dueDate) {
      setError("Please fill in Title, Subject, Class/Section, and Due date.");
      return;
    }
    if (questions.some((q) => !q.prompt || q.points === "")) {
      setError("Please complete all questions and their points.");
      return;
    }

    const payload = {
      title,
      subject,
      class: klass,
      due_at: new Date(dueDate).toISOString(),
      instructions,
      total_points: totalPoints,
      questions: questions.map((q, idx) => ({
        order: idx + 1,
        prompt: q.prompt.trim(),
        points: Number(q.points),
      })),
    };

    try {
      setSubmitting(true);
      // TODO: change to your backend route
      await axios.post("http://localhost:3000/assignments", payload);
      alert("Assignment created!");
      // Reset
      setTitle("");
      setSubject("");
      setKlass("");
      setDueDate("");
      setInstructions("");
      setQuestions([{ id: crypto.randomUUID(), prompt: "", points: "" }]);
    } catch (err: unknown) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

        {/* Dashboard card like your screenshot */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Assignments</h2>
          <p className="text-gray-500">Create and grade assignments</p>
          <button
            onClick={addQuestion}
            className="mt-3 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            type="button"
          >
            Add a new question
          </button>
        </div>

        {/* Create Assignment Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold mb-4">Create Assignment</h3>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Title</label>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Algebra Homework 3"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Subject</label>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Math, Physics, English…"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Class / Section</label>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={klass}
                onChange={(e) => setKlass(e.target.value)}
                placeholder="e.g., Grade 9 - A"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Due date & time</label>
              <input
                type="datetime-local"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Instructions</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Write any special instructions for students…"
              />
            </div>
          </div>

          {/* Questions */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Questions</h4>
              <div className="text-sm text-gray-600">
                Total points: <span className="font-semibold">{totalPoints}</span>
              </div>
            </div>

            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="rounded-xl border border-gray-200 p-4 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeQuestion(q.id)}
                    className="text-sm text-red-600 hover:underline disabled:opacity-50"
                    disabled={questions.length === 1}
                    title={questions.length === 1 ? "At least one question is required" : ""}
                  >
                    Remove
                  </button>
                </div>

                <label className="block text-sm text-gray-700 mb-1">
                  Prompt
                </label>
                <input
                  className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={q.prompt}
                  onChange={(e) => updateQuestion(q.id, { prompt: e.target.value })}
                  placeholder="Describe the task students should complete…"
                  required
                />

                <label className="block text-sm text-gray-700 mb-1">
                  Points
                </label>
                <input
                  type="number"
                  min={0}
                  className="w-40 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={q.points}
                  onChange={(e) =>
                    updateQuestion(q.id, {
                      points: e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Add another question
            </button>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
            >
              {submitting ? "Creating…" : "Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherCreateAssignmentPage;
