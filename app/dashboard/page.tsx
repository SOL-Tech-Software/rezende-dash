'use client'
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { TrendingUp, Users, MessageSquare, AlertCircle, DollarSign, BarChart2, AlertTriangle } from "lucide-react";
import { useNavbarTheme } from "../components/ThemeProvider";
import { MainLayout } from "../components/MainLayout";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { MessagesChart } from "../components/MessagesChart";
import { Clock } from "lucide-react";
import { AtendimentosDistributionChart } from "../components/AtendimentosDistributionChart";
import { AtendimentosTrendChart } from "../components/AtendimentosTrendChart";
import { RecentAtendimentosTable } from "../components/RecentAtendimentosTable";
import { useState } from "react";

const dataCards = [
  { 
    label: "Nº de Conversas", 
    value: 120,
    icon: <MessageSquare className="w-6 h-6" />,
    trend: "+12%",
    color: "from-blue-500 to-blue-600"
  },
  { 
    label: "Nº de Sucessos", 
    value: 95,
    icon: <TrendingUp className="w-6 h-6" />,
    trend: "+8%",
    color: "from-green-500 to-green-600"
  },
  { 
    label: "Nº de Falhas", 
    value: 25,
    icon: <AlertCircle className="w-6 h-6" />,
    trend: "-5%",
    color: "from-red-500 to-red-600"
  },
  { 
    label: "Custo Mensal Médio", 
    value: "R$ 1.200,00",
    icon: <DollarSign className="w-6 h-6" />,
    trend: "-2%",
    color: "from-purple-500 to-purple-600"
  },
  { 
    label: "Conversas Iniciadas", 
    value: 150,
    icon: <Users className="w-6 h-6" />,
    trend: "+15%",
    color: "from-indigo-500 to-indigo-600"
  },
  { 
    label: "Taxa de Conversão", 
    value: "79%",
    icon: <BarChart2 className="w-6 h-6" />,
    trend: "+3%",
    color: "from-pink-500 to-pink-600"
  }
];

const dataGrafico = [
  { hora: "00:00", mensagens: 120, sucessos: 100, falhas: 20 },
  { hora: "01:00", mensagens: 150, sucessos: 130, falhas: 20 },
  { hora: "02:00", mensagens: 180, sucessos: 160, falhas: 20 },
  { hora: "03:00", mensagens: 200, sucessos: 180, falhas: 20 },
  { hora: "04:00", mensagens: 220, sucessos: 200, falhas: 20 },
  { hora: "05:00", mensagens: 250, sucessos: 230, falhas: 20 },
  { hora: "06:00", mensagens: 280, sucessos: 260, falhas: 20 },
  { hora: "07:00", mensagens: 300, sucessos: 280, falhas: 20 },
  { hora: "08:00", mensagens: 320, sucessos: 300, falhas: 20 },
  { hora: "09:00", mensagens: 350, sucessos: 330, falhas: 20 },
  { hora: "10:00", mensagens: 380, sucessos: 360, falhas: 20 },
  { hora: "11:00", mensagens: 400, sucessos: 380, falhas: 20 },
  { hora: "12:00", mensagens: 420, sucessos: 400, falhas: 20 },
  { hora: "13:00", mensagens: 450, sucessos: 430, falhas: 20 },
  { hora: "14:00", mensagens: 480, sucessos: 460, falhas: 20 },
  { hora: "15:00", mensagens: 500, sucessos: 480, falhas: 20 },
  { hora: "16:00", mensagens: 520, sucessos: 500, falhas: 20 },
  { hora: "17:00", mensagens: 550, sucessos: 530, falhas: 20 },
  { hora: "18:00", mensagens: 580, sucessos: 560, falhas: 20 },
  { hora: "19:00", mensagens: 600, sucessos: 580, falhas: 20 },
  { hora: "20:00", mensagens: 620, sucessos: 600, falhas: 20 },
  { hora: "21:00", mensagens: 650, sucessos: 630, falhas: 20 },
  { hora: "22:00", mensagens: 680, sucessos: 660, falhas: 20 },
  { hora: "23:00", mensagens: 700, sucessos: 680, falhas: 20 },
];

