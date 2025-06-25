import { ChevronRight, User, MessageSquare, Calendar, DollarSign, Phone, Lock, Unlock } from "lucide-react";
import { Atendimento } from "../types/atendimento";
import { useNavbarTheme } from "./ThemeProvider";
import { useState } from "react";

interface AtendimentoTableProps {
  atendimentos: Atendimento[];
  onSelectAtendimento: (atendimento: Atendimento) => void;
  onRefresh?: () => void;
}

export function AtendimentoTable({ atendimentos, onSelectAtendimento, onRefresh }: AtendimentoTableProps) {
  const { theme } = useNavbarTheme();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  
  // Função para extrair o telefone do ID (agora é o nome)
  const getTelefoneFromId = (id: string) => {
    return id; // Agora o ID é o nome, então retornamos o nome como telefone
  };

  // Função para verificar se está bloqueado
  const isBlocked = (ttl: string) => {
    if (ttl === "" || ttl === null || ttl === undefined) {
      return false; // Não está bloqueado
    }
    if (ttl === "blocked") {
      return true; // Bloqueado permanentemente
    }
    // Se ttl é uma data, verificar se ainda está bloqueado
    const blockDate = new Date(ttl);
    const now = new Date();
    return blockDate > now;
  };

  // Função para obter o status de bloqueio
  const getBlockStatus = (ttl: string) => {
    if (ttl === "" || ttl === null || ttl === undefined) {
      return { blocked: false, text: "Ativo", icon: Unlock, color: "green" };
    }
    if (ttl === "blocked") {
      return { blocked: true, text: "Bloqueado", icon: Lock, color: "red" };
    }
    const blockDate = new Date(ttl);
    const now = new Date();
    if (blockDate > now) {
      return { blocked: true, text: `Bloqueado até ${ttl}`, icon: Lock, color: "yellow" };
    }
    return { blocked: false, text: "Ativo", icon: Unlock, color: "green" };
  };

  // Função para alternar o status de atendimento
  const toggleAtendimento = async (atendimento: Atendimento, event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que o clique propague para a linha
    
    // Verificar se já está carregando
    if (loadingStates[atendimento.id]) return;
    
    try {
      setLoadingStates(prev => ({ ...prev, [atendimento.id]: true }));
      
      const response = await fetch('https://n8n-production-2903.up.railway.app/webhook/rez/api/toggle-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: atendimento.id }),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      // Sucesso - você pode adicionar um toast ou notificação aqui
      console.log(`Status alterado para atendimento ${atendimento.id}`);
      
      if (onRefresh) {
        onRefresh();
      }
      
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      // Você pode adicionar um toast de erro aqui
    } finally {
      setLoadingStates(prev => ({ ...prev, [atendimento.id]: false }));
    }
  };
  
  return (
    <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-white/5 to-white/10' : 'bg-white'} rounded-xl shadow-sm overflow-hidden`}>
      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                ATENDIMENTO
              </th>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Cliente
              </th>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Status
              </th>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Salário
              </th>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Data Admissão
              </th>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Data Demissão
              </th>
              <th className={`px-6 lg:px-8 py-4 text-left text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {atendimentos.map((atendimento) => {
              const blockStatus = getBlockStatus(atendimento.ttl);
              const BlockIcon = blockStatus.icon;
              
              return (
                <tr
                  key={atendimento.id}
                  className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer transition-colors group`}
                  onClick={() => onSelectAtendimento(atendimento)}
                >
                  <td className="px-6 lg:px-8 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={(e) => toggleAtendimento(atendimento, e)}
                        disabled={loadingStates[atendimento.id]}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                          atendimento.ttl === ""
                            ? theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-600'
                            : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                        } ${loadingStates[atendimento.id] ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            atendimento.ttl === "" ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                        {loadingStates[atendimento.id] && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 lg:px-8 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-indigo-900 group-hover:bg-indigo-800' : 'bg-indigo-100 group-hover:bg-indigo-200'} transition-colors`}>
                        <User className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                      </div>
                      <div className="space-y-1">
                        <span className={`text-base font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} block`}>
                          {atendimento.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 lg:px-8 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-lg ${
                        blockStatus.color === 'green' 
                          ? theme === 'dark' ? 'bg-green-900 group-hover:bg-green-800' : 'bg-green-100 group-hover:bg-green-200'
                          : blockStatus.color === 'red'
                          ? theme === 'dark' ? 'bg-red-900 group-hover:bg-red-800' : 'bg-red-100 group-hover:bg-red-200'
                          : theme === 'dark' ? 'bg-yellow-900 group-hover:bg-yellow-800' : 'bg-yellow-100 group-hover:bg-yellow-200'
                      } transition-colors`}>
                        <BlockIcon className={`w-5 h-5 ${
                          blockStatus.color === 'green' 
                            ? theme === 'dark' ? 'text-green-400' : 'text-green-600'
                            : blockStatus.color === 'red'
                            ? theme === 'dark' ? 'text-red-400' : 'text-red-600'
                            : theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                        }`} />
                      </div>
                      <span className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'} block`}>
                        {blockStatus.text}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 lg:px-8 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-green-900 group-hover:bg-green-800' : 'bg-green-100 group-hover:bg-green-200'} transition-colors`}>
                        <DollarSign className={`w-5 h-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                      </div>
                      <span className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        R$ {Number(atendimento.salario).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 lg:px-8 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-purple-900 group-hover:bg-purple-800' : 'bg-purple-100 group-hover:bg-purple-200'} transition-colors`}>
                        <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                      </div>
                      <span className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {atendimento.data_admissao || 'Não informado'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 lg:px-8 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-red-900 group-hover:bg-red-800' : 'bg-red-100 group-hover:bg-red-200'} transition-colors`}>
                        <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                      </div>
                      <span className={`text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {atendimento.data_demissao || 'Não informado'}
                      </span>
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className={`lg:hidden divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
        {atendimentos.map((atendimento) => {
          const blockStatus = getBlockStatus(atendimento.ttl);
          const BlockIcon = blockStatus.icon;
          
          return (
            <div
              key={atendimento.id}
              className={`p-4 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} cursor-pointer transition-colors`}
              onClick={() => onSelectAtendimento(atendimento)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => toggleAtendimento(atendimento, e)}
                    disabled={loadingStates[atendimento.id]}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      atendimento.ttl === ""
                        ? theme === 'dark' ? 'bg-indigo-600' : 'bg-indigo-600'
                        : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                    } ${loadingStates[atendimento.id] ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        atendimento.ttl === "" ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                    {loadingStates[atendimento.id] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </button>
                  <div className={`p-2.5 rounded-lg ${theme === 'dark' ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                    <User className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {atendimento.name}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {blockStatus.text}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    R$ {Number(atendimento.salario).toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Admissão: {atendimento.data_admissao || 'Não informado'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Demissão: {atendimento.data_demissao || 'Não informado'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 