import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ margin: '5px 0', color: entry.color }}>
            {`${entry.name}: ${typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom label for pie chart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Chart components
export const FinancialBarChart = ({ stats }) => {
  const data = [
    { name: 'Total Balance', value: stats.totalBalance },
    { name: 'Total Withdrawn', value: stats.totalWithdrawn },
    { name: 'Total Credited', value: stats.totalCredited },
  ];

  const colors = ['#1976d2', '#2e7d32', '#ed6c02'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis 
          tickFormatter={(value) => 
            new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              notation: 'compact',
              maximumFractionDigits: 1
            }).format(value)
          } 
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="value" name="Amount">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export const UserDistributionPieChart = ({ stats }) => {
  const data = [
    { name: 'Regular Users', value: stats.totalUsers - stats.bannedUsers - stats.admins },
    { name: 'Banned Users', value: stats.bannedUsers },
    { name: 'Admin Users', value: stats.admins },
  ];

  const COLORS = ['#1976d2', '#d32f2f', '#9c27b0'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Chart cards to display in the dashboard
export const ChartCardsRow = ({ stats }) => {
  return (
    <div style={{ marginTop: '30px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Data Visualization</h3>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '20px' 
      }}>
        {/* Financial Bar Chart Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '20px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          border: '1px solid #e0e0e0'
        }}>
          <h4 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>Financial Overview</h4>
          <FinancialBarChart stats={stats} />
        </div>
        
        {/* User Distribution Pie Chart Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '20px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          border: '1px solid #e0e0e0'
        }}>
          <h4 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>User Distribution</h4>
          <UserDistributionPieChart stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default ChartCardsRow;