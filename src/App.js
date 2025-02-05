import './App.css';
import "./css/style.css";
import "./css/theme/Theme.scss";
import "bootstrap/dist/css/bootstrap.css";
import ElephantMap from "./component/ElephantMap";
import { useMode } from "./theme";

function App() {
  const elephantLocations = [
    { name: 'Elephant 1', lat: 6.9271, lng: 79.8612, time: '2025-01-25 10:00 AM' },
    { name: 'Elephant 2', lat: 7.8731, lng: 80.7718, time: '2025-01-25 2:00 PM' },
  ];

  return (
    <div className="App">
      <ElephantMap locations={elephantLocations} />
    </div>
  );
}

export default App;
