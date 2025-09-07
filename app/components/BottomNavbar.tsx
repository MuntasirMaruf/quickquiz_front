import Link from "next/link";

export default function BottomNavbar() {
    return (
        <footer className="bg-gray-100 border-t">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center p-4 text-gray-600">
                <p>&copy; 2025 Your Company. All rights reserved.</p>
                <nav className="flex space-x-4 mt-2 md:mt-0">
                    <Link href="/privacy" className="hover:text-gray-900 transition">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-gray-900 transition">
                        Terms of Service
                    </Link>
                    <Link href="/cookies" className="hover:text-gray-900 transition">
                        Cookie Policy
                    </Link>
                </nav>
            </div>
        </footer>
    );
}