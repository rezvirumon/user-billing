import { useEffect, useState } from 'react';
import Modal from 'react-modal'; // Import react-modal
import UpdateCustomer from './UpdateCustomer';
import Swal from 'sweetalert2';

const ListCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null); // Track selected customer for edit modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open modal and set the selected customer
    const handleOpenModal = (customer) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:5000/customers');
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    // Function to delete a customer
    const handleDeleteCustomer = async (customerId) => {
        try {
            const response = await fetch(`http://localhost:5000/customers/${customerId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('Customer deleted successfully');
                Swal.fire({
                    icon: 'success',
                    title: 'Customer deleted successfully',
                }).then(() => {
                    // Fetch updated customer list after successful deletion
                    fetchCustomers();
                });
            } else {
                console.error('Failed to delete customer');
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to delete customer',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while deleting the customer',
            });
        }
    };

    return (
        <div className="container mx-auto">
            <div className="overflow-x-auto">
                <h3 className="text-center my-10 text-xl font-bold divider">List Customers</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Area</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer._id}>
                                <th>{index + 1}</th>
                                <td>{customer.name}</td>
                                <td>{customer.mobile}</td>
                                <td>{customer.email}</td>
                                <td>{customer.area}</td>
                                <td className="space-x-2">
                                    <button className="btn" onClick={() => handleOpenModal(customer)}>Edit</button>
                                    <button onClick={() => {
                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: 'Once deleted, you will not be able to recover this customer!',
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonText: 'Yes, delete it!',
                                            cancelButtonText: 'No, keep it'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                handleDeleteCustomer(customer._id);
                                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                Swal.fire(
                                                    'Cancelled',
                                                    'Your customer is safe :)',
                                                    'info'
                                                );
                                            }
                                        });
                                    }} className="btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className=''>
                    {/* Modal for updating customer */}
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        contentLabel="Update Customer"
                        
                    >
                        {selectedCustomer && <UpdateCustomer customer={selectedCustomer} onClose={() => setIsModalOpen(false)} />}
                        <button className="btn" onClick={() => setIsModalOpen(false)}>Close</button>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ListCustomers;
