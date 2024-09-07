import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/" className="hover:underline">
            Sentiment Analyzer for Movie Reviews
          </Link>
        </div>
        <div className="space-x-4">
          <Link
            to="/submit-review"
            className="hover:underline"
          >
            Submit a Review
          </Link>
          <Link
            to="/my-reviews"
            className="hover:underline"
          >
            My Reviews
          </Link>
          <Link
            to="/statistics"
            className="hover:underline"
          >
            Statistics
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
