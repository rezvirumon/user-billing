import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const CustomerDetails = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        area: '',
        email: '',
        bill: 0,
        payment: 0, // New field for payment
        due: 0 // New field for due
    });
    const [editMode, setEditMode] = useState(false);

    const fetchCustomerDetails = async () => {
        try {
            const response = await fetch(`https://user-managed-server.vercel.app/customers/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch customer details');
            }
            const data = await response.json();
            setCustomer(data);
            setFormData({
                name: data.name,
                mobile: data.mobile,
                area: data.area,
                email: data.email,
                bill: data.bill,
                payment: data.payments.reduce((total, payment) => total + payment.amount, 0),
                due: data.bill - data.payments.reduce((total, payment) => total + payment.amount, 0)
            });
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    };

    useEffect(() => {
        fetchCustomerDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://user-managed-server.vercel.app/customers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to update customer');
            }
            console.log('Customer updated successfully');
            fetchCustomerDetails();
            setEditMode(false); // Exit edit mode after successful update
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    return (
        <div className="container mx-auto p-4">
                        <Link to='/billing' className='btn my-5 ml-6 btn-outline btn-error'>Back To Billing</Link>
            <div className="lg:flex p-6 gap-5 items-center">
                <div className="lg:flex bg-white rounded-xl gap-6 shadow-xl mb-4 p-4">
                    <div className="mb-6 ">
                        <img src="https://source.unsplash.com/100x100/?portrait?1" alt="Customer Avatar" className="object-cover object-center w-48 rounded dark:bg-gray-500" />
                    </div>
                    <div className="flex flex-col w-full h-full space-y-4">
                        {editMode ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700">Name:</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label htmlFor="mobile" className="block text-gray-700">Mobile:</label>
                                    <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label htmlFor="area" className="block text-gray-700">Area:</label>
                                    <input type="text" id="area" name="area" value={formData.area} onChange={handleChange} className="input input-bordered w-full" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered w-full" />
                                </div>
                                <button type="submit" className="btn w-full btn-primary btn-outline">Update Info</button>
                            </form>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-gray-700">Name:</label>
                                    <span>{customer && customer.name}</span>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Mobile:</label>
                                    <span>{customer && customer.mobile}</span>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Area:</label>
                                    <span>{customer && customer.area}</span>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Email:</label>
                                    <span>{customer && customer.email}</span>
                                </div>
                                <button className="btn w-48 btn-primary btn-outline" onClick={toggleEditMode}>Edit Info</button>
                            </>
                        )}
                    </div>
                </div>
                <div className=" lg:w-3/6">
                    <div className="mb-4 bg-white rounded-xl shadow-xl ">
                        <div className="flex gap-5 text-xl border-b-2 p-3">
                            <label className="block text-gray-700">Bill:</label>
                            <span>{customer && customer.bill}</span>
                        </div>
                        <div className="flex gap-5 text-xl  p-3">
                            <label className="block text-gray-700">Due:</label>
                            <span>{customer && customer.due}</span>
                        </div>
                    </div>
                    <div className="lg:flex bg-white rounded-xl gap-6 shadow-xl mb-4 p-4">
                    <div className="mb-6 w-full">
                        <h3 className="text-xl font-semibold mb-4">Payment History</h3>
                        {customer && customer.payments.length > 0 ? (
                            <table className="table table-auto w-full text-center">
                                <thead>
                                    <tr className='bg-base-200'>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Receiver</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customer.payments.map((payment, index) => (
                                        <tr key={index} className='hover:bg-base-200'>
                                            <td>{new Date(payment.date).toLocaleDateString()}</td>
                                            <td>{payment.amount}</td>
                                            <td>{payment.receiver}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No payment history available.</p>
                        )}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerDetails;
