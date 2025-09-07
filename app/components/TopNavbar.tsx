"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TopNavbar() {
    const router = useRouter();

    return (
        <header className="bg-gray-900 text-white shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
                <button
                    onClick={() => router.back()}
                    className="mr-4 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
                >
                    Back
                </button>
                <Link href="" className="text-2xl font-bold">
                    QuickQuiz
                </Link>
                <nav className="space-x-6">
                    <Link href="/" className="hover:text-yellow-400 transition">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-yellow-400 transition">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-yellow-400 transition">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
