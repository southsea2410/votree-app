import React from 'react';
import {
    Login,
    HomePage,
    Marketplace,
    ResetPassword,
    UserProfile
} from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
