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
            const response = await fetch(`http://localhost:5000/customers/${id}`);
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
                payment: data.payment, // Set payment from fetched data
                due: data.bill - data.payment // Calculate due based on bill and payment
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
            const response = await fetch(`http://localhost:5000/customers/${id}`, {
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
        <div>
            <Link to='/listcustomers' className='btn my-5'>Back To Customer List</Link>
            <div className='bg-base-100 shadow-xl p-5 flex gap-5'>
                <div className="max-w-md p-8 sm:flex sm:space-x-6 dark:bg-gray-50 dark:text-gray-800">
                    <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                        <img src="https://source.unsplash.com/100x100/?portrait?1" alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
                    </div>
                    <div className="flex flex-col space-y-4">
                        {editMode ? (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block">Name:</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input input-bordered" />
                                </div>
                                <div>
                                    <label htmlFor="mobile" className="block">Mobile:</label>
                                    <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="input input-bordered" />
                                </div>
                                <div>
                                    <label htmlFor="area" className="block">Area:</label>
                                    <input type="text" id="area" name="area" value={formData.area} onChange={handleChange} className="input input-bordered" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block">Email:</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered" />
                                </div>
                                <button type="submit" className="btn mt-3">Update Info</button>
                            </form>
                        ) : (
                            <>
                                <div>
                                    <label htmlFor="name" className="block">Name:</label>
                                    <span>{customer && customer.name}</span>
                                </div>
                                <div>
                                    <label htmlFor="mobile" className="block">Mobile:</label>
                                    <span>{customer && customer.mobile}</span>
                                </div>
                                <div>
                                    <label htmlFor="area" className="block">Area:</label>
                                    <span>{customer && customer.area}</span>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block">Email:</label>
                                    <span>{customer && customer.email}</span>
                                </div>
                                <button className="btn mt-3" onClick={toggleEditMode}>Edit Info</button>
                            </>
                        )}
                        <div>
                            <label htmlFor="bill" className="block">Bill:</label>
                            <span>{customer && customer.bill}</span>
                        </div>
                        <div>
                            <label className="block">Payment:</label>
                            {customer && customer.payments.map((payment, index) => (
                                <div key={index}>{payment.amount} - {new Date(payment.date).toLocaleDateString()}</div>
                            ))}
                        </div>
                        <div>
                            <label htmlFor="due" className="block">Due:</label>
                            <span>{customer && customer.due}</span>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerDetails;
