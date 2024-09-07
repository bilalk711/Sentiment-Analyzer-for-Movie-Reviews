import React, { useState } from 'react';
import { useSubmitReviewMutation } from '../redux/apiSlice';

const ReviewSubmission = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [submitReview] = useSubmitReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await submitReview({ movie_title: movieTitle, review_content: reviewContent }).unwrap();
      setSentiment(data.sentiment);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold">Submit a Review</h2>
        <input
          type="text"
          placeholder="Movie Title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Review Content"
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Submit Review
        </button>
        {sentiment && <p>Sentiment: {sentiment}</p>}
      </form>
    </div>
  );
};

export default ReviewSubmission;
