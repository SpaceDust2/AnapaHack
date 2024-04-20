import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const revenueData = {
  labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
  datasets: [
    {
      label: 'Средний чек',
      data: [500, 600, 700, 800, 900, 1000],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const RevenueGraph = () => {
  const [isFullSize, setIsFullSize] = useState(false);
  const graphStyles = isFullSize ? 'w-full h-full' : 'w-1/2 h-64';

  return (
    <div className={`mb-8 ${graphStyles}`} onClick={() => setIsFullSize(!isFullSize)}>
      <Line data={revenueData} options={{
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'Динамика среднего чека',
            font: {
              size: 18
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: true
            },
            beginAtZero: true
          }
        }
      }} />
    </div>
  );
};

export default RevenueGraph;