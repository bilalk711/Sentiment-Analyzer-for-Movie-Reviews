import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import ReviewSubmission from './pages/ReviewSubmission';
import ReviewDisplay from './pages/ReviewDisplay';
import Statistics from './pages/Statistics';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => !!state.auth.token); // Assuming token indicates authentication
  const showHeader = !['/', '/register', '/login'].includes(location.pathname);

  useEffect(() => {
    if (location.pathname === '/') {
      if (isAuthenticated) {
        navigate('/my-reviews');
      } else {
        navigate('/login');
      }
    }
  }, [location.pathname, isAuthenticated, navigate]);

  return (
    <>
      {showHeader && <Header />}
      <main className="p-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/submit-review" element={<ReviewSubmission />} />
          <Route path="/my-reviews" element={<ReviewDisplay />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
