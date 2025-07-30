import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EventCard from "../EventCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://eventpick-server.onrender.com/api/events",
          {
            withCredentials: true,
          }
        );
        const filtered = res.data.filter(
          (event) => event.category === categoryName
        );
        setEvents(filtered);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, [categoryName]);

  return (
    <section className="max-w-6xl mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Events in “{categoryName}”
      </h2>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No events found in this category.</p>
      )}
    </section>
  );
};

export default CategoryPage;
