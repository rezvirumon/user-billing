import React, { useState } from 'react';
import axios from 'axios';

const PayBill = ({ customerId, fetchCustomers }) => {
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [showPaymentInput, setShowPaymentInput] = useState(false);

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/billing/${customerId}`, {
                payment: paymentAmount
            });
            fetchCustomers();
            setShowPaymentInput(false);
            setPaymentAmount(0);
        } catch (err) {
            console.error('Error processing payment:', err);
        }
    };

    return (
        <div>
            {showPaymentInput ? (
                <form onSubmit={handlePaymentSubmit}>
                    <input
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="Enter payment amount"
                        required
                    />
                    <button type="submit">Pay</button>
                </form>
            ) : (
                <button onClick={() => setShowPaymentInput(true)}>Pay Bill</button>
            )}
        </div>
    );
};

export default PayBill;
