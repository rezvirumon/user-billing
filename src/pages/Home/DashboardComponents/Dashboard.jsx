import React from 'react';

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-8 h-screen">
            <h1 className="text-3xl font-semibold mb-4">Welcome to the Dashboard!</h1>
            <p className="text-lg">This is where you can manage your user billing.</p>

            <div className="w-full lg:w-3/4 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">User Summary</h2>
                <p>Total Users: 120</p>
                <p>Active Users: 110</p>
                <p>Inactive Users: 10</p>
            </div>

            <div className="w-full lg:w-3/4 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
                <p>Total Revenue: $10,000</p>
                <p>Pending Invoices: 5</p>
                <p>Overdue Invoices: 2</p>
            </div>

            <div className="w-full lg:w-3/4 bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
                <ul className="list-disc list-inside">
                    <li>User John Doe updated their profile.</li>
                    <li>Invoice #1234 was paid.</li>
                    <li>User Jane Smith registered.</li>
                    <li>Invoice #5678 is overdue.</li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
