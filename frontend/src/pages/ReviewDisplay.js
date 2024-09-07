import React, { useState } from 'react';
import { useFetchReviewsQuery } from '../redux/apiSlice';

const ReviewDisplay = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useFetchReviewsQuery(page);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading reviews.</p>;

  const handlePageChange = (newPage) => {
    if (newPage > 0) setPage(newPage);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      <ul className="space-y-4">
        {data.results.map((review) => (
          <li key={review.id} className="p-4 border rounded shadow-md">
            <h3 className="text-lg font-semibold">{review.movie_title}</h3>
            <p>{review.review_content}</p>
            <p className="text-sm text-gray-500">Sentiment: {review.sentiment}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={!data.previous}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg">Page {page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!data.next}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewDisplay;
