// PayBill.js

import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider'; // Adjust the path based on your project structure

const PayBill = ({ customerId, fetchCustomers }) => {
    const { user } = useContext(AuthContext); // Use AuthContext to get the current user
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [receiver, setReceiver] = useState(user ? user.displayName : ''); // Set default receiver name to current user's name
    const [showModal, setShowModal] = useState(false);

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://user-managed-server.vercel.app/billing/${customerId}`, {
                payment: paymentAmount,
                receiver // Include receiver's name in the request
            });
            fetchCustomers();
            setShowModal(false);
            setPaymentAmount(0);
            setReceiver(user ? user.displayName : ''); // Reset receiver's name to current user's name
            showSuccessAlert();
        } catch (err) {
            console.error('Error processing payment:', err);
        }
    };

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            text: 'Your payment has been processed successfully.'
        });
    };

    return (
        <div>
            <button className="btn bg-red-600 text-white hover:bg-red-700" onClick={() => setShowModal(true)}>
                Pay
            </button>

            {showModal && (
                <dialog id="my_modal_1" className="modal" open>
                    <div className="modal-box">
                        <h3>Pay Bill</h3>
                        <form onSubmit={handlePaymentSubmit} className='flex flex-col'>
                            <input
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
                                placeholder="Enter payment amount"
                                required
                                className="input input-bordered input-primary my-2"
                            />
                            <input
                                type="text"
                                value={receiver}
                                onChange={(e) => setReceiver(e.target.value)}
                                placeholder="Enter receiver's name"
                                required
                                className="input input-bordered input-primary my-2 hidden"
                            />
                            <button type="submit" className="btn btn-outline btn-success">
                                Pay
                            </button>
                        </form>
                        <button className="btn mt-4" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default PayBill;
