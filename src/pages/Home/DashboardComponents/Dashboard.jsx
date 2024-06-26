import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import PayDueChart from './PayDueChart';
import CustomerDistribution from './CustomerDistribution';
import TopPayers from './TopPayers';
import MonthlyRevenueChart from './MonthlyRevenueChart';
import { FaCalendarCheck, FaFileInvoiceDollar, FaUsers } from 'react-icons/fa';
import { FaCalendarDays, FaFilterCircleXmark, FaSackDollar } from 'react-icons/fa6';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalCustomers: 0,
        totalCollections: 0,
        totalDues: 0,
        totalAdvanced: 0,
        todaysCollection: 0,
        thisMonthsCollection: 0,
        customerDistribution: [],
        topPayers: [],
        monthlyRevenue: []
    });

    const fetchDashboardData = () => {
        fetch('https://user-managed-server.vercel.app/dashboard')
            .then(response => response.json())
            .then(data => setDashboardData(data))
            .catch(error => console.error('Error fetching dashboard data:', error));
    };

    useEffect(() => {
        fetchDashboardData();
        const intervalId = setInterval(fetchDashboardData, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col items-center lg:w-[80%] mx-auto">
            <h2 className='lg:my-10 text-xl font-bold divider'>Dashboard</h2>
            <div className="">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="group flex justify-between items-center cursor-pointer w-80 lg:w-96 px-3 py-5 rounded-lg border-b-[7px] transition-all ease-in-out shadow-xl hover:border-green-500 border-green-300">
                        <div className="text-4xl text-white p-5 rounded-lg shadow-xl glass bg-green-400 group-hover:bg-green-500">
                            <FaUsers className="group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className='text-center'>
                            <h2 className="text-lg text-gray-500 font-bold group-hover:text-green-500 transition-colors duration-300">Customers</h2>
                            <span className="text-5xl font-bold text-green-400 group-hover:text-green-500 transition-colors duration-300">{dashboardData.totalCustomers}</span>
                        </div>
                    </div>
                    <div className="group flex justify-between items-center cursor-pointer w-80 lg:w-96 px-3 py-5 rounded-lg border-b-[7px] transition-all ease-in-out shadow-xl hover:border-purple-500 border-purple-300">
                        <div className="text-4xl text-white p-5 rounded-lg shadow-xl glass bg-purple-400 group-hover:bg-purple-500">
                            <FaFileInvoiceDollar className="group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className='text-center'>
                            <h2 className="text-lg text-gray-500 font-bold group-hover:text-purple-500 transition-colors duration-300">Collections</h2>
                            <span className="text-5xl font-bold text-purple-400 group-hover:text-purple-500 transition-colors duration-300">{dashboardData.totalCollections}</span>
                        </div>
                    </div>
                    <div className="group flex justify-between items-center cursor-pointer w-80 lg:w-96 px-3 py-5 rounded-lg border-b-[7px] transition-all ease-in-out shadow-xl hover:border-pink-500 border-pink-300">
                        <div className="text-4xl text-white p-5 rounded-lg shadow-xl glass bg-pink-400 group-hover:bg-pink-500">
                            <FaFilterCircleXmark className="group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className='text-center'>
                            <h2 className="text-lg text-gray-500 font-bold group-hover:text-pink-500 transition-colors duration-300">Dues</h2>
                            <span className="text-5xl font-bold text-pink-400 group-hover:text-pink-500 transition-colors duration-300">{dashboardData.totalDues}</span>
                        </div>
                    </div>
                    <div className="group flex justify-between items-center cursor-pointer w-80 lg:w-96 px-3 py-5 rounded-lg border-b-[7px] transition-all ease-in-out shadow-xl hover:border-red-500 border-red-300">
                        <div className="text-4xl text-white p-5 rounded-lg shadow-xl glass bg-red-400 group-hover:bg-red-500">
                            <FaSackDollar className="group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className='text-center'>
                            <h2 className="text-lg text-gray-500 font-bold group-hover:text-red-500 transition-colors duration-300">Advanced</h2>
                            <span className="text-5xl font-bold text-red-400 group-hover:text-red-500 transition-colors duration-300">{dashboardData.totalAdvanced}</span>
                        </div>
                    </div>
                    <div className="group flex justify-between items-center cursor-pointer w-80 lg:w-96 px-3 py-5 rounded-lg border-b-[7px] transition-all ease-in-out shadow-xl hover:border-blue-500 border-blue-300">
                        <div className="text-4xl text-white p-5 rounded-lg shadow-xl glass bg-blue-400 group-hover:bg-blue-500">
                            <FaCalendarDays className="group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className='text-center'>
                            <h2 className="text-lg text-gray-500 font-bold group-hover:text-blue-500 transition-colors duration-300">Today's</h2>
                            <span className="text-5xl font-bold text-blue-400 group-hover:text-blue-500 transition-colors duration-300">{dashboardData.todaysCollection}</span>
                        </div>
                    </div>
                    <div className="group flex justify-between items-center cursor-pointer w-80 lg:w-96 px-3 py-5 rounded-lg border-b-[7px] transition-all ease-in-out shadow-xl hover:border-teal-500 border-teal-300">
                        <div className="text-4xl text-white p-5 rounded-lg shadow-xl glass bg-teal-400 group-hover:bg-teal-500">
                            <FaCalendarCheck className="group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className='text-center'>
                            <h2 className="text-lg text-gray-500 font-bold group-hover:text-teal-500 transition-colors duration-300">This Month</h2>
                            <span className="text-5xl font-bold text-teal-400 group-hover:text-teal-500 transition-colors duration-300">{dashboardData.thisMonthsCollection}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lg:flex p-5 shadow-xl rounded-xl w-full justify-around gap-24 mt-12 lg:mt-24'>
                <Chart labels={[]} datasets={[]} />
                <PayDueChart />
            </div>
            <div className="lg:flex p-5 shadow-xl rounded-xl w-full justify-around gap-24 mt-12 lg:mt-24">
                <CustomerDistribution distribution={dashboardData.customerDistribution} />
                <TopPayers topPayers={dashboardData.topPayers} />
            </div>
            <div className="lg:flex p-5 shadow-xl rounded-xl w-full justify-around gap-24 mt-12 lg:mt-24">
                <MonthlyRevenueChart data={dashboardData.monthlyRevenue} />
            </div>
            <h2 className='text-xl my-24 text-center w-full'>
                Update Coming Soon..
                <p className='divider'>Latest Features</p>
            </h2>
        </div>
    );
};

export default Dashboard;