const dataDistribuicao = [
  { name: "Suporte", value: 45, color: "#6366f1" },
  { name: "Vendas", value: 30, color: "#22c55e" },
  { name: "Financeiro", value: 15, color: "#f59e0b" },
  { name: "Outros", value: 10, color: "#ef4444" },
];

const dataTendencia = [
  { data: "01/01", atendimentos: 120, media: 100 },
  { data: "02/01", atendimentos: 150, media: 100 },
  { data: "03/01", atendimentos: 180, media: 100 },
  { data: "04/01", atendimentos: 200, media: 100 },
  { data: "05/01", atendimentos: 220, media: 100 },
  { data: "06/01", atendimentos: 250, media: 100 },
  { data: "07/01", atendimentos: 280, media: 100 },
];

const atendimentosRecentes = [
  {
    id: 1,
    cliente: "João Silva",
    ultimaMensagem: "Preciso de ajuda com minha fatura",
    data: "10:30",
    status: "Em andamento" as const,
    tags: ["Financeiro", "Urgente"]
  },
  {
    id: 2,
    cliente: "Maria Santos",
    ultimaMensagem: "Quero saber mais sobre o plano premium",
    data: "10:15",
    status: "Concluído" as const,
    tags: ["Vendas", "Premium"]
  },
  {
    id: 3,
    cliente: "Pedro Oliveira",
    ultimaMensagem: "Problema com o acesso ao sistema",
    data: "10:00",
    status: "Em andamento" as const,
    tags: ["Suporte", "Técnico"]
  },
  {
    id: 4,
    cliente: "Ana Costa",
    ultimaMensagem: "Dúvida sobre o pagamento",
    data: "09:45",
    status: "Concluído" as const,
    tags: ["Financeiro"]
  },
  {
    id: 5,
    cliente: "Carlos Souza",
    ultimaMensagem: "Solicitação de reembolso",
    data: "09:30",
    status: "Em andamento" as const,
    tags: ["Financeiro", "Reembolso"]
  }
];

export default function Dashboard() {
  const { theme } = useNavbarTheme();
  const [trendPeriod, setTrendPeriod] = useState("7");
  const [messagePeriod, setMessagePeriod] = useState("hoje");

  // Filtrar dados de tendência
  const filteredTrendData = dataTendencia.slice(0, parseInt(trendPeriod));

  // Filtrar dados de mensagens
  const getFilteredMessageData = () => {
    switch (messagePeriod) {
      case "hoje":
        return dataGrafico.slice(0, 24); // Últimas 24 horas
      case "semana":
        return dataGrafico.filter((_, index) => index % 24 === 0).slice(0, 7); // Últimos 7 dias
      case "mes":
        return dataGrafico.filter((_, index) => index % 24 === 0).slice(0, 30); // Últimos 30 dias
      default:
        return dataGrafico;
    }
  };

  return (
    <MainLayout>
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
          <p className="text-yellow-800 font-medium">
            ⚠️ Esta tela ainda está em construção. Os dados são fictícios.
          </p>
        </div>
      </div>

      <PageHeader
        title="Dashboard"
        description="Visão geral do seu negócio"
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <StatCard
          label="Total de Mensagens"
          value="12.5k"
          icon={MessageSquare}
          trend="+12.5%"
          color="indigo"
        />
        <StatCard
          label="Clientes Ativos"
          value="2.3k"
          icon={Users}
          trend="+8.2%"
          color="green"
        />
        <StatCard
          label="Tempo Médio"
          value="2.4m"
          icon={Clock}
          trend="-3.1%"
          color="red"
        />
        <StatCard
          label="Taxa de Sucesso"
          value="94.2%"
          icon={TrendingUp}
          trend="+2.4%"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <MessagesChart 
          data={getFilteredMessageData()} 
          period={messagePeriod}
          onPeriodChange={setMessagePeriod}
        />
        <AtendimentosDistributionChart data={dataDistribuicao} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <AtendimentosTrendChart 
          data={filteredTrendData}
          period={trendPeriod}
          onPeriodChange={setTrendPeriod}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <RecentAtendimentosTable atendimentos={atendimentosRecentes} />
      </div>
    </MainLayout>
  );
}
