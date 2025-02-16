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
    imagePath: string;
    path: Location[];
}

const Map: React.FC = () => {
    const [MapComponents, setMapComponents] = useState<any>(null);
    const [L, setL] = useState<any>(null);
    const defaultPosition: [number, number] = [6.9271, 79.8612];
    const [movements, setMovements] = useState<ElephantMovement[]>([]);

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
                    const formattedData: ElephantMovement[] = data.response.map((elephant: any) => ({
                        name: `Elephant ${elephant.eid}`,
                        currentLocation: { latitude: elephant.latitude, longitude: elephant.longitude },
                        lastSeen: elephant.lastUpdateTime,
                        imagePath: `http://localhost:8000/${elephant.imagePath.split('/').pop()}`,
                        path: []
                    }));
                    console.log(formattedData)
                    setMovements(formattedData);
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

                        {movements.map((elephant, index) => (
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
                                        <div className="text-center">
                                            <b>{elephant.name}</b> <br />
                                            <b>Current Location:</b> ({elephant.currentLocation.latitude}, {elephant.currentLocation.longitude}) <br />
                                            <b>Last Seen:</b> {elephant.lastSeen} <br />
                                            <img src={elephant.imagePath} alt={elephant.name} className="mt-2 w-40 h-40 object-cover rounded-md shadow-lg" />
                                        </div>
                                    </Popup>
                                </Marker>
                            </React.Fragment>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

const ElephantMap: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading map...</div>}>
            <Map />
        </Suspense>
    );
};

export default ElephantMap;
