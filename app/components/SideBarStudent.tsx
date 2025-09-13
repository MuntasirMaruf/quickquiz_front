"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, File, Bell, Home, User, Settings, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

export default function SideBarStudent() {
    const [isOpen, setIsOpen] = useState(true);
    const [activeItem, setActiveItem] = useState("dashboard");
    const router = useRouter();


    const [username, setUsername] = useState("");
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { withCredentials: true });
                if (res.data.loggedIn) {
                    setUsername(res.data.student.username);
                    router.push(`/student/${res.data.student.username}/dashboard`);
                } else {
                    router.push('/login/student');
                }
            } catch {
                router.push('/login/student');
            }
        };
        checkLogin();
    }, []);


    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: Home, page: `/student/${username}/dashboard` },
        { id: "exams", label: "Exams", icon: File, page: `/student/${username}/exams` },
        { id: "results", label: "Results", icon: Menu, page: `/student/${username}/results` },
        { id: "messages", label: "Messages", icon: Mail, page: `/student/${username}/messages` },
        { id: "notifications", label: "Notifications", icon: Bell, page: `/student/${username}/notifications` },
        { id: "profile", label: "Profile", icon: User, page: `/student/${username}/profile` },
        { id: "settings", label: "Settings", icon: Settings, page: `/student/${username}/settings` },
    ];

    useEffect(() => {
        const selectedItem = menuItems.find((item) => item.id === activeItem);
        if (selectedItem) {
            router.push(selectedItem.page);
        }
    }, [activeItem]);

    return (
        <div className={`${isOpen ? "w-64" : "w-17"} bg-gray-800 text-white transition-all duration-300 flex flex-col`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {isOpen && (
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {username}
                    </h2>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4">
                <ul className="space-y-2 px-3">
                    {menuItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveItem(item.id)}
                                    className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${activeItem === item.id
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                        }`}
                                >
                                    <IconComponent size={20} className="flex-shrink-0" />
                                    <span
                                        className={`ml-3 font-medium transition-all duration-300 overflow-hidden ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
