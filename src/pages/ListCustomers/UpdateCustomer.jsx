import { useState } from "react";
import Swal from 'sweetalert2';


const UpdateCustomer = ({ customer, onClose }) => {
    const [name, setName] = useState(customer.name);
    const [mobile, setMobile] = useState(customer.mobile);
    const [email, setEmail] = useState(customer.email);
    const [area, setArea] = useState(customer.area);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const updatedCustomer = { ...customer, name, mobile, email, area };
        // Send updated customer data to the backend
        try {
            const response = await fetch(`http://localhost:5000/customers/${customer._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCustomer)
            });
            if (response.ok) {
                console.log('Customer updated successfully');
                onClose(); // Close the modal
                Swal.fire({
                    icon: 'success',
                    title: 'Customer updated successfully',
                });
            } else {
                console.error('Failed to update customer');
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to update customer',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating the customer',
            });
        }
    };

    return (
        <div className="update-customer-modal min-h-[60vh] ">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 ">
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="update-customer-input input input-bordered input-primary"
                />
                <input
                    type="text"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="update-customer-input input input-bordered input-primary"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="update-customer-input input input-bordered input-primary"
                />
                <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="update-customer-input input input-bordered input-primary"
                >
                    <option disabled value="">Area</option>
                    <option>Area-1</option>
                    <option>Area-2</option>
                    <option>Area-3</option>
                    <option>Area-4</option>
                    <option>Area-5</option>
                </select>
                <button type="submit" className="update-customer-button btn btn-outline btn-primary">Update Customer</button>
            </form>
        </div>
    );
};

export default UpdateCustomer;
