'use client'
import { BarChart2, MessageSquare, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart2
  },
  {
    name: "Atendimentos",
    href: "/atendimentos",
    icon: MessageSquare
  },
  {
    name: "Configurações",
    href: "/configuracoes",
    icon: Settings
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transition-colors duration-200">
      <div className="h-16 flex items-center px-8 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
          AI Automation
        </h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
} 