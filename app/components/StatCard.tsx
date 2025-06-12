import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend: string;
  color: "indigo" | "green" | "red" | "yellow";
}

const colorClasses = {
  indigo: {
    icon: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
    trend: "text-indigo-600 dark:text-indigo-400",
    hover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
  },
  green: {
    icon: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    trend: "text-green-600 dark:text-green-400",
    hover: "group-hover:text-green-600 dark:group-hover:text-green-400"
  },
  red: {
    icon: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    trend: "text-red-600 dark:text-red-400",
    hover: "group-hover:text-red-600 dark:group-hover:text-red-400"
  },
  yellow: {
    icon: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
    trend: "text-yellow-600 dark:text-yellow-400",
    hover: "group-hover:text-yellow-600 dark:group-hover:text-yellow-400"
  }
};

export function StatCard({ label, value, icon: Icon, trend, color }: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
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
          <span className={`text-3xl font-bold text-gray-900 dark:text-white ${colors.hover} transition-colors duration-200`}>
            {value}
          </span>
          <span className="text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-200">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
} 