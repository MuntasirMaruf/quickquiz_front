import { ArrowLeft } from "lucide-react";

export default function BackButton() {

    return (
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {process.env.NEXT_PUBLIC_APP_NAME}
        </h2>
    );
}
