import { X, Settings, MessageSquare, Edit } from "lucide-react";
import { useNavbarTheme } from "./ThemeProvider";

interface Atendimento {
  id: number;
  numero: string;
  ultimaMensagem: string;
  data: string;
  status: "Em andamento" | "Concluído";
  precisaAprovacao: boolean;
  cliente: string;
  tags: string[];
  ultimaInteracao: string;
}

interface AtendimentoDetailsModalProps {
  atendimento: Atendimento;
  onClose: () => void;
}

export function AtendimentoDetailsModal({ atendimento, onClose }: AtendimentoDetailsModalProps) {
  const { theme } = useNavbarTheme();
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className={`relative w-full max-w-4xl ${theme === 'dark' ? 'bg-gradient-to-br from-white/5 to-white/10' : 'bg-white'} rounded-xl shadow-xl`}>
            {/* Header */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} gap-4 sm:gap-0`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-100'} flex items-center justify-center`}>
                  <MessageSquare className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                </div>
                <div>
                  <h2 className={`text-lg sm:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Atendimento #{atendimento.numero}
                  </h2>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    {atendimento.data}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className={`p-2 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className={`p-2 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                      Informações do Cliente
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          Nome
                        </span>
                        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {atendimento.cliente}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          Status
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          atendimento.status === "Concluído"
                            ? theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                            : theme === 'dark' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {atendimento.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                      Tags e Categorização
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {atendimento.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2.5 py-1 text-xs font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded-full`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                      Status e Interações
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          Precisa Aprovação
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          atendimento.precisaAprovacao
                            ? theme === 'dark' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                            : theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                        }`}>
                          {atendimento.precisaAprovacao ? "Sim" : "Não"}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          Última Mensagem
                        </span>
                        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {atendimento.ultimaMensagem}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                      Última Interação
                    </h3>
                    <div className={`${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg p-4`}>
                      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {atendimento.ultimaInteracao}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4 p-4 sm:p-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <button className={`w-full sm:w-auto px-4 py-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-200 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'} rounded-lg`}>
                <Edit className="w-4 h-4 inline-block mr-2" />
                Editar
              </button>
              <button className={`w-full sm:w-auto px-4 py-2 text-sm font-medium text-white ${theme === 'dark' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} rounded-lg`}>
                <MessageSquare className="w-4 h-4 inline-block mr-2" />
                Ver Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 