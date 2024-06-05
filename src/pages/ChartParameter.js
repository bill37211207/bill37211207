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
import { faker } from '@faker-js/faker';

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
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const labelsdata =  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const newData = [118, 12, 6, 89, 12, 83, 39,77,12,66];
export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      //data: labelsdata,
      data: labels.map(() => faker.datatype.number({ min: -10, max: 10 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      //data: newData,
      data: labels.map(() => faker.datatype.number({ min: -100, max: 100 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
// const Line = new Chart(
//   document.getElementById('chart'),
//   config
// );
export function ChartPara() {
  return <Line options={options} data={data} />;
}


export default ChartPara;
