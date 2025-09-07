import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto m-6 flex flex-col items-center py-80 bg-gray-800 border-2 border-black rounded-md ">
      <h2 className="text-4xl font-bold mb-8 text-white">Welcome to QuickQuiz</h2>

      <div className="flex space-x-6">
        <Link
          href="/login"
          className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          href="/registration"
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
