import { LucideIcon } from "lucide-react";
import { useNavbarTheme } from "./ThemeProvider";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend: string;
  color: "indigo" | "green" | "red" | "yellow";
}

const colorClasses = {
  indigo: {
    light: {
      icon: "bg-indigo-100 text-indigo-600",
      trend: "text-indigo-600",
      hover: "group-hover:text-indigo-600"
    },
    dark: {
      icon: "bg-indigo-900/30 text-indigo-400",
      trend: "text-indigo-400",
      hover: "group-hover:text-indigo-400"
    }
  },
  green: {
    light: {
      icon: "bg-green-100 text-green-600",
      trend: "text-green-600",
      hover: "group-hover:text-green-600"
    },
    dark: {
      icon: "bg-green-900/30 text-green-400",
      trend: "text-green-400",
      hover: "group-hover:text-green-400"
    }
  },
  red: {
    light: {
      icon: "bg-red-100 text-red-600",
      trend: "text-red-600",
      hover: "group-hover:text-red-600"
    },
    dark: {
      icon: "bg-red-900/30 text-red-400",
      trend: "text-red-400",
      hover: "group-hover:text-red-400"
    }
  },
  yellow: {
    light: {
      icon: "bg-yellow-100 text-yellow-600",
      trend: "text-yellow-600",
      hover: "group-hover:text-yellow-600"
    },
    dark: {
      icon: "bg-yellow-900/30 text-yellow-400",
      trend: "text-yellow-400",
      hover: "group-hover:text-yellow-400"
    }
  }
};

export function StatCard({ label, value, icon: Icon, trend, color }: StatCardProps) {
  const { theme } = useNavbarTheme();
  const colors = theme === 'dark' ? colorClasses[color].dark : colorClasses[color].light;

  return (
    <div className={`group ${theme === 'dark' ? 'bg-gradient-to-br from-white/5 to-white/10' : 'bg-white'} rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${colors.icon}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className={`text-sm font-medium ${colors.trend}`}>
            {trend}
          </span>
        </div>
        <div className="flex flex-col">
          <span className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} ${colors.hover} transition-colors duration-200`}>
            {value}
          </span>
          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-2 transition-colors duration-200`}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );
} 