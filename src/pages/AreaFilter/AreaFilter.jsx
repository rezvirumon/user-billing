// AreaFilter.js

import React, { useState, useEffect } from 'react';

const AreaFilter = ({ onSelect }) => {
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        // Fetch areas from the backend
        fetch('https://user-managed-server.vercel.app/areas')
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
        <div className='lg:flex lg:h-24 lg:relative lg:top-4 items-center'>
            
            <div className='grid grid-cols-3 lg:flex lg:gap-5'>
                {areas.map(area => (
                    <button className='btn mb-3 w-[100px;]' key={area} onClick={() => onSelect(area)}>{area}</button>
                ))}
            </div>
        </div>
    );
};

export default AreaFilter;
