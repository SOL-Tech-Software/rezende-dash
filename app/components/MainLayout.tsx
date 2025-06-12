import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <Sidebar />

      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
} 