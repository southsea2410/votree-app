import React from 'react';
import {
    Login,
    HomePage,
    Marketplace,
    Product,
    ResetPassword,
    UserProfile,
    OrderProducts,
    ChangePassword
} from './pages';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="marketplace">
                        <Route index element={<Marketplace />} />
                        <Route path="product">
                            <Route path=":productId" element={<Product />} />
                        </Route>
                    </Route>
                    <Route path="resetpassword" element={<ResetPassword />} />
                    <Route path="profile">
                        <Route index element={<UserProfile />} />
                        <Route path=":id" element={<UserProfile />} />
                    </Route>
                    <Route path="orderproducts" element={<OrderProducts />} />
                    <Route path="changepassword" element={<ChangePassword />} />
                    <Route path='*' element={<Navigate replace to='/'/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
