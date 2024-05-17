import React, { useState } from 'react';
import AreaFilter from './AreaFilter';

const ParentComponent = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedArea, setSelectedArea] = useState('');

    // Function to fetch filtered data based on the selected area
    const fetchDataByArea = (selectedArea) => {
        // Show loader while fetching data
        setLoading(true);
        setSelectedArea(selectedArea); // Update selected area
        
        // Fetch data from the backend based on the selected area
        fetch(`http://localhost:5000/customers?area=${selectedArea}`)
            .then(response => response.json())
            .then(data => {
                // Update filtered data state with the fetched data
                setFilteredData(data);
                // Hide loader when data is fetched
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching filtered data:', error);
                // Hide loader if an error occurs
                setLoading(false);
            });
    };

    return (
        <div>
            <h2>Filtered Data</h2>
            {/* Render the AreaFilter component and pass the onSelect function */}
            <AreaFilter onSelect={fetchDataByArea} />
            {/* Display the loader if loading */}
            {loading && <div className="loader">Loading...</div>}
            {/* Display the filtered data in a table */}
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Area</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(item => (
                            // Render only if the area matches the selected area
                            item.area === selectedArea && (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.email}</td>
                                    <td>{item.area}</td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ParentComponent;
