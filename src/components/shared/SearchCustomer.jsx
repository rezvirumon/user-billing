import React, { useState } from 'react';
import axios from 'axios';

const SearchCustomer = ({ setCustomers, setError }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (event) => {
        setSearchQuery(event.target.value);
        if (event.target.value.length > 2) {
            try {
                const response = await axios.get(`http://localhost:5000/search?query=${event.target.value}`);
                setCustomers(response.data);
            } catch (err) {
                setError('Error fetching search results');
            }
        } else {
            fetchAllCustomers();
        }
    };

    const fetchAllCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/customers');
            setCustomers(response.data);
        } catch (err) {
            setError('Error fetching customers');
        }
    };

    return (
        <div className="my-4">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by name, mobile, area or email"
                className="input input-bordered input-primary w-full max-w-xs"
            />
        </div>
    );
};

export default SearchCustomer;
