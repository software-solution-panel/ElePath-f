import logo from './logo.svg';
import './App.css';
import ElephantMap from "./components/ElephantMap";
import AppRoutes from "./routes";

function App() {

    const elephantLocations = [
        { name: 'Elephant 1', lat: 6.9271, lng: 79.8612, time: '2025-01-25 10:00 AM' },
        { name: 'Elephant 2', lat: 7.8731, lng: 80.7718, time: '2025-01-25 2:00 PM' },
    ];
    const elephantMovements = [
        {
            name: 'Elephant 1',
            path: [
                { lat: 6.9271, lng: 79.8612 },
                { lat: 6.9325, lng: 79.8570 },
                { lat: 6.9375, lng: 79.8540 },
            ],
            lastSeen: '2025-01-25 10:00 AM',
        },
        {
            name: 'Elephant 2',
            path: [
                { lat: 7.8731, lng: 80.7718 },
                { lat: 7.8735, lng: 80.7750 },
                { lat: 7.8740, lng: 80.7800 },
            ],
            lastSeen: '2025-01-25 2:00 PM',
        },
    ];

    const elephantMovements1 = [
        {
            name: 'Elephant 1',
            path: [
                { lat: 6.9271, lng: 79.8612 },
                { lat: 6.9325, lng: 79.8570 },
                { lat: 6.9375, lng: 79.8540 },
                { lat: 6.9500, lng: 79.8500 },
            ],
            currentLocation: { lat: 6.9600, lng: 79.8460 },
            lastSeen: '2025-01-25 10:00 AM',
        },
        // {
        //     name: 'Elephant 2',
        //     path: [
        //         { lat: 7.8731, lng: 80.7718 },
        //         { lat: 7.8735, lng: 80.7750 },
        //         { lat: 7.8740, lng: 80.7800 },
        //         { lat: 7.8800, lng: 80.8000 },
        //     ],
        //     currentLocation: { lat: 7.8900, lng: 80.8100 },
        //     lastSeen: '2025-01-25 2:00 PM',
        // },
        // {
        //     name: 'Elephant 3',
        //     path: [
        //         { lat: 8.0000, lng: 81.0000 },
        //         { lat: 8.0100, lng: 81.0050 },
        //         { lat: 8.0150, lng: 81.0100 },
        //         { lat: 8.0500, lng: 81.0500 },
        //         { lat: 8.0600, lng: 81.0600 },
        //     ],
        //     currentLocation: { lat: 8.0700, lng: 81.0700 },
        //     lastSeen: '2025-01-25 4:00 PM',
        // },
        // {
        //     name: 'Elephant 4',
        //     path: [
        //         { lat: 6.8500, lng: 79.9000 },
        //         { lat: 6.8520, lng: 79.9020 },
        //         { lat: 6.8540, lng: 79.9040 },
        //         { lat: 6.8600, lng: 79.9100 },
        //         { lat: 6.8700, lng: 79.9200 },
        //     ],
        //     currentLocation: { lat: 6.8800, lng: 79.9300 },
        //     lastSeen: '2025-01-25 6:00 PM',
        // },
    ];


    return (
    <div className="App">
      {/*<Main/>*/}
      {/*  <ElephantMap movements={elephantMovements1} />;*/}
         <AppRoutes />;

    </div>
  );
}

export default App;
