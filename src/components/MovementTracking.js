import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import elephantService from '../services/elephantService'; // Fetching data from service

const elephantIcon = L.divIcon({
    html: '<div style="font-size: 30px; color: brown;">🐘</div>',
    iconSize: [30, 30],
    className: 'custom-elephant-icon',
});

const MovementTracking = () => {
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await elephantService.getElephantMovements();
            setMovements(data);
        };
        fetchData();
    }, []);

    const defaultPosition = [6.9271, 79.8612];

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <MapContainer
                center={defaultPosition}
                zoom={8}
                style={{ width: '100%', height: '100%' }}
                scrollWheelZoom={true}
                touchZoom={true}
                dragging={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {movements.map((elephant, index) => (
                    <React.Fragment key={index}>
                        <Polyline
                            positions={elephant.path.map(point => [point.lat, point.lng])}
                            color="blue"
                            weight={3}
                        />

                        <Marker
                            position={[elephant.currentLocation.lat, elephant.currentLocation.lng]}
                            icon={elephantIcon}
                        >
                            <Popup>
                                <b>{elephant.name}</b> <br />
                                <b>Last Seen:</b> {elephant.lastSeen} <br />
                                <b>Location:</b> ({elephant.currentLocation.lat}, {elephant.currentLocation.lng})
                            </Popup>
                        </Marker>
                    </React.Fragment>
                ))}
            </MapContainer>
        </div>
    );
};

export default MovementTracking;
