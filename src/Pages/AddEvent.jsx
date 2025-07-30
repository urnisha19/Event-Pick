/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEvent = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    location: "",
    category: "",
    description: "",
    seats: "",
    fee: "",
    deadline: "",
    organizer: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    for (let key in formData) {
      payload.append(key, formData[key]);
    }
    payload.append("eventImage", image);

    try {
      const res = await axios.post(
        "https://eventpick-server.onrender.com/api/events/add",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Event Added Successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Add Event Error:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://eventpick-server.onrender.com/api/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://eventpick-server.onrender.com/api/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mt-10 mb-10 p-6 bg-gray-200 rounded shadow space-y-4"
        >
          <h2 className="text-lg font-bold text-center">Add Event</h2>

          <div>
            <label className="block mb-1 font-normal">Event Name</label>
            <input
              name="eventName"
              onChange={handleChange}
              placeholder="Event Name"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-normal">Event Date</label>
            <input
              name="date"
              type="date"
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-normal">Location</label>
            <input
              name="location"
              onChange={handleChange}
              placeholder="Location"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-normal">Category</label>
            <input
              name="category"
              onChange={handleChange}
              placeholder="Category"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-normal">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="Description"
              className="textarea textarea-bordered w-full whitespace-pre-line"
            />
          </div>

          <div>
            <label className="block mb-1 font-normal">Number of Seats</label>
            <input
              name="seats"
              type="number"
              onChange={handleChange}
              placeholder="Number of Seats"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-normal">Registration Fee</label>
            <input
              name="fee"
              type="number"
              onChange={handleChange}
              placeholder="Fee in USD"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-normal">
              Registration Deadline
            </label>
            <input
              name="deadline"
              type="date"
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-normal">Organizer Name</label>
            <input
              name="organizer"
              onChange={handleChange}
              placeholder="Organizer Name"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-normal">Upload Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Add Event
          </button>
        </form>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold text-center mt-8 mb-8">All Events</h2>
        <div className="grid md:grid-cols-3 gap-4 p-3 text-center">
          {events.map((event) => (
            <div key={event._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{event.eventName}</h3>
              <div className="mt-2 text-center">
                <a
                  href={`/addEvent/${event._id}/edit`}
                  className="text-blue-600 underline mx-10"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
