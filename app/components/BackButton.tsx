"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // optional icon

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-3 py-1 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition"
        >
            <ArrowLeft size={16} />
            <span>Back</span>
        </button>
    );
}
