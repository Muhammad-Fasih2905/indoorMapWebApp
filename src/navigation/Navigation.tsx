import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import SignUp from '../pages/auth/SignUp';
import ForgetPassword from '../pages/auth/ForgetPassword';
import RequestPasswordReset from '../pages/auth/RequestPasswordReset';
import Dashboard from '../pages/dashboard/Dashboard';
import Portal from '../../src/pages/portal/Portal';
import Casino from '../pages/casino/casino';
import MapViewer from '../pages/mapviewer/MapViewer';

const getToken = (): string | null => {
    return localStorage.getItem('authToken');
}

const ProtectedRoutes: React.FC = () => {
    const token = getToken();
    return token ? <Outlet /> : <Navigate to="/" replace />;
}

const PublicRoutes: React.FC = () => {
    const token = getToken();
    return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

const Navigation: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* PUBLIC ROUTES */}
                <Route element={<PublicRoutes />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/sign_up" element={<SignUp />} />
                    <Route path="/forget_password" element={<ForgetPassword />} />
                    <Route path="/request_password_reset" element={<RequestPasswordReset />} />
                </Route>

                {/* PROTECTED ROUTES */}
                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/patrols" element={<Portal />} />
                    <Route path="/casino" element={<Casino />} />
                    <Route path="/mapviewer" element={<MapViewer />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default Navigation;
