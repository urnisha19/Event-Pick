/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://eventpick-server.onrender.com/api/reviews/latest");
        setReviews(res.data);
      } catch (err) {
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1 text-yellow-500">
        {[...Array(5)].map((_, i) =>
          i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
        )}
      </div>
    );
  };

  if (loading) return <p className="text-gray-500">Loading recent reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (reviews.length === 0) return <p className="text-gray-500">No reviews yet.</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-center text-black-600">Recent Reviews</h2>
      <ul className="space-y-6">
        {reviews.map(({ _id, userName, rating, comment, eventName, createdAt }) => (
          <li key={_id} className="bg-white shadow rounded-lg p-5 border border-gray-100 bg-gradient-to-tr from-gray-200 to-gray-100 hover:from-gray-100 hover:to-gray-200">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold text-gray-800">{userName}</h3>
              <span className="text-sm text-gray-500">{new Date(createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-600 italic mb-2">Reviewed: {eventName}</p>
            {renderStars(rating)}
            <p className="mt-2 text-gray-700">{comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentReviews;
