import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Transaction } from '../types';

interface StatisticsChartProps {
  transactions: Transaction[];
}

export const StatisticsChart: React.FC<StatisticsChartProps> = ({ transactions }) => {
  // Simple data transformation for the chart: grouping by date (simplified for demo)
  // In a real app, we would process 'transactions' to group by day/month properly.
  // Here we will mock the curve based on last transactions to show movement.
  
  const data = transactions.slice(0, 7).reverse().map((t, index) => ({
    name: t.date.split('-').slice(1).join('/'),
    income: t.type === 'income' ? t.amount : 0,
    expense: t.type === 'expense' ? t.amount : 0,
    // Creating a cumulative balance effect or just value for visualization
    value: t.amount 
  }));

  // If empty, provide placeholder
  const chartData = data.length > 0 ? data : [{name: 'Hoje', value: 0}];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1A1333]/90 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-xl">
          <p className="text-textSecondary text-xs mb-1">{label}</p>
          <p className="text-white font-bold text-lg">R$ {payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7F56D9" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#7F56D9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#A6A6C6', fontSize: 12 }} 
            dy={10}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#7F56D9" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SpendingDonut: React.FC = () => {
    // This could also be dynamic, but keeping static for style demonstration as requested by "minimal changes" where logical.
    const data = [
      { name: 'Compras', value: 45 },
      { name: 'Alim.', value: 30 },
      { name: 'Transp.', value: 15 },
      { name: 'Outros', value: 10 },
    ];
    const COLORS = ['#7F56D9', '#F72585', '#4CC9F0', '#4895EF'];
    
    return (
      <div className="w-full h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
                contentStyle={{ backgroundColor: '#1A1333', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <span className="block text-2xl font-bold text-white">45%</span>
            <span className="text-xs text-textSecondary">Compras</span>
        </div>
      </div>
    );
  };