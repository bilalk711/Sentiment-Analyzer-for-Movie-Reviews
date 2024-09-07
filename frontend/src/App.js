import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import ReviewSubmission from './pages/ReviewSubmission';
import ReviewDisplay from './pages/ReviewDisplay';
import Statistics from './pages/Statistics';

const App = () => {
  const location = useLocation();
  const showHeader = !['/', '/register', '/login'].includes(location.pathname);

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
