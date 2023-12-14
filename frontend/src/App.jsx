import React from 'react';
import { Login, HomePage, Marketplace, ResetPassword } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Marketplace from './pages/Marketplace';
import UserProfile from './pages/Profile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="marketplace" element={<Marketplace />} />
                    <Route path="resetpassword" element={<ResetPassword />} />
                    <Route path="profile" element={<UserProfile />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
