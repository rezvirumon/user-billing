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
                        <h3 className="">Pay Bill</h3>
                        <form onSubmit={handlePaymentSubmit} className='flex flex-col '>
                            <input
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                placeholder="Enter payment amount"
                                required
                                className="input input-bordered input-primary my-2"
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
