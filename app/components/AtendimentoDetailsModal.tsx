import { X, Settings, MessageSquare, Edit } from "lucide-react";

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
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-xl transition-colors duration-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 gap-4 sm:gap-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                    Atendimento #{atendimento.numero}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
                    {atendimento.data}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
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
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-200">
                      Informações do Cliente
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
                          Nome
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white transition-colors duration-200">
                          {atendimento.cliente}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
                          Status
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          atendimento.status === "Concluído"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                        }`}>
                          {atendimento.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-200">
                      Tags e Categorização
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {atendimento.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
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
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-200">
                      Status e Interações
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
                          Precisa Aprovação
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          atendimento.precisaAprovacao
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400"
                            : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                        }`}>
                          {atendimento.precisaAprovacao ? "Sim" : "Não"}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
                          Última Mensagem
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white transition-colors duration-200">
                          {atendimento.ultimaMensagem}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-200">
                      Última Interação
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        {atendimento.ultimaInteracao}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
              <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                <Edit className="w-4 h-4 inline-block mr-2" />
                Editar
              </button>
              <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-500 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200">
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