"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TopNavbar() {
    const router = useRouter();

    return (
        <header className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-10xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Left section (Back + Logo) */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        <span className="hidden sm:inline">Back</span>
                    </button>
                </div>

                {/* Right section (Nav links) */}
                <nav className="flex items-center space-x-6">
                    <Link
                        href="/"
                        className="hover:text-yellow-400 transition-colors font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-yellow-400 transition-colors font-medium"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="hover:text-yellow-400 transition-colors font-medium"
                    >
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
}
