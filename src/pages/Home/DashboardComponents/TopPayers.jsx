import React from 'react';

const TopPayers = ({ topPayers }) => {
    return (
        <div className="p-5 rounded-xl w-full">
            <h3 className="text-lg font-bold mb-4">Top Payers</h3>
            <ul>
                {topPayers.map((payer, index) => (
                    <li key={index} className="flex justify-between py-2  hover:bg-base-200">
                        <span>{payer._id}</span>
                        <span>{payer.totalPaid}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopPayers;
