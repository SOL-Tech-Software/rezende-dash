import { X, Settings, User, Edit, DollarSign, Calendar, Phone, ToggleLeft, Lock, Unlock, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavbarTheme } from "./ThemeProvider";
import { Atendimento } from "../types/atendimento";

interface AtendimentoDetailsModalProps {
  atendimento: Atendimento;
  onClose: () => void;
  onRefresh?: () => void;
}

export function AtendimentoDetailsModal({ atendimento, onClose, onRefresh }: AtendimentoDetailsModalProps) {
  const { theme } = useNavbarTheme();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Função para extrair o telefone do ID (agora é o nome)
  const getTelefoneFromId = (id: string) => {
    return id; // Agora o ID é o nome
  };

  // Função para obter o status de bloqueio
  const getBlockStatus = (ttl: string) => {
    if (ttl === "" || ttl === null || ttl === undefined) {
      return { blocked: false, text: "Ativo", icon: Unlock, color: "green" };
    }
    if (ttl === "blocked") {
      return { blocked: true, text: "Bloqueado Permanentemente", icon: Lock, color: "red" };
    }
    const blockDate = new Date(ttl);
    const now = new Date();
    if (blockDate > now) {
      return { blocked: true, text: `Bloqueado até ${ttl}`, icon: Lock, color: "yellow" };
    }
    return { blocked: false, text: "Ativo", icon: Unlock, color: "green" };
  };

  // Função para deletar o cliente
  const handleDeleteClient = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/atendimentos/${atendimento.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Erro ao deletar cliente');
      }
      
      // Fechar modais e atualizar lista
      setShowConfirmation(false);
      onClose();
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      alert('Erro ao deletar cliente. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  const blockStatus = getBlockStatus(atendimento.ttl);
  const BlockIcon = blockStatus.icon;
  
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className={`relative w-full max-w-4xl ${theme === 'dark' ? 'bg-gradient-to-br from-white/5 to-white/10' : 'bg-white'} rounded-xl shadow-xl`}>
              {/* Header */}
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} gap-4 sm:gap-0`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-100'} flex items-center justify-center`}>
                    <User className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <div>
                    <h2 className={`text-lg sm:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {atendimento.name}
                    </h2>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                      Telefone: {getTelefoneFromId(atendimento.id)}
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
                            {atendimento.name}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Telefone
                          </span>
                          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {getTelefoneFromId(atendimento.id)}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Salário
                          </span>
                          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            R$ {Number(atendimento.salario).toLocaleString('pt-BR')}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Status de Atendimento
                          </span>
                          <div className="flex items-center gap-2">
                            <BlockIcon className={`w-4 h-4 ${
                              blockStatus.color === 'green' 
                                ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                : blockStatus.color === 'red'
                                ? theme === 'dark' ? 'text-red-400' : 'text-red-600'
                                : theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                            }`} />
                            <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {blockStatus.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                        Status do Cliente
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2.5 py-1 text-xs font-medium ${
                          atendimento.data_demissao 
                            ? theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
                            : theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                        } rounded-full`}>
                          {atendimento.data_demissao ? 'Inativo' : 'Ativo'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                        Datas Importantes
                      </h3>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Data de Admissão
                          </span>
                          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {atendimento.data_admissao || 'Não informado'}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Data de Demissão
                          </span>
                          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {atendimento.data_demissao || 'Não informado'}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Data de Criação
                          </span>
                          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {atendimento.created_at || 'Não informado'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                        Informações Adicionais
                      </h3>
                      <div className={`${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg p-4`}>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          Cliente registrado no sistema com salário de R$ {Number(atendimento.salario).toLocaleString('pt-BR')}.
                          {atendimento.data_demissao ? ' Inativo desde ' + atendimento.data_demissao : ' Atualmente ativo.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <button 
                  onClick={() => setShowConfirmation(true)}
                  className={`w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2`}
                >
                  <Trash2 className="w-4 h-4" />
                  Esquecer Cliente
                </button>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button className={`w-full sm:w-auto px-4 py-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-200 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'} rounded-lg`}>
                    <Edit className="w-4 h-4 inline-block mr-2" />
                    Editar
                  </button>
                  <button className={`w-full sm:w-auto px-4 py-2 text-sm font-medium text-white ${theme === 'dark' ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-600 hover:bg-indigo-700'} rounded-lg`}>
                    <Phone className="w-4 h-4 inline-block mr-2" />
                    Ligar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60">
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className={`relative w-full max-w-md ${theme === 'dark' ? 'bg-gradient-to-br from-white/5 to-white/10' : 'bg-white'} rounded-xl shadow-xl`}>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-full bg-red-100 flex items-center justify-center`}>
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Esquecer Cliente
                      </h3>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      Tem certeza que deseja esquecer o cliente <strong>{atendimento.name}</strong>?
                    </p>
                    <div className={`p-4 ${theme === 'dark' ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'} rounded-lg`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                        <strong>Atenção:</strong> Esta ação irá:
                      </p>
                      <ul className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'} mt-2 list-disc list-inside space-y-1`}>
                        <li>Apagar todo o histórico de mensagens</li>
                        <li>Excluir o cliente do banco de dados</li>
                        <li>Esta ação não pode ser desfeita</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className={`flex-1 px-4 py-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-200 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'} rounded-lg`}
                      disabled={isDeleting}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleDeleteClient}
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center gap-2"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Deletando...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Confirmar Exclusão
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 