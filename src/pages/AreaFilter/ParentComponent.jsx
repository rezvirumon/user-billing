import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AreaFilter from './AreaFilter';
import PayBill from '../CustomerBilling/PayBill'; // Make sure to import the PayBill component
import { FaInfo } from 'react-icons/fa';

const ParentComponent = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedArea, setSelectedArea] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchMobile, setSearchMobile] = useState('');

    // Function to fetch filtered data based on the selected area
    const fetchDataByArea = (selectedArea) => {
        // Show loader while fetching data
        setLoading(true);
        setSelectedArea(selectedArea); // Update selected area

        // Fetch data from the backend based on the selected area
        fetch(`https://user-managed-server.vercel.app/customers?area=${selectedArea}`)
            .then(response => response.json())
            .then(data => {
                // Update filtered data state with the fetched data
                setFilteredData(data);
                // Hide loader when data is fetched
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching filtered data:', error);
                // Hide loader if an error occurs
                setLoading(false);
            });
    };

    const getPaymentStatus = (bill, totalPayment) => {
        const due = bill - totalPayment;
        if (due === 0) {
            return 'Paid';
        } else if (due < 0) {
            return 'Advanced';
        } else {
            return 'Unpaid';
        }
    };

    const calculateAdvancedAmount = (bill, totalPayment) => {
        return totalPayment > bill ? totalPayment - bill : 0;
    };

    // Filter customers based on searchName and searchMobile
    const filteredCustomers = filteredData.filter(customer => {
        const matchesName = customer.name.toLowerCase().includes(searchName.toLowerCase());
        const matchesMobile = customer.mobile.includes(searchMobile);
        return matchesName && matchesMobile;
    });

    return (
        <div className='px-3'>
            {/* Render the AreaFilter component and pass the onSelect function */}
            <AreaFilter onSelect={fetchDataByArea} />
            <div className="flex gap-4 mt-4">
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <input
                    type="text"
                    placeholder="Search by Mobile"
                    value={searchMobile}
                    onChange={(e) => setSearchMobile(e.target.value)}
                    className="input input-bordered w-full max-w-xs hidden"
                />
            </div>
            {/* Display the loader if loading */}
            {loading && <div className="loader">Loading...</div>}
            {/* Display the filtered data in a table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white mt-4 text-center">
                    <thead className='bg-base-200'>
                        <tr>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Mobile</th>
                            <th className="py-2 px-4 border-b">Area</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Bill</th>
                            <th className="py-2 px-4 border-b">Pay</th>
                            <th className="py-2 px-4 border-b">Due</th>
                            <th className="py-2 px-4 border-b">Advanced</th>
                            <th className="py-2 px-4 border-b">Last Payment Date</th>
                            <th className="py-2 px-4 border-b">Payment Status</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map(customer => (
                            // Render only if the area matches the selected area
                            customer.area === selectedArea && (
                                <tr key={customer._id} className='hover:bg-blue-100'>
                                    <td className="py-2 border-b">{customer.name}</td>
                                    <td className="py-2 px-4 border-b">{customer.mobile}</td>
                                    <td className="py-2 px-4 border-b">{customer.area}</td>
                                    <td className="py-2 px-4 border-b">{customer.email}</td>
                                    <td className="py-2 px-4 border-b">{customer.bill}</td>
                                    <td className="py-2 px-4 border-b">
                                        {customer.payments.reduce((total, payment) => total + payment.amount, 0)}
                                    </td>
                                    <td className="py-2 px-4 border-b">{customer.due}</td>
                                    <td className="py-2 px-4 border-b">
                                        {calculateAdvancedAmount(customer.bill, customer.payments.reduce((total, payment) => total + payment.amount, 0))}
                                    </td>
                                    <td className="py-2 px-4 border-b">{customer.lastPayDate ? new Date(customer.lastPayDate).toLocaleDateString() : '-'}</td>
                                    <td className="py-2 px-4 border-b">{getPaymentStatus(customer.bill, customer.payments.reduce((total, payment) => total + payment.amount, 0))}</td>
                                    <td className="flex gap-3 items-center justify-end py-2 px-4 border-b">
                                        {getPaymentStatus(customer.bill, customer.payments.reduce((total, payment) => total + payment.amount, 0)) === 'Unpaid' && (
                                            <PayBill customerId={customer._id} fetchCustomers={() => fetchDataByArea(selectedArea)} />
                                        )}
                                        <button
                                            onClick={() => handleDelete(customer._id)}
                                            className="bg-red-500 text-white rounded btn hidden"
                                        >
                                            Delete
                                        </button>
                                        <Link to={`/customerdetails/${customer._id}`}><button className="btn w-[100px] bg-purple-400 text-white hover:bg-purple-500">Details <FaInfo/></button></Link>
                                    </td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ParentComponent;
