interface PageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
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