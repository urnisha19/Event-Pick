import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };
    fetchEvents();
  }, []);

  const featured = events.slice(0, 3);

  return (
    <section className="py-12 px-4 m-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-black">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featured.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
          >
            <div className="overflow-hidden">
              <img
                src={`http://localhost:3000/uploads/${event.image}`}
                alt={event.eventName}
                className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.eventName}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-1">
                <CalendarDays className="w-4 h-4 mr-1" />
                {event.date}
              </div>
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {event.location}
              </div>
              <div className="mt-auto">
                <Link
                  to={`/events/${event._id}`}
                  className="inline-block text-center w-full bg-black hover:bg-indigo-800 text-white text-sm font-medium px-4 py-2 rounded-md transition duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;
