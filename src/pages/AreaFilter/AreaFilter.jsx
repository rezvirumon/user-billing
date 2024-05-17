// AreaFilter.js

import React, { useState, useEffect } from 'react';

const AreaFilter = ({ onSelect }) => {
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        // Fetch areas from the backend
        fetch('http://localhost:5000/areas')
            .then(response => response.json())
            .then(data => {
                // Check if data is provided and is in the expected format
                if (!data || !Array.isArray(data)) {
                    console.error('Invalid or empty data received for areas:', data);
                    return;
                }
                setAreas(data);
            })
            .catch(error => console.error('Error fetching areas:', error));
    }, []);

    return (
        <div>
            <label>Select Area:</label>
            <div className='grid'>
                {areas.map(area => (
                    <button className='btn mb-3 w-[150px;]' key={area} onClick={() => onSelect(area)}>{area}</button>
                ))}
            </div>
        </div>
    );
};

export default AreaFilter;
