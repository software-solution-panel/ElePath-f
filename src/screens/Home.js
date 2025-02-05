import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h2>Elephant Tracking</h2>
            <Button label="Report Sighting" onClick={() => navigate('/report-sighting')} />
            <Button label="Live Map" onClick={() => navigate('/live-map')} />
            <Button label="Movement Tracking" onClick={() => navigate('/movement-tracking')} />
        </div>
    );
};

export default Home;
