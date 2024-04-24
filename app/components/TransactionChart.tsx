"use client"
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function TransactionChart({ data }: { data: Array<any> }) {
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

  const [chartData, setChartData] = useState<Array<any>>()

  function compileTotalAmountByDate(transactions: Array<any>) {
    const totalAmountByDate: any = {};

    transactions.forEach(transaction => {
      const date = transaction.date;

      if (totalAmountByDate[date]) {
        totalAmountByDate[date] += transaction.amount;
      } else {
        totalAmountByDate[date] = transaction.amount;
      }
    });

    return totalAmountByDate;
  }

  useEffect(() => {
    const chartData = compileTotalAmountByDate(data)
    setChartData(chartData)
    console.log(chartData)
  }, [data])

  return (
    <div className='come-up'>
      <Line
        datasetIdKey='id'
        options={{
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                display: true
              },
            },
            y: {
              grid: {
                display: false,
              },
              suggestedMax: 80,
              ticks: {
                display: false
              },
              border: {
                color: 'transparent'
              }
            }
          },
          plugins: {

            tooltip: {
              callbacks: {
                label: function (context) {
                    var label = context.dataset.label || '';
                    label += 'USD ' + context.parsed.y;
                    return label;
                  }
              }
            }
          }
        }}
        data={{
          labels: Object.keys(chartData ? chartData : {})?.map(date => new Date(date).toDateString().substring(4, 10)),
          datasets: [{
            data: Object.values(chartData ? chartData : {}),
            fill: false,
            tension: 0.5,
            showLine: true,
            borderColor: "#FF5403",
            backgroundColor: "#FF5403",
            borderWidth: 1
          }]
        }} />
    </div>
  )
}