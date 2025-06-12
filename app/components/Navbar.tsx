'use client'
import Image from "next/image";
import { Bell, Search, Settings, User } from "lucide-react";
import { useNavbarTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useNavbarTheme();
  const [mounted, setMounted] = useState(false);

  // Evita hidratação incorreta
  useEffect(() => {
    setMounted(true);
  }, []);

  // Renderiza um placeholder durante a hidratação
  if (!mounted) {
    return (
      <nav className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white border-b border-gray-200 z-30">
        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Placeholder */}
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 right-0 left-0 lg:left-64 h-16 ${theme === 'dark' ? 'bg-gradient-to-br from-white/5 to-white/10 border-gray-700' : 'bg-white border-gray-200'} border-b z-30 transition-colors duration-200`}>
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className={`block w-full pl-10 pr-3 py-2 border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-500'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200`}
              placeholder="Buscar..."
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-200`}
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button className={`p-2 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-200`}>
            <Bell className="w-5 h-5" />
          </button>

          <button className={`hidden sm:block p-2 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-200`}>
            <Settings className="w-5 h-5" />
          </button>

          <button className={`flex items-center gap-2 p-2 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-200`}>
            <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-100'} flex items-center justify-center`}>
              <User className={`w-4 h-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
} 