import  { useState, useEffect } from 'react';
import axios from 'axios';
import PayBill from './PayBill';

const Billing = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();

        const interval = setInterval(fetchCustomers, 60000); // Fetch customers every 1 minute
        return () => clearInterval(interval);
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/customers');
            setCustomers(response.data);
        } catch (err) {
            console.error('Error fetching customers:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/customers/${id}`);
            setCustomers(customers.filter(customer => customer._id !== id));
        } catch (err) {
            console.error('Error deleting customer:', err);
        }
    };

    // Function to determine payment status based on bill and payment amount
    const getPaymentStatus = (bill, totalPayment) => {
        if (totalPayment === bill) {
            return 'Paid';
        } else if (totalPayment > bill) {
            return 'Advanced';
        } else {
            return 'Unpaid';
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Billing</h1>

            <div>
                <h2 className="text-xl font-semibold mb-2">Customer List</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Mobile</th>
                                <th className="py-2 px-4 border-b">Area</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Bill</th>
                                <th className="py-2 px-4 border-b">Pay</th>
                                <th className="py-2 px-4 border-b">Due</th>
                                <th className="py-2 px-4 border-b">Last Payment Date</th>
                                <th className="py-2 px-4 border-b">Payment Status</th> {/* New column */}
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customer => (
                                <tr key={customer._id}>
                                    <td className="py-2 px-4 border-b">{customer.name}</td>
                                    <td className="py-2 px-4 border-b">{customer.mobile}</td>
                                    <td className="py-2 px-4 border-b">{customer.area}</td>
                                    <td className="py-2 px-4 border-b">{customer.email}</td>
                                    <td className="py-2 px-4 border-b">{customer.bill}</td>
                                    <td className="py-2 px-4 border-b">
                                        {customer.payments.reduce((total, payment) => total + payment.amount, 0)}
                                    </td>
                                    <td className="py-2 px-4 border-b">{customer.due}</td>
                                    <td className="py-2 px-4 border-b">{customer.payments.length > 0 ? new Date(customer.payments[customer.payments.length - 1].date).toLocaleDateString() : '-'}</td>

                                    <td className="py-2 px-4 border-b">{getPaymentStatus(customer.bill, customer.payments.reduce((total, payment) => total + payment.amount, 0))}</td> {/* Payment Status */}
                                    <td className="py-2 px-4 border-b">
                                        {getPaymentStatus(customer.bill, customer.payments.reduce((total, payment) => total + payment.amount, 0)) === 'Unpaid' && (
                                            <PayBill customerId={customer._id} fetchCustomers={fetchCustomers} />
                                        )}
                                        <button
                                            onClick={() => handleDelete(customer._id)}
                                            className="bg-red-500 text-white px-4 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Billing;
