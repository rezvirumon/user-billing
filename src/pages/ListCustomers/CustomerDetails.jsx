import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaCloudUploadAlt, FaDownload, FaEdit, FaPhone, FaEnvelope, FaSms } from 'react-icons/fa';
import { FaTurnUp } from 'react-icons/fa6';

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
        due: 0, // New field for due
        status: '' // New field for status
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
                due: data.bill - data.payments.reduce((total, payment) => total + payment.amount, 0),
                status: data.status // Set status
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
            Swal.fire({
                icon: 'success',
                title: 'Customer updated successfully',
            });
            fetchCustomerDetails();
            setEditMode(false); // Exit edit mode after successful update
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating the customer'
            });
            console.error('Error updating customer:', error);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const downloadReceipt = () => {
        if (!customer) return;

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Customer Payment Receipt', 14, 22);

        doc.setFontSize(12);
        doc.text('Rumon Cable TV Network', 14, 32);
        doc.text('Address: Golapganj Bazar, Birganj, Dinajpur', 14, 38);
        doc.text('Mobile: 09639185472', 14, 44);
        doc.text('Email: rctnbd@gmail.com', 14, 50);

        doc.text(`Customer Name: ${customer.name}`, 14, 60);
        doc.text(`Mobile: ${customer.mobile}`, 14, 66);
        doc.text(`Area: ${customer.area}`, 14, 72);
        doc.text(`Email: ${customer.email}`, 14, 78);
        doc.text(`Bill: ${customer.bill}`, 14, 84);
        doc.text(`Due: ${customer.due}`, 14, 90);

        doc.autoTable({
            startY: 96,
            head: [['Date', 'Amount', 'Receiver']],
            body: customer.payments.map(payment => [
                new Date(payment.date).toLocaleDateString(),
                payment.amount,
                payment.receiver
            ])
        });

        doc.save('payment_receipt.pdf');
    };

    const handleCall = () => {
        if (customer && customer.mobile) {
            window.location.href = `tel:${customer.mobile}`;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No mobile number available'
            });
        }
    };

    const handleSendEmail = () => {
        if (customer && customer.email) {
            const subject = "Payment Receipt";
            const body = `Dear ${customer.name},\n\nHere is your payment receipt.\n\nBill: ${customer.bill}\nDue: ${customer.due}\n\nThank you,\nRumon Cable TV Network`;
            window.location.href = `mailto:${customer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No email address available'
            });
        }
    };

    const handleSendSMS = () => {
        if (customer && customer.mobile) {
            const smsBody = `Dear ${customer.name}, your total bill is ${customer.bill} and your due amount is ${customer.due}. Thank you, Rumon Cable TV Network.`;
            window.location.href = `sms:${customer.mobile}?body=${encodeURIComponent(smsBody)}`;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No mobile number available'
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Link to='/billing' className='btn my-5 text-white ml-6 bg-red-400 hover:bg-red-500'>Back To Billing <FaTurnUp className="inline ml-1" /></Link>
            <div className="lg:flex p-6 gap-5 items-center">
                <div className="lg:flex bg-white rounded-xl gap-6 shadow-xl mb-4 p-4 w-full lg:w-1/3">
                    <div className="mb-6">
                        <img src="http://localhost:5173/src/assets/LogoBGR.png" alt="Customer Avatar" className="object-cover object-center w-48 mx-auto rounded-xl border-green-500 p-1 border-4" />
                        <div className="my-4 space-y-2">
                            <button className="btn w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2" onClick={handleCall}>
                                Call <FaPhone />
                            </button>
                            <button className="btn w-full bg-yellow-500 text-white hover:bg-yellow-600 flex items-center justify-center gap-2" onClick={handleSendEmail}>
                                Send Email <FaEnvelope />
                            </button>
                            <button className="btn w-full bg-green-500 text-white hover:bg-green-600 flex items-center justify-center gap-2" onClick={handleSendSMS}>
                                Send SMS <FaSms />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col w-full space-y-4">
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
                                <div>
                                    <label htmlFor="status" className="block text-gray-700">Status:</label>
                                    <select id="status" name="status" value={formData.status} onChange={handleChange} className="input input-bordered w-full">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn w-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2">
                                    Update Info <FaCloudUploadAlt />
                                </button>
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
                                <div>
                                    <label className="block text-gray-700">Status:</label>
                                    <select id="status" name="status" value={formData.status} onChange={handleChange} className="input input-bordered w-full">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <button className="btn w-full bg-yellow-500 text-white hover:bg-yellow-600 flex items-center justify-center gap-2" onClick={toggleEditMode}>
                                    Edit Info <FaEdit />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="lg:w-2/3">
                    <div className="mb-4 bg-white rounded-xl shadow-xl p-4">
                        <div className="flex gap-5 text-xl border-b-2 pb-3 mb-3">
                            <label className="block text-gray-700">Bill:</label>
                            <span>{customer && customer.bill}</span>
                        </div>
                        <div className="flex gap-5 text-xl">
                            <label className="block text-gray-700">Due:</label>
                            <span>{customer && customer.due}</span>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-xl p-4">
                        <div className="mb-6">
                            <div className='flex items-center justify-between'>
                                <p className="text-xl font-semibold mb-4">Payment History</p>
                                <button className='btn bg-green-200 hover:bg-green-100 flex items-center gap-2' onClick={downloadReceipt}>
                                    Download <FaDownload />
                                </button>
                            </div>
                            {customer && customer.payments.length > 0 ? (
                                <table className="table table-auto w-full text-center">
                                    <thead>
                                        <tr className='bg-gray-200'>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Receiver</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customer.payments.map((payment, index) => (
                                            <tr key={index} className='hover:bg-gray-200'>
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
};

export default CustomerDetails;
