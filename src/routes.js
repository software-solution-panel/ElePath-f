import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Home from './screens/Home';
import ReportSighting from './components/ReportSighting';
import LiveMap from './components/LiveMap';
import MovementTracking from './components/MovementTracking';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/report-sighting" element={<ReportSighting />} />
                <Route path="/live-map" element={<LiveMap />} />
                <Route path="/movement-tracking" element={<MovementTracking />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
