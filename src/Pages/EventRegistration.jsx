import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthProvider, AuthContext } from '../context/AuthContext'; 

const EventRegistration = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [phone, setPhone] = useState("");
  const [tickets, setTickets] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get(`https://eventpick-server.onrender.com/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      eventId: id,
      eventName: event.eventName,
      date: event.date,
      userName: user.displayName,
      email: user.email,
      phone,
      tickets,
      paymentMethod,
    };
    try {
      await axios.post("https://eventpick-server.onrender.com/api/bookings", bookingData);
      console.log(bookingData);
      navigate("/myBookings");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };
  if (!event) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">
        Register for {event.eventName}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow p-6 rounded-lg"
      >
        <div>
          <label>Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Number of Tickets</label>
          <input
            type="number"
            min="1"
            required
            value={tickets}
            onChange={(e) => setTickets(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Payment Method (optional)</label>
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          Confirm Registration
        </button>
      </form>
    </div>
  );
};

export default EventRegistration;
