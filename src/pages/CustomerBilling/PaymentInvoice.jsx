import React from 'react';

const PaymentInvoice = ({ paymentAmount, customerInfo, receiverInfo, billDetails }) => {
    if (!customerInfo) {
        return <div>Loading...</div>; // or handle the case where customerInfo is not available
    }

    console.log('customerInfo:', customerInfo);


    const { name, email, phone } = customerInfo;

    const invoiceContainer = "border rounded p-4 mb-4";
    const invoiceTitle = "text-lg font-bold mb-2";
    const gridCols = "grid grid-cols-2 gap-4";
    const fontBold = "font-bold";
    const label = "text-gray-500";

    return (
        <div className={invoiceContainer}>
            <h2 className={invoiceTitle}>Payment Invoice</h2>
            <div className={gridCols}>
                <div>
                    <h3 className={fontBold}>Customer Information</h3>
                    <div className={label}>Name: {name}</div>
                    <div className={label}>Email: {email}</div>
                    <div className={label}>Phone: {phone}</div>
                    {/* Add more customer information as needed */}
                </div>
                <div>
                    <h3 className={fontBold}>Receiver Information</h3>
                    <div className={label}>Name: {receiverInfo.name}</div>
                    <div className={label}>Address: {receiverInfo.address}</div>
                    {/* Add more receiver information as needed */}
                </div>
                <div className="col-span-2">
                    <h3 className={fontBold}>Bill Details</h3>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Description</th>
                                <th className="py-2 px-4 border-b">Amount</th>
                                <th className="py-2 px-4 border-b">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billDetails.map((detail, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b">{detail.description}</td>
                                    <td className="py-2 px-4 border-b">{detail.amount}</td>
                                    <td className="py-2 px-4 border-b">{detail.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3 className={fontBold}>Payment Amount</h3>
                    <div>{paymentAmount}</div>
                </div>
            </div>
        </div>
    );
};

export default PaymentInvoice;
