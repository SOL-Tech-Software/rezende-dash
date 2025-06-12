'use client'
import { useState } from "react";
import { AtendimentoTable } from "../components/AtendimentoTable";
import { AtendimentoDetailsModal } from "../components/AtendimentoDetailsModal";
import { AtendimentoFilters } from "../components/AtendimentoFilters";
import { PageHeader } from "../components/PageHeader";
import { MainLayout } from "../components/MainLayout";
import { Atendimento } from "../types/atendimento";
import { useNavbarTheme } from "../components/ThemeProvider";

// Mock data for the table
const atendimentos: Atendimento[] = [
  {
    id: 1,
    numero: "+55 11 98765-4321",
    ultimaMensagem: "10:30",
    data: "2024-03-20",
    status: "Em andamento",
    precisaAprovacao: true,
    cliente: "João Silva",
    tags: ["Novo Cliente", "Urgente"],
    ultimaInteracao: "Cliente solicitou informações sobre pedido"
  },
  {
    id: 2,
    numero: "+55 11 91234-5678",
    ultimaMensagem: "09:45",
    data: "2024-03-20",
    status: "Concluído",
    precisaAprovacao: false,
    cliente: "Maria Santos",
    tags: ["Cliente VIP"],
    ultimaInteracao: "Atendimento finalizado com sucesso"
  },
  {
    id: 3,
    numero: "+55 11 99876-5432",
    ultimaMensagem: "11:20",
    data: "2024-03-20",
    status: "Em andamento",
    precisaAprovacao: true,
    cliente: "Pedro Oliveira",
    tags: ["Reclamação"],
    ultimaInteracao: "Cliente reportou problema com entrega"
  },
  {
    id: 4,
    numero: "+55 11 97777-8888",
    ultimaMensagem: "08:15",
    data: "2024-03-20",
    status: "Concluído",
    precisaAprovacao: false,
    cliente: "Ana Costa",
    tags: ["Sugestão"],
    ultimaInteracao: "Cliente sugeriu melhoria no serviço"
  },
  {
    id: 5,
    numero: "+55 11 96666-5555",
    ultimaMensagem: "14:30",
    data: "2024-03-20",
    status: "Em andamento",
    precisaAprovacao: true,
    cliente: "Carlos Mendes",
    tags: ["Dúvida"],
    ultimaInteracao: "Cliente solicitou esclarecimentos"
  },
  {
    id: 6,
    numero: "+55 11 95555-4444",
    ultimaMensagem: "13:45",
    data: "2024-03-20",
    status: "Concluído",
    precisaAprovacao: false,
    cliente: "Juliana Lima",
    tags: ["Elogio"],
    ultimaInteracao: "Cliente elogiou o atendimento"
  },
  {
    id: 7,
    numero: "+55 11 94444-3333",
    ultimaMensagem: "12:10",
    data: "2024-03-20",
    status: "Em andamento",
    precisaAprovacao: true,
    cliente: "Roberto Alves",
    tags: ["Reclamação", "Urgente"],
    ultimaInteracao: "Cliente reportou problema técnico"
  },
  {
    id: 8,
    numero: "+55 11 93333-2222",
    ultimaMensagem: "15:20",
    data: "2024-03-20",
    status: "Concluído",
    precisaAprovacao: false,
    cliente: "Fernanda Souza",
    tags: ["Cliente VIP"],
    ultimaInteracao: "Atendimento finalizado com sucesso"
  },
  {
    id: 9,
    numero: "+55 11 92222-1111",
    ultimaMensagem: "16:05",
    data: "2024-03-20",
    status: "Em andamento",
    precisaAprovacao: true,
    cliente: "Lucas Martins",
    tags: ["Novo Cliente"],
    ultimaInteracao: "Cliente solicitou informações iniciais"
  },
  {
    id: 10,
    numero: "+55 11 91111-0000",
    ultimaMensagem: "17:30",
    data: "2024-03-20",
    status: "Concluído",
    precisaAprovacao: false,
    cliente: "Patrícia Gomes",
    tags: ["Sugestão"],
    ultimaInteracao: "Cliente sugeriu nova funcionalidade"
  },
  {
    id: 11,
    numero: "+55 11 90000-9999",
    ultimaMensagem: "18:15",
    data: "2024-03-20",
    status: "Em andamento",
    precisaAprovacao: true,
    cliente: "Ricardo Santos",
    tags: ["Dúvida", "Urgente"],
    ultimaInteracao: "Cliente solicitou suporte técnico"
  },
  {
    id: 12,
    numero: "+55 11 98989-8888",
    ultimaMensagem: "19:00",
    data: "2024-03-20",
    status: "Concluído",
    precisaAprovacao: false,
    cliente: "Camila Oliveira",
    tags: ["Cliente VIP"],
    ultimaInteracao: "Atendimento finalizado com sucesso"
  }
];

export default function Atendimentos() {
  const [selectedAtendimento, setSelectedAtendimento] = useState<Atendimento | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState("todos");
  const { theme } = useNavbarTheme();

  // Filtrar atendimentos
  const filteredAtendimentos = atendimentos.filter((atendimento) => {
    // Filtrar por termo de busca
    const searchMatch = searchTerm === "" || 
      atendimento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atendimento.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atendimento.ultimaInteracao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      atendimento.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filtrar por status
    const statusMatch = filterStatus === "todos" || 
      (filterStatus === "em-andamento" && atendimento.status === "Em andamento") ||
      (filterStatus === "concluido" && atendimento.status === "Concluído");

    return searchMatch && statusMatch;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Atendimentos"
        description="Gerencie suas conversas e atendimentos"
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

      <AtendimentoTable
        atendimentos={filteredAtendimentos}
        onSelectAtendimento={setSelectedAtendimento}
      />

      {selectedAtendimento && (
        <AtendimentoDetailsModal
          atendimento={selectedAtendimento}
          onClose={() => setSelectedAtendimento(null)}
        />
      )}
    </MainLayout>
  );
} 