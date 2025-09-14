"use client";

import { BookOpen, Timer, Award, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="w-full min-h-screen bg-gray-50 text-gray-800">
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
                <div className="max-w-5xl mx-auto text-center px-4">
                    <h1 className="text-4xl sm:text-5xl font-bold">About QuickQuiz</h1>
                    <p className="mt-4 text-lg text-blue-100">
                        A modern online assessment platform built for fast, fair, and fun exams.
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-600">
                        At <span className="font-semibold text-blue-600">QuickQuiz</span>, we aim to simplify
                        the way students and professionals take assessments. We provide a smooth, reliable,
                        and engaging platform so you can focus on learning — not logistics.
                    </p>
                </div>
            </section>

            <section className="bg-white py-14">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-2xl font-semibold text-center mb-10">Why Choose QuickQuiz?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="border p-6 rounded-lg text-center shadow-sm">
                            <Timer className="mx-auto text-blue-600 mb-4" size={36} />
                            <h3 className="font-semibold text-lg mb-2">Instant Exams</h3>
                            <p className="text-gray-600 text-sm">
                                Start your assessment anytime, anywhere, with zero delays.
                            </p>
                        </div>

                        <div className="border p-6 rounded-lg text-center shadow-sm">
                            <BookOpen className="mx-auto text-green-600 mb-4" size={36} />
                            <h3 className="font-semibold text-lg mb-2">Diverse Subjects</h3>
                            <p className="text-gray-600 text-sm">
                                From academics to professional skills — we’ve got you covered.
                            </p>
                        </div>

                        <div className="border p-6 rounded-lg text-center shadow-sm">
                            <Award className="mx-auto text-yellow-600 mb-4" size={36} />
                            <h3 className="font-semibold text-lg mb-2">Smart Scoring</h3>
                            <p className="text-gray-600 text-sm">
                                Accurate grading with instant feedback and detailed analytics.
                            </p>
                        </div>

                        <div className="border p-6 rounded-lg text-center shadow-sm">
                            <ShieldCheck className="mx-auto text-indigo-600 mb-4" size={36} />
                            <h3 className="font-semibold text-lg mb-2">Secure & Reliable</h3>
                            <p className="text-gray-600 text-sm">
                                Enterprise-grade security keeps your exams and data safe.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-900 text-white py-12">
                <div className="max-w-3xl mx-auto text-center px-4">
                    <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
                    <p className="text-gray-300 mb-6">
                        Join thousands of learners who trust QuickQuiz for smooth and secure assessments.
                    </p>
                    <a
                        href="/registration"
                        className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
                    >
                        Create Your Account
                    </a>
                </div>
            </section>
        </div>
    );
}
