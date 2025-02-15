'use client';

import React, { Suspense, useEffect, useState } from 'react';

interface Location {
    lat: number;
    lng: number;
}

interface ElephantMovement {
    name: string;
    currentLocation: Location;
    lastSeen: string;
    path: Location[];
}

interface ElephantMapProps {
    movements?: ElephantMovement[];
}

const Map: React.FC<ElephantMapProps> = ({ movements = [] }) => {
    const [MapComponents, setMapComponents] = useState<any>(null);
    const [L, setL] = useState<any>(null);
    const defaultPosition: [number, number] = [6.9271, 79.8612];

    useEffect(() => {
        Promise.all([
            import('leaflet'),
            import('react-leaflet'),
            import('leaflet/dist/leaflet.css')
        ]).then(([L, reactLeaflet]) => {
            setL(L);
            setMapComponents(reactLeaflet);
        });
    }, []);

    if (!MapComponents || !L) {
        return <div>Loading map...</div>;
    }

    const { MapContainer, TileLayer, Marker, Popup, Polyline } = MapComponents;

    const elephantIcon = L.default.divIcon({
        html: '<div style="font-size: 30px; color: brown;">🐘</div>',
        iconSize: [30, 30],
        className: 'custom-elephant-icon',
    });

    return (
        <div className="flex justify-center min-h-screen bg-gray-50">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 w-[1000px] h-[700px]">
                {/* Header */}
                <div className="sticky top-0 z-50 bg-gray-50 py-4 text-center font-bold text-lg">
                    Elephant Movement Map
                </div>

                {/* Map Container */}
                <div className="relative mb-8 rounded-xl overflow-hidden border border-gray-200 shadow-md h-[700px]">

                    <MapContainer
                        center={defaultPosition}
                        zoom={8}
                        style={{ width: '100%', height: '700px' }}
                        scrollWheelZoom={true}
                        touchZoom={true}
                        dragging={true}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {movements.length > 0 && movements.map((elephant, index) => (
                            <React.Fragment key={index}>
                                {elephant.path.length > 0 && (
                                    <Polyline
                                        positions={elephant.path.map((point) => [point.lat, point.lng])}
                                        color="blue"
                                        weight={3}
                                    />
                                )}

                                <Marker position={[elephant.currentLocation.lat, elephant.currentLocation.lng]} icon={elephantIcon}>
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
            </div>
        </div>
    );
};

// Export the main component with Suspense
const ElephantMap: React.FC<ElephantMapProps> = (props) => {
    return (
        <Suspense fallback={<div>Loading map...</div>}>
            <Map {...props} />
        </Suspense>
    );
};

export default ElephantMap;