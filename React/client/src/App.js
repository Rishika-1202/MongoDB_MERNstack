import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import ProtectedRouter from './components/ProtectedRouter';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
function App() {
    const { loading } = useSelector(state => state.alerts); // Access loading state

    return (
        <BrowserRouter>
            {loading && (
                <div className="spinner-parent">
                    <div className="spinner-border" role="status"></div>
                </div>
            )}
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/" element={<ProtectedRouter><Home /></ProtectedRouter>} />
                <Route path="/apply-doctor" element={<ProtectedRouter><ApplyDoctor /></ProtectedRouter>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
