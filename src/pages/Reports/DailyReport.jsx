import React, { useEffect, useState } from 'react';

const DailyReport = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchDailyReports = async () => {
            try {
                const response = await fetch('https://user-managed-server.vercel.app/daily-reports');
                const data = await response.json();
                setReports(data);
            } catch (err) {
                console.error('Error fetching daily reports:', err);
            }
        };

        fetchDailyReports();
    }, []);

    return (
        <div>
            <h1>Daily Reports</h1>
            {reports.map((report, index) => (
                <div key={index}>
                    <h2>{new Date(report.date).toLocaleDateString()}</h2>
                    <p>Total Collections: {report.totalCollections}</p>
                    <p>Total Dues: {report.totalDues}</p>
                    <p>Total Advanced: {report.totalAdvanced}</p>
                </div>
            ))}
        </div>
    );
};

export default DailyReport;
