"use client"
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Modal from './Modal'; // Убедитесь, что у вас есть компонент Modal

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGraphClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full h-full" onClick={handleGraphClick}>
        <Line data={revenueData} options={{
           maintainAspectRatio: false,
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
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
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
        </Modal>
      )}
    </>
  );
};

export default RevenueGraph;
