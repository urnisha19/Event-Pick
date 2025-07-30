import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const { _id, eventName, date, location, seats } = event;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={`http://localhost:3000/uploads/${event.image}`}
        alt={eventName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold">{eventName}</h2>
        <p className="text-gray-600">📅 {date}</p>
        <p className="text-gray-600">📍 {location}</p>
        <p className="text-gray-600">🪑 Seats: {seats}</p>
        <Link
          to={`/events/${_id}`}
          className="inline-block mt-2 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
