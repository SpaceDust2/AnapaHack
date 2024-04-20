"use client"
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Modal from './Modal'; // Предполагается, что у вас есть компонент модального окна

ChartJS.register(ArcElement, Tooltip, Legend);

const satisfactionData = {
  labels: ['Очень довольны', 'Довольны', 'Нейтрально', 'Недовольны', 'Очень недовольны'],
  datasets: [
    {
      label: 'Удовлетворенность клиентов',
      data: [50, 25, 15, 7, 3],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const CustomerSatisfactionGraph = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGraphClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={`mb-8 w-full`} onClick={handleGraphClick}>
        <Pie data={satisfactionData} options={{
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
              text: 'Удовлетворенность клиентов',
              font: {
                size: 18
              }
            }
          }
        }} />
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Pie data={satisfactionData} options={{
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
                text: 'Удовлетворенность клиентов',
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

export default CustomerSatisfactionGraph;
