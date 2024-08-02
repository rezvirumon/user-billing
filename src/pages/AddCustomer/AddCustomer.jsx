import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AddCustomer = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [area, setArea] = useState('');
    const [email, setEmail] = useState('');
    const [bill, setBill] = useState('');

    const handleAddCustomer = async (event) => {
        event.preventDefault(); // Prevent default form submission
        
        // Validate that all required fields are provided
        if (!name || !mobile || !area || !email || !bill) {
            toast.error('All fields are required');
            return;
        }

        const customer = { name, mobile, area, email, bill };
        try {
            const response = await fetch('https://user-managed-server.vercel.app/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            });
            if (response.ok) {
                toast.success('Customer added successfully');
                // Reset form fields after successful submission
                setName('');
                setMobile('');
                setArea('');
                setEmail('');
                setBill('');
            } else {
                toast.error('Failed to add customer');
            }
        } catch (error) {
            toast.error('Error:', error.message);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="lg:p-10 rounded-xl mt-20 mx-auto">
                <h3 className="text-center my-10 text-xl font-bold divider">Add Customer</h3>
                <form className="grid grid-cols-1 mx-auto space-y-3 lg:w-[400px] px-3" onSubmit={handleAddCustomer}>
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
                        type="text"
                        placeholder="Bill"
                        className="input input-bordered input-primary"
                        value={bill}
                        onChange={(e) => setBill(e.target.value)}
                    />
                    <select
                        className="select select-primary"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    >
                        <option disabled value="">Area</option>
                        <option>Golapganj</option>
                        <option>Mahatabpur</option>
                        <option>Mahatabpur-2</option>
                        <option>Basudebpur</option>
                        <option>Basudebpur-2</option>
                        <option>Koikuri</option>
                        <option>Koikuri-2</option>
                        <option>Chilkura</option>
                        <option>Chilkura-2</option>
                        <option>Jogodishpur</option>
                        <option>Adorshogram</option>
                        <option>Shapla</option>
                        <option>Dhakaiya Para</option>
                        <option>Jaliya Para</option>
                    </select>
                    <button type="submit" className="btn btn-outline btn-primary">Add New Customer</button>
                </form>
            </div>
            <Toaster /> {/* Add the Toaster component to display toast notifications */}
        </div>
    );
};

export default AddCustomer;
