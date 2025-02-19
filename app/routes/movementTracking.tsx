'use client';

import { ArrowLeft } from 'lucide-react';
import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    const [clusters, setClusters] = useState<ElephantMovement[][]>([]);

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
                    setClusters(groupElephantsByDistance(formattedData));
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
                        <span className="text-lg sm:text-xl font-semibold text-gray-800">Movement Tracking</span>
                        <div className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                </div>
                
                {/* Map Container */}
                <div className="relative mb-8 rounded-xl overflow-hidden border border-gray-200 shadow-md h-[750px]">
                    <MapContainer
                        center={defaultPosition}
                        zoom={8}
                        style={{ width: '100%', height: '750px' }}
                        scrollWheelZoom={true}
                        touchZoom={true}
                        dragging={true}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {clusters.map((group, index) => (
                            <Polyline
                                key={index}
                                positions={group.map(elephant => [elephant.currentLocation.latitude, elephant.currentLocation.longitude])}
                                color="blue"
                                weight={3}
                            />
                        ))}

                        {movements.map((elephant, index) => (
                            <Marker
                                key={index}
                                position={[elephant.currentLocation.latitude, elephant.currentLocation.longitude]}
                                icon={elephantIcon}
                            >
                                <Popup>
                                    <div className="text-center">
                                        <b>{elephant.name}</b> <br />
                                        <b>Current Location:</b> ({elephant.currentLocation.latitude}, {elephant.currentLocation.longitude}) <br />
                                        <b>Last Seen:</b> {elephant.lastSeen} <br />
                                        <img src={elephant.imagePath} alt={elephant.name} className="mt-2 w-40 h-40 object-cover rounded-md shadow-lg" />
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};


const isWithinOneKm = (loc1: Location, loc2: Location): boolean => {
    const R = 6371;
    const dLat = (loc2.latitude - loc1.latitude) * (Math.PI / 180);
    const dLon = (loc2.longitude - loc1.longitude) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(loc1.latitude * (Math.PI / 180)) * Math.cos(loc2.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance <= 1;
};

const groupElephantsByDistance = (elephants: ElephantMovement[]): ElephantMovement[][] => {
    const clusters: ElephantMovement[][] = [];
    const visited = new Set<number>();

    for (let i = 0; i < elephants.length; i++) {
        if (visited.has(i)) continue;

        const cluster: ElephantMovement[] = [elephants[i]];
        visited.add(i);

        for (let j = 0; j < elephants.length; j++) {
            if (i !== j && !visited.has(j) && isWithinOneKm(elephants[i].currentLocation, elephants[j].currentLocation)) {
                cluster.push(elephants[j]);
                visited.add(j);
            }
        }
        clusters.push(cluster);
    }
    return clusters;
};

const ElephantMap: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading map...</div>}>
            <Map />
        </Suspense>
    );
};

export default ElephantMap;
