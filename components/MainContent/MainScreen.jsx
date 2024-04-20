"use client"
import React, { useState, useEffect } from 'react';
import InteractiveGraph from './graphs/InteractiveGraph';
import CustomerSatisfactionGraph from './graphs/CustomerSatisfactionGraph';
import EngagementGraph from './graphs/EngagementGraph';
import InformationBlock from './graphs/InformationBlock';
import RevenueGraph from './graphs/RevenueGraph';
import ProfitabilityGraph from './graphs/ProfitabilityGraph';
import LoyaltyGraph from './graphs/LoyaltyGraph';

const metricsData = [
  { name: 'Активные пользователи', value: 1200 },
  { name: 'Заявки от бизнеса', value: 80 },
  { name: 'Обращения', value: 350 },
  { name: 'Новые подписки', value: 45 },
];

const MainScreen = () => {
  const [metrics, setMetrics] = useState(metricsData);
  const [selectedGraph, setSelectedGraph] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(metrics.map(metric => ({
        ...metric,
        value: metric.value + Math.floor(Math.random() * 10) - 5
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, [metrics]);

  const handleGraphClick = (graphName) => {
    setSelectedGraph(graphName);
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-blue-100 shadow rounded-lg p-6 flex flex-col justify-between">
            <div className="text-sm font-semibold text-gray-500">{metric.name}</div>
            <div className="text-3xl font-bold">{metric.value}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div onClick={() => handleGraphClick('interactive')} className="cursor-pointer">
          <InteractiveGraph display={selectedGraph === 'interactive'} />
        </div>
        <div onClick={() => handleGraphClick('revenue')} className="cursor-pointer">
          <RevenueGraph display={selectedGraph === 'revenue'} />
        </div>
        <div onClick={() => handleGraphClick('profitability')} className="cursor-pointer">
          <ProfitabilityGraph display={selectedGraph === 'profitability'} />
        </div>
        <div onClick={() => handleGraphClick('loyalty')} className="cursor-pointer">
          <LoyaltyGraph display={selectedGraph === 'loyalty'} />
        </div>
        <div onClick={() => handleGraphClick('customerSatisfaction')} className="cursor-pointer">
          <CustomerSatisfactionGraph display={selectedGraph === 'customerSatisfaction'} />
        </div>
        <div onClick={() => handleGraphClick('engagement')} className="cursor-pointer">
          <EngagementGraph display={selectedGraph === 'engagement'} />
        </div>
      </div>
      <div className="mt-8">
        <InformationBlock title="Последние обновления" content="Здесь будет информация о последних обновлениях системы." />
        {/* Дополнительные информационные блоки */}
      </div>
    </div>
  );
};

export default MainScreen;
