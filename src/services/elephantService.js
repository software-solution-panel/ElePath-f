const elephantService = {
    getElephantMovements: async () => {
        return [
            {
                name: "Elephant 1",
                currentLocation: { lat: 6.9271, lng: 79.8612 },
                path: [
                    { lat: 6.9275, lng: 79.8620 },
                    { lat: 6.9278, lng: 79.8635 },
                ],
                lastSeen: "2025-02-04 12:00 PM"
            }
        ];
    }
};

export default elephantService;
