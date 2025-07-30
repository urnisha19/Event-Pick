import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChair,
  FaUserTie,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (event?.deadline) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const end = new Date(event.deadline).getTime();
        const distance = end - now;

        if (distance < 0) {
          setCountdown("Registration closed");
          clearInterval(interval);
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          setCountdown(`${days}d ${hours}h ${minutes}m remaining`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [event?.deadline]);

  if (!event)
    return (
      <p className="text-center py-10 text-gray-500 text-lg">
        Loading event details...
      </p>
    );

  const {
    eventName,
    date,
    location,
    seats,
    description,
    organizer,
    deadline,
    fee,
    image,
  } = event;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={`http://localhost:3000/uploads/${image}`}
          alt={eventName}
          className="w-full h-72 object-cover"
        />

        <div className="p-6 space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">{eventName}</h1>

          {/* 👇 Render description as separate paragraphs */}
          <div className="mt-2 text-sm">
            {description.split(/\r?\n/).map((para, idx) => (
              <p key={idx} className="text-gray-600 leading-relaxed mb-2">
                {para.trim()}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-gray-700">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-green-600" /> Date: {date}
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" /> Location: {location}
            </div>
            <div className="flex items-center gap-2">
              <FaChair className="text-purple-600" /> Available Seats: {seats}
            </div>
            <div className="flex items-center gap-2">
              <FaUserTie className="text-pink-600" /> Organizer: {organizer}
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-yellow-600" /> Deadline:{" "}
              {new Date(deadline).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-teal-600" /> Fee: ${fee}
            </div>
          </div>

          {countdown && (
            <p
              className={`mt-4 text-sm font-medium ${
                countdown === "Registration closed"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              ⏳ {countdown}
            </p>
          )}

          <button
            className="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            onClick={() => navigate(`/events/${id}/registration`)}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
