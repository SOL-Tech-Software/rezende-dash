'use client'
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const dataCards = [
  { label: "Nº de Conversas", value: 120 },
  { label: "Nº de Sucessos", value: 95 },
  { label: "Nº de Falhas", value: 25 }
];

const dataGrafico = [
  { hora: '08h', mensagens: 10 },
  { hora: '09h', mensagens: 22 },
  { hora: '10h', mensagens: 30 },
  { hora: '11h', mensagens: 15 },
  { hora: '12h', mensagens: 40 },
  { hora: '13h', mensagens: 28 },
  { hora: '14h', mensagens: 35 },
  { hora: '15h', mensagens: 20 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Dashboard
          </h1>
          {/* Cards de indicadores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {dataCards.map((card) => (
              <div key={card.label} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex flex-col items-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{card.value}</span>
                <span className="text-gray-600 dark:text-gray-300">{card.label}</span>
              </div>
            ))}
          </div>
          {/* Gráfico de mensagens por hora */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Mensagens por Hora
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataGrafico}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="mensagens" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
