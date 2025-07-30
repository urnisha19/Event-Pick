/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthProvider, AuthContext } from '../context/AuthContext'; 
import axios from "axios";
import { FaCalendarAlt, FaTicketAlt, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/bookings/${user?.email}`
      );
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/bookings/${id}`);
      setBookings(bookings.filter((booking) => booking._id !== id));
      toast.success("Booking cancelled!");
    } catch (err) {
      console.error("Error cancelling booking", err);
      toast.error("Cancellation failed");
    }
  };

  const handleReviewSubmit = async (id, review) => {
    try {
      await axios.post(`http://localhost:3000/api/bookings/review/${id}`, review);
      toast.success("Review submitted!");
    } catch (err) {
      console.error("Review submission failed", err);
      toast.error("Review failed to submit");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 mt-5 mb-5 bg-gray-200">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
        My Bookings
      </h2>

      {loading ? (
        <div className="text-center text-gray-600">Loading your bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center text-gray-500">You have no bookings yet.</div>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="border border-gray-200 rounded-lg p-6 mb-6 shadow-sm hover:shadow-md transition duration-300 bg-white"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" />
                {booking.eventName}
              </h3>
              <button
                onClick={() => handleCancel(booking._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </div>
            <div className="text-gray-700 mb-2 flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <span>{booking.date}</span>
            </div>
            <div className="text-gray-700 mb-4 flex items-center gap-2">
              <FaTicketAlt className="text-gray-500" />
              <span>{booking.tickets} ticket(s)</span>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">
                Share Your Experience:
              </h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target;
                  const rating = form.rating.value;
                  const comment = form.comment.value;
                  handleReviewSubmit(booking._id, { rating, comment });
                  form.reset();
                }}
                className="flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <input
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    required
                    className="border rounded px-2 py-1 w-20"
                    placeholder="Rating"
                  />
                </div>
                <input
                  type="text"
                  name="comment"
                  required
                  className="flex-1 border rounded px-2 py-1"
                  placeholder="Write a comment"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;
