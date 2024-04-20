import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

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
  const [isFullSize, setIsFullSize] = useState(false);
  const graphStyles = isFullSize ? 'w-full h-full' : 'w-3/4 h-96';

  return (
    <div className={`mb-8 ${graphStyles}`} onClick={() => setIsFullSize(!isFullSize)}>
      <Pie data={satisfactionData} options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Удовлетворенность клиентов',
          },
        },
      }} />
    </div>
  );
};

export default CustomerSatisfactionGraph;