import { Clock, MessageSquare, CheckCircle2, XCircle } from "lucide-react";

interface RecentAtendimento {
  id: number;
  cliente: string;
  ultimaMensagem: string;
  data: string;
  status: "Em andamento" | "Concluído";
  tags: string[];
}

interface RecentAtendimentosTableProps {
  atendimentos: RecentAtendimento[];
}

export function RecentAtendimentosTable({ atendimentos }: RecentAtendimentosTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
            Atendimentos Recentes
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
            Últimos atendimentos realizados
          </p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors duration-200">
          Ver todos
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200 dark:border-gray-700">
              <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Cliente</th>
              <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Última Mensagem</th>
              <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Data</th>
              <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {atendimentos.map((atendimento) => (
              <tr 
                key={atendimento.id}
                className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {atendimento.cliente}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-1">
                    {atendimento.ultimaMensagem}
                  </p>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{atendimento.data}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    {atendimento.status === "Concluído" ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      atendimento.status === "Concluído" 
                        ? "text-green-600 dark:text-green-400" 
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}>
                      {atendimento.status}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-2">
                    {atendimento.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 