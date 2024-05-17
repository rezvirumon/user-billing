import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

const PayBill = ({ customerId, fetchCustomers }) => {
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/billing/${customerId}`, {
                payment: paymentAmount
            });
            fetchCustomers();
            setShowModal(false);
            setPaymentAmount(0);
            showSuccessAlert(); // Show success alert after successful payment
        } catch (err) {
            console.error('Error processing payment:', err);
        }
    };
    
    // Function to show success alert
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
                Pay Bill
            </button>

            {showModal && (
                <dialog id="my_modal_1" className="modal" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Pay Bill</h3>
                        <form onSubmit={handlePaymentSubmit}>
                            <input
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                placeholder="Enter payment amount"
                                required
                                className="mr-2 appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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
