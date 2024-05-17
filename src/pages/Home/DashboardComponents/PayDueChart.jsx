import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler, // Import Filler plugin
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler // Register Filler plugin
);

const PayDueChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        // Fetch data from the backend to populate the chart
        fetch('https://user-managed-server.vercel.app/dashboard/chart-data')
            .then(response => response.json())
            .then(data => {
                // Check if data is provided and is in the expected format
                if (!data || !Array.isArray(data)) {
                    console.error('Invalid or empty data received:', data);
                    return;
                }

                // Prepare data for the chart
                const labels = data.map(entry => entry._id); // Use _id as date
                const payData = data.map(entry => entry.pay); // Use 'pay' field
                const dueData = data.map(entry => entry.due); // Use 'due' field

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Pay',
                            data: payData,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: true, // Use fill option
                        },
                        {
                            label: 'Due',
                            data: dueData,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            fill: true, // Use fill option
                        },
                    ],
                });
            })
            .catch(error => console.error('Error fetching chart data:', error));
    }, []);

    return (
        <div className=''>
            <h2>Pay and Due Chart</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default PayDueChart;
