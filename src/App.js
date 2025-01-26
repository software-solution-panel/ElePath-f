import logo from './logo.svg';
import './App.css';
import {Main} from "./component/Main";
import ElephantMap from "./component/ElephantMap";

function App() {
  return (
    <div className="App">
      {/*<Main/>*/}
        <ElephantMap locations={[{ name: 'Elephant 1', lat: 6.9271, lng: 79.8612, time: '2025-01-25 10:00 AM' },
            { name: 'Elephant 2', lat: 7.8731, lng: 80.7718, time: '2025-01-25 2:00 PM' }]} />;

    </div>
  );
}

export default App;
