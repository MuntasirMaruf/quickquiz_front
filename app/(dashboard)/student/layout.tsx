import "@/app/globals.css";
import SideBarStudent from "@/app/components/SideBarStudent";


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <SideBarStudent />
            <div className="w-full">{children}</div>
        </div>
    );
}
