import { Clock, MessageSquare, CheckCircle2, XCircle } from "lucide-react";
import { useNavbarTheme } from "./ThemeProvider";

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
  const { theme } = useNavbarTheme();
  
  return (
    <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-white/5 to-white/10' : 'bg-white'} rounded-xl shadow-sm p-4 sm:p-6`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
        <div>
          <h2 className={`text-lg sm:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Atendimentos Recentes
          </h2>
          <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
            Últimos atendimentos realizados
          </p>
        </div>
        <button className={`w-full sm:w-auto px-4 py-2 text-sm font-medium ${theme === 'dark' ? 'text-indigo-400 bg-indigo-900/30 hover:bg-indigo-900/50' : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'} rounded-lg transition-colors duration-200`}>
          Ver todos
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`text-left border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <th className={`pb-3 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Cliente</th>
              <th className={`pb-3 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Última Mensagem</th>
              <th className={`pb-3 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Data</th>
              <th className={`pb-3 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
              <th className={`pb-3 font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Tags</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {atendimentos.map((atendimento) => (
              <tr 
                key={atendimento.id}
                className={`group ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors duration-200`}
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-100'} flex items-center justify-center`}>
                      <MessageSquare className={`w-4 h-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'} transition-colors duration-200`}>
                        {atendimento.cliente}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} line-clamp-1`}>
                    {atendimento.ultimaMensagem}
                  </p>
                </td>
                <td className="py-4">
                  <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
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
                        ? theme === 'dark' ? 'text-green-400' : 'text-green-600' 
                        : theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
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
                        className={`px-2 py-1 text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded-full`}
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

      {/* Mobile View */}
      <div className={`lg:hidden divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
        {atendimentos.map((atendimento) => (
          <div 
            key={atendimento.id}
            className={`py-4 group ${theme === 'dark' ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors duration-200`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-100'} flex items-center justify-center`}>
                <MessageSquare className={`w-4 h-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
              </div>
              <div>
                <p className={`font-medium ${theme === 'dark' ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'} transition-colors duration-200`}>
                  {atendimento.cliente}
                </p>
              </div>
            </div>

            <div className="space-y-2 pl-11">
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} line-clamp-1`}>
                {atendimento.ultimaMensagem}
              </p>

              <div className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <Clock className="w-4 h-4" />
                <span className="text-sm">{atendimento.data}</span>
              </div>

              <div className="flex items-center gap-2">
                {atendimento.status === "Concluído" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-yellow-500" />
                )}
                <span className={`text-sm font-medium ${
                  atendimento.status === "Concluído" 
                    ? theme === 'dark' ? 'text-green-400' : 'text-green-600' 
                    : theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                }`}>
                  {atendimento.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {atendimento.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded-full`}
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