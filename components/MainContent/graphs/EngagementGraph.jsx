import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const engagementData = {
  labels: ['Лайки', 'Комментарии', 'Репосты', 'Просмотры'],
  datasets: [
    {
      label: 'Вовлеченность',
      data: [300, 150, 100, 500],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const EngagementGraph = () => {
  const [isFullSize, setIsFullSize] = useState(false);
  const graphStyles = isFullSize ? 'w-full h-full' : 'w-3/4 h-96';

  return (
    <div className={`mb-8 ${graphStyles}`} onClick={() => setIsFullSize(!isFullSize)}>
      <Doughnut data={engagementData} options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Вовлеченность пользователей',
          },
        },
      }} />
    </div>
  );
};

export default EngagementGraph;