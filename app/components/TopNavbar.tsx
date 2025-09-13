import Link from "next/link";
import BackButton from "./BackButton";
import AppName from "./AppName";

export default function TopNavbar() {

    return (
        <header className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-10xl mx-auto flex justify-between items-center px-6 py-5">

                <BackButton />

                <AppName />

                {/* Right section (Nav links) */}
                <nav className="flex items-center space-x-6">
                    <Link
                        href="/"
                        className="hover:text-yellow-400 transition-colors font-medium"
                    >
                        Login/Registration
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
