import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ labels, datasets }) => {
    // Check if labels and datasets are provided
    if (!labels || !datasets || !Array.isArray(labels) || !Array.isArray(datasets)) {
        return <div>Error: Missing or invalid data for chart</div>;
    }

    // Create data object for Chart.js
    const data = {
        labels: labels,
        datasets: datasets
    };

    return (
        <div>
            <h2>Collection Chart</h2>
            <Bar data={data} />
        </div>
    );
};

export default Chart;
