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
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    );
}
