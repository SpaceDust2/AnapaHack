"use client"
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Modal from './Modal'; // Убедитесь, что у вас есть компонент Modal

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGraphClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={`mb-8 w-full`} onClick={handleGraphClick}>
        <Doughnut data={engagementData} options={{
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
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Doughnut data={engagementData} options={{
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
        </Modal>
      )}
    </>
  );
};

export default EngagementGraph;
