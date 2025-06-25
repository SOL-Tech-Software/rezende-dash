'use client'
import { useState, useEffect } from "react";
import { AtendimentoTable } from "../../components/AtendimentoTable";
import { AtendimentoDetailsModal } from "../../components/AtendimentoDetailsModal";
import { AtendimentoFilters } from "../../components/AtendimentoFilters";
import { PageHeader } from "../../components/PageHeader";
import { MainLayout } from "../../components/MainLayout";
import { Atendimento } from "../../types/atendimento";
import { useNavbarTheme } from "../../components/ThemeProvider";

export default function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAtendimento, setSelectedAtendimento] = useState<Atendimento | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState("todos");
  const { theme } = useNavbarTheme();

  // Buscar dados da API
  const fetchAtendimentos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/atendimentos');
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }
      
      const data = await response.json();
      setAtendimentos(data || []);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar atendimentos:', err);
      setError('Erro ao carregar os dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAtendimentos();
  }, []);

  // Função para extrair o telefone do ID (agora é o nome)
  const getTelefoneFromId = (id: string) => {
    return id; // Agora o ID é o nome
  };

  // Filtrar atendimentos
  const filteredAtendimentos = atendimentos.filter((atendimento) => {
    // Filtrar por termo de busca
    const searchMatch = searchTerm === "" || 
      atendimento.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getTelefoneFromId(atendimento.id).toLowerCase().includes(searchTerm.toLowerCase());

    return searchMatch;
  });

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Carregando...</div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      </MainLayout>
    );
  }

  // Verificar se não há clientes
  if (!loading && atendimentos.length === 0) {
    return (
      <MainLayout>
        <PageHeader
          title="Clientes"
          description="Gerencie os dados dos clientes"
        >
          <AtendimentoFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
          />
        </PageHeader>
        
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-gray-500 text-lg mb-2">Sem clientes até agora</div>
            <div className="text-gray-400 text-sm">Os clientes aparecerão aqui quando forem adicionados ao sistema</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        title="Clientes"
        description="Gerencie os dados dos clientes"
      >
        <AtendimentoFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
        />
      </PageHeader>

      {/* Disclaimer sobre dados coletados pela IA */}
      <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-2">
            <div className="text-xs text-gray-600">
              <p>
                <strong>Aviso:</strong> Os dados são coletados por IA e podem conter inconsistências. 
                Sempre verifique as informações antes de tomar decisões.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AtendimentoTable
        atendimentos={filteredAtendimentos}
        onSelectAtendimento={setSelectedAtendimento}
        onRefresh={fetchAtendimentos}
      />

      {selectedAtendimento && (
        <AtendimentoDetailsModal
          atendimento={selectedAtendimento}
          onClose={() => setSelectedAtendimento(null)}
          onRefresh={fetchAtendimentos}
        />
      )}
    </MainLayout>
  );
} 