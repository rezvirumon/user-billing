import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import CustomerModal from '../AddCustomer/AddCustomerModal';
import { FaDeleteLeft } from 'react-icons/fa6';
import { FaInfo } from 'react-icons/fa';

const ListCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCustomers, setSelectedCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await fetch('https://user-managed-server.vercel.app/customers');
            if (!response.ok) {
                throw new Error('Failed to fetch customers');
            }
            const data = await response.json();
            setCustomers(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleSelectCustomer = (customerId) => {
        setSelectedCustomers(prevSelected =>
            prevSelected.includes(customerId)
                ? prevSelected.filter(id => id !== customerId)
                : [...prevSelected, customerId]
        );
    };

    const handleDeleteSelectedCustomers = async () => {
        try {
            const promises = selectedCustomers.map(customerId =>
                fetch(`https://user-managed-server.vercel.app/customers/${customerId}`, {
                    method: 'DELETE',
                })
            );

            const results = await Promise.all(promises);
            const allSuccessful = results.every(response => response.ok);

            if (allSuccessful) {
                Swal.fire({
                    icon: 'success',
                    title: 'Selected customers deleted successfully',
                }).then(() => {
                    fetchCustomers();
                    setSelectedCustomers([]);
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to delete some customers',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while deleting customers',
            });
        }
    };

    return (
        <div className="">
            <div className='pt-10'>
                <CustomerModal />
            </div>
            <h3 className="text-center my-10 text-xl font-bold divider">List Customers</h3>
            <div className="text-center mb-4">
                {selectedCustomers.length > 0 && (
                    <button
                        onClick={() => {
                            Swal.fire({
                                title: 'Are you sure?',
                                text: 'Once deleted, you will not be able to recover these customers!',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Yes, delete them!',
                                cancelButtonText: 'No, keep them'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    handleDeleteSelectedCustomers();
                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                    Swal.fire(
                                        'Cancelled',
                                        'Your customers are safe :)',
                                        'info'
                                    );
                                }
                            });
                        }}
                        className="btn bg-red-400 text-white hover:bg-red-500"
                    >
                        Delete Selected <FaDeleteLeft />
                    </button>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="table border text-center">
                    <thead className='bg-base-300'>
                        <tr>
                            <th>Select</th>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Area</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={customer._id} className='hover:bg-blue-100'>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedCustomers.includes(customer._id)}
                                        onChange={() => handleSelectCustomer(customer._id)}
                                    />
                                </td>
                                <th>{index + 1}</th>
                                <td>{customer.name}</td>
                                <td>{customer.mobile}</td>
                                <td>{customer.email}</td>
                                <td>{customer.area}</td>
                                <td>{customer.status}</td>
                                <td className="space-x-2 flex items-center justify-center">
                                    <Link to={`/customerdetails/${customer._id}`}>
                                        <button className="btn w-[100px] bg-purple-400 text-white hover:bg-purple-500">
                                            Details <FaInfo />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Are you sure?',
                                                text: 'Once deleted, you will not be able to recover this customer!',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonText: 'Yes, delete it!',
                                                cancelButtonText: 'No, keep it'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    handleDeleteCustome(customer._id);
                                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                                    Swal.fire(
                                                        'Cancelled',
                                                        'Your customer is safe :)',
                                                        'info'
                                                    );
                                                }
                                            });
                                        }}
                                        className="btn bg-red-400 text-white hover:bg-red-500"
                                    >
                                        Delete <FaDeleteLeft />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListCustomers;
