// components/Button.tsx
"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function Button({ children, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full border p-2 mt-2 rounded bg-blue-600 text-white hover:bg-blue-700"
    >
      {children}
    </button>
  );
}
