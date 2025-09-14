"use client";

import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

/**
 * TeacherSidebar
 * - Responsive (collapsible on mobile)
 * - Active link highlighting using usePathname()
 * - Routes that depend on [username] are built from useParams()
 * - Minimal Tailwind styling; tweak as you like
 */
export default function TeacherSidebar() {
  const pathname = usePathname();
  const params = useParams<{ username?: string }>();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Pull username from route if available (e.g., /teacher/[username]/...)
  const username = params?.username ?? "";

  const nav = useMemo(() => {
    // Build links that depend on username safely
    const u = encodeURIComponent(username);
    return [
      { label: "Dashboard", href: username ? `/teacher/${u}` : "/teacher" },
      { label: "Profile", href: username ? `/teacher/${u}/profile` : "/teacher/login" },
      // Registration is usually global (no username in path)
      { label: "Register", href: "/teacher/register" },
      { label: "Classes", href: username ? `/teacher/${u}/classes` : "/teacher/login" },
      { label: "Exams", href: username ? `/teacher/${u}/exams` : "/teacher/login" },
      { label: "Question Bank", href: username ? `/teacher/${u}/questions` : "/teacher/login" },
      { label: "Settings", href: username ? `/teacher/${u}/settings` : "/teacher/login" },
    ];
  }, [username]);

  const isActive = (href: string) => {
    // Exact for root-like dash, otherwise startsWith is handy for nested routes
    if (href === "/teacher" || href === `/teacher/${username}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    // TODO: replace with your real logout (clear tokens, hit /api/logout, etc.)
    // Example:
    // await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-semibold">Menu</span>
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="teacher-sidebar"
            className="border rounded px-3 py-1 text-sm"
          >
            {open ? "Close" : "Open"}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        id="teacher-sidebar"
        className={`fixed z-30 inset-y-0 left-0 w-64 transform bg-white border-r shadow-sm
                    transition-transform duration-200 ease-in-out
                    ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        role="navigation"
        aria-label="Teacher navigation"
      >
        <div className="h-full flex flex-col">
          {/* Brand / Header */}
          <div className="px-4 py-4 border-b">
            <Link href="/" className="block">
              <span className="text-lg font-bold">QuickQuiz</span>
              <span className="block text-xs text-gray-500">
                {username ? `Teacher: ${username}` : "Teacher Portal"}
              </span>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-sm
                      ${isActive(item.href)
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Actions */}
          <div className="p-3 border-t">
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm rounded-md border hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Content spacer on large screens */}
      <div className="hidden lg:block w-64 shrink-0" aria-hidden="true" />
    </>
  );
}
