import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Geocode: React.FC = () => {
    const [address, setAddress] = useState<string>('');
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleGeocode = async () => {
        setError(null);
        setResults([]);
        setLocation(null); 

        try {
            const response = await fetch(`http://localhost:4000/api/geocode?address=${encodeURIComponent(address)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResults(data);

            if (data.length > 0) {
                const { lat, lng } = data[0].geometry.location;
                setLocation({ lat, lng }); 
            }
        } catch (error) {
            setError('Failed to fetch geocode data');
            console.error('Fetch error:', error);
        }
    };

    return (
        <div>
            <h1>Geocode Address</h1>
            <input
                type="text"
                value={address}
                onChange={handleInputChange}
                placeholder="Enter an address"
            />
            <button onClick={handleGeocode}>Geocode</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results.length > 0 && (
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>
                            {result.formatted_address} (Lat: {result.geometry.location.lat}, Lng: {result.geometry.location.lng})
                        </li>
                    ))}
                </ul>
            )}
            <LoadScript googleMapsApiKey="AIzaSyATvMkqQs927wPlKOM_fR7k2lkrkPHMZ9I">
                <GoogleMap
                    mapContainerStyle={{ height: '400px', width: '100%' }}
                    center={location || { lat: 0, lng: 0 }} 
                    zoom={location ? 15 : 2} 
                >
                    {location && <Marker position={location} />}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Geocode;
