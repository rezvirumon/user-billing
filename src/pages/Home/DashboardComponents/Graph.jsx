
import { Line } from "react-chartjs-2";

const Graph = () => {
    // Sample data for demonstration
    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "Sales",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div>
            <h2>Sales Trend</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default Graph;
