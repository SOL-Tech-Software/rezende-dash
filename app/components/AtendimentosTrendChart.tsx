import { useTheme } from "next-themes";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface AtendimentosTrendChartProps {
  data: {
    data: string;
    atendimentos: number;
    media: number;
  }[];
  period: string;
  onPeriodChange: (period: string) => void;
}

export function AtendimentosTrendChart({ data, period, onPeriodChange }: AtendimentosTrendChartProps) {
  const { theme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
            Tendência de Atendimentos
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
            Evolução dos atendimentos ao longo do tempo
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={() => onPeriodChange("7")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              period === "7"
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                : "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            7 dias
          </button>
          <button 
            onClick={() => onPeriodChange("30")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              period === "30"
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                : "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            30 dias
          </button>
          <button 
            onClick={() => onPeriodChange("90")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              period === "90"
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30"
                : "text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            90 dias
          </button>
        </div>
      </div>
      <div className="h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <defs>
              <linearGradient id="colorAtendimentos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorMedia" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              className="stroke-gray-200 dark:stroke-gray-700 transition-colors duration-200"
              vertical={false}
            />
            <XAxis 
              dataKey="data" 
              stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              tickLine={false}
              axisLine={false}
              tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              tickLine={false}
              axisLine={false}
              tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                padding: '12px'
              }}
              labelStyle={{
                color: theme === 'dark' ? '#ffffff' : '#1f2937',
                fontWeight: '600',
                marginBottom: '8px'
              }}
              itemStyle={{
                color: theme === 'dark' ? '#ffffff' : '#1f2937',
                padding: '4px 0'
              }}
              formatter={(value, name) => {
                const formattedName = name === 'atendimentos' ? 'Atendimentos' : 'Média';
                return [value, formattedName];
              }}
            />
            <Area 
              type="monotone" 
              dataKey="atendimentos" 
              stroke="#6366f1" 
              fill="url(#colorAtendimentos)"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="media" 
              stroke="#22c55e" 
              fill="url(#colorMedia)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 