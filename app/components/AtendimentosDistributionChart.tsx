import { useTheme } from "next-themes";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip
} from 'recharts';

interface AtendimentosDistributionChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export function AtendimentosDistributionChart({ data }: AtendimentosDistributionChartProps) {
  const { theme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
            Distribuição de Atendimentos
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">
            Análise por tipo de atendimento
          </p>
        </div>
      </div>
      <div className="h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
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
                return [`${value}%`, name];
              }}
            />
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                paddingTop: '20px'
              }}
              formatter={(value, entry) => (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 