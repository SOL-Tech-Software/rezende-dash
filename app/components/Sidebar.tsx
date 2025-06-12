'use client'
import { Home as HomeIcon, MessageCircle, HelpCircle, Building2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  {
    href: "/",
    icon: <HomeIcon className="w-5 h-5" />,
    label: "Home"
  },
  {
    href: "/atendimentos",
    icon: <MessageCircle className="w-5 h-5" />,
    label: "Atendimentos"
  },
  {
    href: "/ajuda",
    icon: <HelpCircle className="w-5 h-5" />,
    label: "Ajuda e Configurações"
  }
];

const companyItem: NavItem = {
  href: "/soltech",
  icon: <Building2 className="w-5 h-5" />,
  label: "Soltech Solutions"
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
              (pathname === item.href || (item.href === "/" && pathname === "/dashboard")) 
                ? "bg-gray-100 dark:bg-gray-700 font-medium" 
                : ""
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href={companyItem.href}
            className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {companyItem.icon}
            <span>{companyItem.label}</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
} 