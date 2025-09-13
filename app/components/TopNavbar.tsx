"use client";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";

export default function TopNavbar() {
    const route= useRouter();

    return (
        <header className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-10xl mx-auto flex justify-between items-center px-6 py-6">
                {/* <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {process.env.NEXT_PUBLIC_APP_NAME}
                </h2> */}
               
                   <button  onClick= {()=>(route.back())}>Back
                    </button>
                
                

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
