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

    const handleDeleteCustomer = async (customerId) => {
        try {
            const response = await fetch(`https://user-managed-server.vercel.app/customers/${customerId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Customer deleted successfully',
                }).then(() => {
                    fetchCustomers();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to delete customer',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while deleting the customer',
            });
        }
    };



   

    return (
        <div className="">
            <div className='pt-10'>
                <CustomerModal />
            </div>
            <h3 className="text-center my-10 text-xl font-bold divider">List Customers</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className='bg-base-300'>
                        <tr>
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
                                <th>{index + 1}</th>
                                <td>{customer.name}</td>
                                <td>{customer.mobile}</td>
                                <td>{customer.email}</td>
                                <td>{customer.area}</td>
                                <td>{customer.status}</td>
                                
                                <td className="space-x-2 flex items-center">
                                    <Link to={`/customerdetails/${customer._id}`}><button className="btn bg-purple-400 text-white hover:bg-purple-500">Details <FaInfo/></button></Link>
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
                                    }} className="btn bg-red-400 text-white hover:bg-red-500">Delete <FaDeleteLeft/></button>
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
