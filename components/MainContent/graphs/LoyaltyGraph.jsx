import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const loyaltyData = {
  labels: ['Отзывы', 'Повторные покупки', 'Рефералы', 'Социальные сети', 'Прямой трафик'],
  datasets: [
    {
      label: 'Лояльность клиентов',
      data: [65, 59, 90, 81, 56],
      fill: true,
      backgroundColor: 'rgba(179, 181, 198, 0.2)',
      borderColor: 'rgba(179, 181, 198, 1)',
      pointBackgroundColor: 'rgba(179, 181, 198, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179, 181, 198, 1)',
    },
  ],
};

const LoyaltyGraph = () => {
  const [isFullSize, setIsFullSize] = useState(false);
  const graphStyles = isFullSize ? 'w-full h-full' : 'w-3/4 h-96';

  return (
    <div className={`mb-8 ${graphStyles}`} onClick={() => setIsFullSize(!isFullSize)}>
      <Radar data={loyaltyData} options={{
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
            text: 'Лояльность клиентов',
            font: {
              size: 18
            }
          }
        },
        elements: {
          line: {
            borderWidth: 3
          },
          point: {
            radius: 5,
            borderWidth: 2,
            hoverRadius: 7,
            hoverBorderWidth: 3
          }
        },
        scales: {
          r: {
            angleLines: {
              display: false
            },
            suggestedMin: 50,
            suggestedMax: 100
          }
        }
      }} />
    </div>
  );
};

export default LoyaltyGraph;