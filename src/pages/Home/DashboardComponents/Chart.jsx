import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = () => {
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
                const collections = data.map(entry => entry.total);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Collections Over Time',
                            data: collections,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: true,
                        },
                    ],
                });
            })
            .catch(error => console.error('Error fetching chart data:', error));
    }, []);

    return (
        <div className='mb-5 lg:w-400 rounded-xl p-3'>
            <h2>Collections Chart</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default Chart;
