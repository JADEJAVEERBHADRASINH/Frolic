import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Institutes from './pages/Institutes';
import Departments from './pages/Departments';
import Events from './pages/Events';
import Groups from './pages/Groups';
import Winners from './pages/Winners';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/institutes" element={<PrivateRoute><Institutes /></PrivateRoute>} />
                    <Route path="/departments" element={<PrivateRoute><Departments /></PrivateRoute>} />
                    <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
                    <Route path="/groups" element={<PrivateRoute><Groups /></PrivateRoute>} />
                    <Route path="/winners" element={<PrivateRoute><Winners /></PrivateRoute>} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;