import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MonthlyReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('https://user-managed-server.vercel.app/monthly-reports'); // Adjust the URL as needed
                setReports(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Monthly Reports</h2>
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Month</th>
                        <th>Total Collections</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={`${report.year}-${report.month}`}>
                            <td>{report.year}</td>
                            <td>{report.month}</td>
                            <td>{report.totalCollections}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MonthlyReports;
