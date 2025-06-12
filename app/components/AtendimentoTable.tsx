import { ChevronRight, User, MessageSquare, Calendar } from "lucide-react";
import { Atendimento } from "../types/atendimento";

interface AtendimentoTableProps {
  atendimentos: Atendimento[];
  onSelectAtendimento: (atendimento: Atendimento) => void;
}

export function AtendimentoTable({ atendimentos, onSelectAtendimento }: AtendimentoTableProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="px-8 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-8 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Última Mensagem
              </th>
              <th className="px-8 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Data
              </th>
              <th className="px-8 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-8 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tags
              </th>
              <th className="px-8 py-5 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {atendimentos.map((atendimento) => (
              <tr
                key={atendimento.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors group"
                onClick={() => onSelectAtendimento(atendimento)}
              >
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-indigo-100 dark:bg-indigo-900 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors">
                      <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-base font-medium text-gray-900 dark:text-white block">
                        {atendimento.cliente}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {atendimento.numero}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-base text-gray-900 dark:text-white block">
                        {atendimento.ultimaMensagem}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                        {atendimento.ultimaInteracao}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900 group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                      <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-base text-gray-900 dark:text-white">
                      {atendimento.data}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${
                      atendimento.status === "Concluído"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}>
                      {atendimento.status}
                    </span>
                    {atendimento.precisaAprovacao && (
                      <span className="px-3 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                        Manual
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {atendimento.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-8 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <span className="text-base text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Ver detalhes
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
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