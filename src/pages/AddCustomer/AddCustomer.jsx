import React, { useState } from 'react';

const AddCustomer = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [area, setArea] = useState('');
    const [email, setEmail] = useState('');
    const [bill, setBill] = useState(''); // Corrected the state variable name

    const handleAddCustomer = async () => {
        // Validate that all required fields are provided
        if (!name || !mobile || !area || !email) {
            console.error('Name, mobile, area, and email are required');
            return;
        }
    
        const customer = { name, mobile, area, email, bill }; // Added 'bill' to customer object
        try {
            const response = await fetch('http://localhost:5000/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            });
            if (response.ok) {
                console.log('Customer added successfully');
                // Reset form fields after successful submission
                setName('');
                setMobile('');
                setArea('');
                setEmail('');
                setBill('');
            } else {
                console.error('Failed to add customer');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="lg:p-10 rounded-xl mt-20 mx-auto">
                <h3 className="text-center my-10 text-xl font-bold divider">Add Customer</h3>
                <form className="grid grid-cols-1 mx-auto space-y-3 w-[400px;]">
                    <input
                        type="text"
                        placeholder="Customer Name"
                        className="input input-bordered input-primary"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Mobile"
                        className="input input-bordered input-primary"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered input-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text" // Changed type to "text" for bill input
                        placeholder="Bill"
                        className="input input-bordered input-primary"
                        value={bill} // Changed value to bill state variable
                        onChange={(e) => setBill(e.target.value)} // Changed handler function to setBill
                    />
                    <select
                        className="select select-primary"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    >
                        <option disabled value="">Area</option>
                        <option>Area-1</option>
                        <option>Area-2</option>
                        <option>Area-3</option>
                        <option>Area-4</option>
                        <option>Area-5</option>
                    </select>
                    <button className="btn btn-outline btn-primary" onClick={handleAddCustomer}>Add New Customer</button>
                </form>
            </div>
        </div>
    );
};

export default AddCustomer;
