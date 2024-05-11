import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
};

const Chart = ({ data }) => {
  const dates = data.map(item => {
    const dateString = item.date.split('T')[0];
    return dateString;
  });
  const prices = data.map(item => parseFloat(item.price));

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Price',
        data: prices,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  return (
    <div>
      <h2>Price Trend</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
