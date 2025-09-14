"use client";

import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="w-full min-h-screen bg-gray-50 text-gray-800">
            <section className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white py-16">
                <div className="max-w-5xl mx-auto text-center px-4">
                    <h1 className="text-4xl sm:text-5xl font-bold">Contact QuickQuiz</h1>
                    <p className="mt-4 text-lg text-blue-100">
                        We’re here to help with questions, feedback, or support.
                    </p>
                </div>
            </section>

            <section className="py-14">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="border p-6 rounded-lg bg-white shadow-sm text-center">
                        <Mail size={36} className="mx-auto text-blue-600 mb-3" />
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <p className="text-gray-600 text-sm">support@quickquiz.com</p>
                    </div>

                    <div className="border p-6 rounded-lg bg-white shadow-sm text-center">
                        <Phone size={36} className="mx-auto text-green-600 mb-3" />
                        <h3 className="font-semibold text-lg mb-1">Phone</h3>
                        <p className="text-gray-600 text-sm">+880 1234 567890</p>
                    </div>

                    <div className="border p-6 rounded-lg bg-white shadow-sm text-center">
                        <MapPin size={36} className="mx-auto text-indigo-600 mb-3" />
                        <h3 className="font-semibold text-lg mb-1">Office</h3>
                        <p className="text-gray-600 text-sm">
                            Dhaka, Bangladesh <br /> (Remote-friendly)
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white py-14">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-2xl font-semibold text-center mb-8">
                        Send Us a Message
                    </h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Message sent! Thank you for communicating.");
                        }}
                        className="grid gap-5"
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                placeholder="Write your message here..."
                                rows={4}
                                className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-md shadow"
                        >
                            <MessageSquare size={18} /> Send Message
                        </button>
                    </form>
                </div>
            </section>

            <section className="bg-gray-900 text-white py-12">
                <div className="max-w-3xl mx-auto text-center px-4">
                    <h2 className="text-2xl font-semibold mb-4">Need Immediate Help?</h2>
                    <p className="text-gray-300 mb-6">
                        Visit our{" "}
                        <a href="/faq" className="text-blue-400 hover:underline">
                            FAQ page
                        </a>{" "}
                        or chat with support for quick answers.
                    </p>
                    <a
                        href="/faq"
                        className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
                    >
                        Go to FAQ
                    </a>
                </div>
            </section>
        </div>
    );
}
