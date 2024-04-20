"use client"
import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import Modal from './Modal'; // Убедитесь, что у вас есть компонент Modal

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGraphClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={`mb-8 w-full`} onClick={handleGraphClick}>
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
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
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
        </Modal>
      )}
    </>
  );
};

export default LoyaltyGraph;
