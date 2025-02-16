'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

interface Location {
    latitude: number;
    longitude: number;
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
            import('leaflet/dist/leaflet.css'),
        ]).then(([L, reactLeaflet]) => {
            setL(L);
            setMapComponents(reactLeaflet);
        });
        const fetchElephantData = async () => {
            try {
                const response = await fetch('http://localhost:8080/elephant/getAllElephant');
                const data = await response.json();
                if (response.ok) {
                    //setMovements(data.data);
                } else {
                    console.error('Failed to fetch elephant data');
                }
            } catch (error) {
                console.error('Error fetching elephant data:', error);
            }
        };
        fetchElephantData();
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
                <div className="sticky top-0 z-50 bg-gray-50 py-4">
                    <div className="flex items-center justify-between max-w-lg mx-auto">
                        <Link to="/homepage" className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 cursor-pointer">
                            <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 cursor-pointer" />
                        </Link>
                        <span className="text-lg sm:text-xl font-semibold text-gray-800">Live Map</span>
                        <div className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
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

                        {movements.length > 0 &&
                            movements.map((elephant, index) => (
                                <React.Fragment key={index}>
                                    {elephant.path.length > 0 && (
                                        <Polyline
                                            positions={elephant.path.map((point) => [point.latitude, point.longitude])}
                                            color="blue"
                                            weight={3}
                                        />
                                    )}

                                    <Marker position={[elephant.currentLocation.latitude, elephant.currentLocation.longitude]} icon={elephantIcon}>
                                        <Popup>
                                            <b>{elephant.name}</b> <br />
                                            <b>Current Location:</b> ({elephant.currentLocation.latitude}, {elephant.currentLocation.longitude}) <br />
                                            <b>Last Seen:</b> {elephant.lastSeen}
                                        </Popup>
                                    </Marker>

                                    {elephant.path.map((point, idx) => (
                                        <Marker key={`${index}-${idx}`} position={[point.latitude, point.longitude]} icon={elephantIcon}>
                                            <Popup>
                                                <b>{elephant.name}</b> <br />
                                                <b>Visited Location:</b> ({point.latitude}, {point.longitude})
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

const ElephantMap: React.FC<ElephantMapProps> = (props) => {
    return (
        <Suspense fallback={<div>Loading map...</div>}>
            <Map {...props} />
        </Suspense>
    );
};

export default ElephantMap;
