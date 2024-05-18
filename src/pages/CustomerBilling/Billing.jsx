import { useState, useEffect } from 'react';
import axios from 'axios';
import PayBill from './PayBill';
import { Link } from 'react-router-dom';
import SearchCustomer from '../../components/shared/SearchCustomer';

const Billing = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCustomers();
        const interval = setInterval(fetchCustomers, 60000); // Fetch customers every 1 minute
        return () => clearInterval(interval);
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('https://user-managed-server.vercel.app/customers');
            setCustomers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching customers');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://user-managed-server.vercel.app/customers/${id}`);
            setCustomers(customers.filter(customer => customer._id !== id));
        } catch (err) {
            console.error('Error deleting customer:', err);
            setError('Error deleting customer');
        }
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

    return (
        <div className="container mx-auto p-4">
            <h3 className="text-center my-10 text-xl font-bold divider">Customer Billing</h3>
            <div className='flex justify-between items-center'>
                <p className='p-3 bg-sky-500 text-white w-24 text-center rounded-full btn hover:bg-sky-700'>Total: {customers.length}</p>

                <SearchCustomer setCustomers={setCustomers} setError={setError} />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
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
                                    <th className="py-2 border-b">Last Payment Date</th>
                                    <th className="py-2 px-4 border-b">Payment Status</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(customer => (
                                    <tr key={customer._id} className='hover:bg-blue-100'>
                                        <td className="py-2 border-b">{customer.name}</td>
                                        <td className="py-2 px-4 border-b">{customer.mobile}</td>
                                        <td className="py-2 border-b">{customer.area}</td>
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
                                                <PayBill customerId={customer._id} fetchCustomers={fetchCustomers} />
                                            )}
                                            <button
                                                onClick={() => handleDelete(customer._id)}
                                                className="bg-red-500 text-white  rounded btn hidden"
                                            >
                                                Delete
                                            </button>
                                            <Link to={`/customerdetails/${customer._id}`}><button className="btn">Details</button></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Billing;
