import React, { useEffect } from 'react';
import Login from './pages/Login';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import Marketplace from './pages/marketplace';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="marketplace" element={<Marketplace />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

// export default function App() {
//   return (
//     <>
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//       <button className="square">X</button>;
//     </>
//   );
// }

// document
//   .getElementById('root')
//   .insertAdjacentHTML('afterend', '<p>helloworld</p>');
