// components/mainContent/InteractiveGraph.js
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
  datasets: [
    {
      label: 'Активные пользователи',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const InteractiveGraph = () => {
  const [isFullSize, setIsFullSize] = useState(false);
  const graphStyles = isFullSize ? 'w-full h-full' : 'w-3/4 h-96';

  return (
    <div className={`mb-8 ${graphStyles}`} onClick={() => setIsFullSize(!isFullSize)}>
      <Bar data={data} options={{
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'Активные пользователи по месяцам',
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

export default InteractiveGraph;