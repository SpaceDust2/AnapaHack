"use client"
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Modal from './Modal'; // Убедитесь, что у вас есть компонент Modal

ChartJS.register(ArcElement, Tooltip, Legend);

const profitabilityData = {
  labels: ['Прямые продажи', 'Партнерские продажи', 'Онлайн продажи'],
  datasets: [
    {
      label: 'Рентабельность',
      data: [300, 50, 100],
      backgroundColor: [
        'rgba(255, 206, 86, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const ProfitabilityGraph = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGraphClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={`h-full w-full`} onClick={handleGraphClick}>
        <Doughnut data={profitabilityData} options={{
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                font: {
                  size: 14
                }
              }
            },
            title: {
              display: true,
              text: 'Рентабельность продаж',
              font: {
                size: 18
              }
            }
          }
        }} />
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Doughnut data={profitabilityData} options={{
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  font: {
                    size: 14
                  }
                }
              },
              title: {
                display: true,
                text: 'Рентабельность продаж',
                font: {
                  size: 18
                }
              }
            }
          }} />
        </Modal>
      )}
    </>
  );
};

export default ProfitabilityGraph;
