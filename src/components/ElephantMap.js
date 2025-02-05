import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const elephantIcon = L.divIcon({
    html: '<div style="font-size: 30px; color: brown;">🐘</div>',
    iconSize: [30, 30],
    className: 'custom-elephant-icon',
});

const ElephantMap = ({ movements }) => {
    const defaultPosition = [6.9271, 79.8612];

    return (
        <div style={{ width: '100%', height: '100vh', maxHeight: '100%' }}>
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
                                <b>Current Location:</b> ({elephant.currentLocation.lat}, {elephant.currentLocation.lng}) <br />
                                <b>Last Seen:</b> {elephant.lastSeen}
                            </Popup>
                        </Marker>


                        {elephant.path.map((point, idx) => (
                            <Marker key={`${index}-${idx}`} position={[point.lat, point.lng]} icon={elephantIcon}>
                                <Popup>
                                    <b>{elephant.name}</b> <br />
                                    <b>Visited Location:</b> ({point.lat}, {point.lng})
                                </Popup>
                            </Marker>
                        ))}
                    </React.Fragment>
                ))}
            </MapContainer>
        </div>
    );
};

export default ElephantMap;
