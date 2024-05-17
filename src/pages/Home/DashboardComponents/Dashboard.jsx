import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalCustomers: 0,
        totalCollections: 0,
        totalDues: 0,
        totalAdvanced: 0
    });

    useEffect(() => {
        // Fetch data from your server
        fetch('http://localhost:5000/dashboard')
            .then(response => response.json())
            .then(data => {
                setDashboardData(data);
            })
            .catch(error => console.error('Error fetching dashboard data:', error));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-8 ">
            <div className="flex justify-between w-full">
                <div className="cursor-pointer w-96 h-24 rounded-xl shadow-xl bg-purple-600">
                    <div className="flex items-center justify-between px-4 border h-full text-white">
                        <h2 className="text-xl font-bold">Total Customers</h2>
                        <span className="text-5xl font-semibold">{dashboardData.totalCustomers}</span>
                    </div>
                </div>
                <div className="cursor-pointer w-96 h-24 rounded-xl shadow-xl bg-purple-600">
                    <div className="flex items-center justify-between px-4 border h-full text-white">
                        <h2 className="text-xl font-bold">Total Collections</h2>
                        <span className="text-5xl font-semibold">{dashboardData.totalCollections}</span>
                    </div>
                </div>
                <div className="cursor-pointer w-96 h-24 rounded-xl shadow-xl bg-purple-600">
                    <div className="flex items-center justify-between px-4 border h-full text-white">
                        <h2 className="text-xl font-bold">Total Dues</h2>
                        <span className="text-5xl font-semibold">{dashboardData.totalDues}</span>
                    </div>
                </div>
                <div className="cursor-pointer w-96 h-24 rounded-xl shadow-xl bg-purple-600">
                    <div className="flex items-center justify-between px-4 border h-full text-white">
                        <h2 className="text-xl font-bold">Total Advanced</h2>
                        <span className="text-5xl font-semibold">{dashboardData.totalAdvanced}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
