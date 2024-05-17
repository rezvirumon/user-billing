import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import PayDueChart from './PayDueChart'; // Import the new component

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalCustomers: 0,
        totalCollections: 0,
        totalDues: 0,
        totalAdvanced: 0,
        todaysCollection: 0,
        thisMonthsCollection: 0
    });

    const fetchDashboardData = () => {
        fetch('https://user-managed-server.vercel.app/dashboard')
            .then(response => response.json())
            .then(data => {
                setDashboardData(data);
            })
            .catch(error => console.error('Error fetching dashboard data:', error));
    };

    useEffect(() => {
        fetchDashboardData(); // Fetch data on component mount

        const intervalId = setInterval(fetchDashboardData, 10000); // Fetch data every 30 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-8">
            <div className="grid lg:grid-cols-3 gap-5">
                <div className="cursor-pointer w-96 h-24 pl-4  shadow-xl bg-purple-600">
                    <div className="flex items-center justify-between h-full text-white">
                        <h2 className="text-xl font-bold">Total Customers</h2>
                        <span className="text-5xl font-semibold flex items-center glass p-5 bg-purple-800 justify-end h-full">{dashboardData.totalCustomers}</span>
                    </div>
                </div>
                <div className="cursor-pointer w-96 h-24 pl-4  shadow-xl bg-blue-600">
                    <div className="flex items-center justify-between h-full text-white">
                        <h2 className="text-xl font-bold">Total Collections</h2>
                        <span className="text-5xl font-semibold flex items-center glass p-5 bg-blue-800 justify-end h-full">{dashboardData.totalCollections}</span>
                    </div>
                </div>
                <div className="cursor-pointer w-96 h-24 pl-4  shadow-xl bg-green-600">
                    <div className="flex items-center justify-between h-full text-white">
                        <h2 className="text-xl font-bold">Total Dues</h2>
                        <span className="text-5xl font-semibold flex items-center glass p-5 bg-green-800 justify-end h-full">{dashboardData.totalDues}</span>
                    </div>
                </div>
                <div className="cursor-pointer w-96 h-24 pl-4  shadow-xl bg-pink-600">
                    <div className="flex items-center justify-between h-full text-white">
                        <h2 className="text-xl font-bold">Advanced</h2>
                        <span className="text-5xl font-semibold flex items-center glass p-5 bg-pink-800 justify-end h-full">{dashboardData.totalAdvanced}</span>
                    </div>
                </div>
                <div className="cursor-pointer w-96 h-24 pl-4  shadow-xl  bg-yellow-600">
                    <div className="flex items-center justify-between h-full text-white">
                        <h2 className="text-xl font-bold">Today</h2>
                        <span className="text-5xl font-semibold flex items-center glass p-5 bg-yellow-800 justify-end h-full">{dashboardData.todaysCollection}</span>
                    </div>
                </div>
                <div className="cursor-pointer w-96 h-24 pl-4  shadow-xl bg-sky-600">
                    <div className="flex items-center justify-between h-full text-white">
                        <h2 className="text-xl font-bold">This Month</h2>
                        <span className="text-5xl font-semibold flex items-center glass p-5 bg-sky-800 justify-end h-full">{dashboardData.thisMonthsCollection}</span>
                    </div>
                </div>
            </div>
            <div className='lg:flex shadow-xl p-3 justify-around gap-24 '>
                <Chart /> {/* Existing chart */}
                <PayDueChart /> {/* New chart */}
            </div>
        </div>
    );
};

export default Dashboard;
