import React from 'react';
import { useFetchStatisticsQuery } from '../redux/apiSlice';

const Statistics = () => {
  const { data: stats = {}, error, isLoading } = useFetchStatisticsQuery();

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error loading statistics.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Statistics</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Sentiment Counts</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.sentiment_counts.map((s) => (
                <tr key={s.sentiment}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.sentiment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Most Reviewed Movies</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Movie Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Reviews</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.most_reviewed_movies?.map((movie) => (
                <tr key={movie.movie_title}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{movie.movie_title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
