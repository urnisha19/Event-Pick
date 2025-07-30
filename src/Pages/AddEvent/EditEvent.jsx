import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/events/${id}`)
      .then((res) => {
        setEvent(res.data);
        setFormData({
          eventName: res.data.eventName,
          date: res.data.date,
          location: res.data.location,
          category: res.data.category,
          description: res.data.description,
          seats: res.data.seats,
          fee: res.data.fee,
          deadline: res.data.deadline,
          organizer: res.data.organizer,
        });
      })
      .catch((err) => console.error("Failed to fetch event:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (image) data.append("eventImage", image);

    try {
      await axios.put(`http://localhost:3000/api/events/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data", // ✅ Ensure proper header
        },
      });
      alert("Event updated successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-200 mt-10 mb-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="Event Name"
          className="input input-bordered w-full"
          required
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full whitespace-pre-line"
          rows={4}
          required
        ></textarea>
        <input
          name="seats"
          type="number"
          value={formData.seats}
          onChange={handleChange}
          placeholder="Number of Seats"
          className="input input-bordered w-full"
          required
        />
        <input
          name="fee"
          type="number"
          value={formData.fee}
          onChange={handleChange}
          placeholder="Fee in USD"
          className="input input-bordered w-full"
          required
        />
        <input
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          name="organizer"
          value={formData.organizer}
          onChange={handleChange}
          placeholder="Organizer Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="file-input file-input-bordered w-full"
        />
        <button className="btn btn-primary w-full" type="submit">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
