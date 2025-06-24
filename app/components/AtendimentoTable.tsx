import { ChevronRight, User, MessageSquare, Calendar } from "lucide-react";
import { Atendimento } from "../types/atendimento";
import { useNavbarTheme } from "./ThemeProvider";

interface AtendimentoTableProps {
  atendimentos: Atendimento[];
  onSelectAtendimento: (atendimento: Atendimento) => void;
}

export function AtendimentoTable({ atendimentos, onSelectAtendimento }: AtendimentoTableProps) {
  const { theme } = useNavbarTheme();
  
  return (
    <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-white/5 to-white/10' : 'bg-white'} rounded-xl shadow-sm overflow-hidden`}>
      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Cliente
              </th>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Última Mensagem
              </th>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Data
              </th>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Status
              </th>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Tags
              </th>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {atendimentos.map((atendimento) => (
              <tr
                key={atendimento.id}
                className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer transition-colors group`}
                onClick={() => onSelectAtendimento(atendimento)}
              >
                <td className="px-6 lg:px-8 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-indigo-900 group-hover:bg-indigo-800' : 'bg-indigo-100 group-hover:bg-indigo-200'} transition-colors`}>
                      <User className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    </div>
                    <div className="space-y-1">
                      <span className={`text-base font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} block`}>
                        {atendimento.cliente}
                      </span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {atendimento.numero}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 lg:px-8 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-blue-900 group-hover:bg-blue-800' : 'bg-blue-100 group-hover:bg-blue-200'} transition-colors`}>
                      <MessageSquare className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div className="space-y-1">
                      <span className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'} block`}>
                        {atendimento.ultimaMensagem}
                      </span>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} truncate max-w-[200px]`}>
                        {atendimento.ultimaInteracao}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 lg:px-8 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-purple-900 group-hover:bg-purple-800' : 'bg-purple-100 group-hover:bg-purple-200'} transition-colors`}>
                      <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <span className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {atendimento.data}
                    </span>
                  </div>
                </td>
                <td className="px-6 lg:px-8 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 inline-flex text-sm leading-5 font-semibold rounded-full ${
                      atendimento.status === "Concluído"
                        ? theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                        : theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {atendimento.status}
                    </span>
                    {atendimento.precisaAprovacao && (
                      <span className={`px-3 py-1.5 text-sm font-medium ${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} rounded-full`}>
                        Manual
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 lg:px-8 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {atendimento.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 text-sm font-medium ${theme === 'dark' ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'} rounded-full`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 lg:px-8 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <span className={`text-base ${theme === 'dark' ? 'text-gray-400 group-hover:text-indigo-400' : 'text-gray-500 group-hover:text-indigo-600'} transition-colors`}>
                      Ver detalhes
                    </span>
                    <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400 group-hover:text-indigo-400' : 'text-gray-400 group-hover:text-indigo-600'} transition-colors`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className={`lg:hidden divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
        {atendimentos.map((atendimento) => (
          <div
            key={atendimento.id}
            className={`p-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer transition-colors`}
            onClick={() => onSelectAtendimento(atendimento)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                  <User className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                </div>
                <div>
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {atendimento.cliente}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {atendimento.numero}
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {atendimento.ultimaMensagem}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {atendimento.data}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  atendimento.status === "Concluído"
                    ? theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
                    : theme === 'dark' ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {atendimento.status}
                </span>
                {atendimento.precisaAprovacao && (
                  <span className={`px-2.5 py-1 text-xs font-medium ${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} rounded-full`}>
                    Manual
                  </span>
                )}
                {atendimento.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2.5 py-1 text-xs font-medium ${theme === 'dark' ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'} rounded-full`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 