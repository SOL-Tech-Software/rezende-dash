import { useNavbarTheme } from "./ThemeProvider";

interface PageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  const { theme } = useNavbarTheme();
  
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h1>
          <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
            {description}
          </p>
        </div>
        {children && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
} 