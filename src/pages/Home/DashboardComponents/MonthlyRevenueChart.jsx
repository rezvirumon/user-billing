import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const MonthlyRevenueChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = chartRef.current;

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    const labels = data.map(item => `Month ${item._id}`);
    const dataset = data.map(item => item.totalRevenue);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Monthly Revenue',
                data: dataset,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-5 shadow-xl rounded-xl w-full">
            <h3 className="text-lg font-bold mb-4">Monthly Revenue</h3>
            <Line ref={chartRef} data={chartData} />
        </div>
    );
};

export default MonthlyRevenueChart;
