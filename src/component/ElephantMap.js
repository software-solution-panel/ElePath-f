import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const ElephantMap = ({ locations }) => {
    const defaultPosition = [6.9271, 79.8612]; // Default to Colombo coordinates

    return (
        <MapContainer center={defaultPosition} zoom={8} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => (
                <Marker key={index} position={[location.lat, location.lng]}>
                    <Popup>
                        <b>Elephant:</b> {location.name} <br />
                        <b>Last Seen:</b> {location.time}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default ElephantMap;
