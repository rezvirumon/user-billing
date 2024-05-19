import React from 'react';

const CustomerDistribution = ({ distribution }) => {
    return (
        <div className="p-5 rounded-xl w-full">
            <h3 className="text-lg font-bold mb-4">Customer Distribution by Area</h3>
            <ul>
                {distribution.map((area, index) => (
                    <li key={index} className="flex justify-between py-2 hover:bg-base-200">
                        <span>{area.area}</span>
                        <span>{area.count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerDistribution;
