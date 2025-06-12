import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useNavbarTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme } = useNavbarTheme();
  const [mounted, setMounted] = useState(false);
  
  // Evita hidratação incorreta
  useEffect(() => {
    setMounted(true);
  }, []);

  // Renderiza um layout básico durante a hidratação
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="lg:ml-64 pt-16 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <Navbar />
      <Sidebar />

      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
} 