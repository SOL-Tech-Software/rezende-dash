import { Search, Filter } from "lucide-react";

interface AtendimentoFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  filterStatus: string;
  onFilterStatusChange: (status: string) => void;
}

export function AtendimentoFilters({
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters,
  filterStatus,
  onFilterStatusChange,
}: AtendimentoFiltersProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar atendimento..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
        </div>
        <button
          onClick={onToggleFilters}
          className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 sm:w-auto w-full flex items-center justify-center gap-2"
        >
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="sm:hidden text-sm font-medium text-gray-600 dark:text-gray-300">
            Filtros
          </span>
        </button>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mt-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFilterStatusChange("todos")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === "todos"
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => onFilterStatusChange("em-andamento")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === "em-andamento"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Em Andamento
            </button>
            <button
              onClick={() => onFilterStatusChange("concluido")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === "concluido"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Concluídos
            </button>
          </div>
        </div>
      )}
    </>
  );
} 