"use client";
import React from "react";

type PageProps = {
    params: Promise<{ username: string }>;
};

const DashboardPage = ({ params }: PageProps) => {
    const { username } = React.use(params); // unwrap the promise
    return (
        <div className="flex p-8 bg-gray-100 w-full">
            <div className="max-w-10xl mx-auto w-full">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <p className="text-gray-600 mb-4">Hi {username}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-blue-500 text-white p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Total Exams</h3>
                                <p className="text-2xl font-bold">12</p>
                            </div>
                            <div className="bg-green-500 text-white p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Completed</h3>
                                <p className="text-2xl font-bold">8</p>
                            </div>
                            <div className="bg-yellow-500 text-white p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Average Score</h3>
                                <p className="text-2xl font-bold">85%</p>
                            </div>
                            <div className="bg-purple-500 text-white p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Rank</h3>
                                <p className="text-2xl font-bold">#15</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
