/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminManagement = () => {
  const [email, setEmail] = useState("");
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/allAdmin");
      setAdmins(response.data);
    } catch (err) {
      console.error("Failed to fetch admins", err);
      toast.error("Failed to fetch admins");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/admin/addAdmin", {
        email,
      });
      toast.success(res.data.message || "Admin added");
      setEmail("");
      fetchAdmins();
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleDelete = async (adminEmail) => {
    try {
      await axios.delete(
        `http://localhost:3000/admin/deleteAdmin/${adminEmail}`
      );
      toast.success("Admin deleted successfully");
      fetchAdmins();
    } catch (err) {
      toast.error("Failed to delete admin");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Admin Panel</h2>

      <form onSubmit={handleAddAdmin} className="flex gap-2 mb-4">
        <input
          type="email"
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Admin
        </button>
      </form>

      <div>
        <h3 className="text-lg font-medium mb-2">Admin List:</h3>
        {admins.length === 0 ? (
          <p className="text-gray-500">No admins found.</p>
        ) : (
          <ul className="space-y-2">
            {admins.map((admin) => (
              <li
                key={admin._id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{admin.email}</span>
                {/* <button
                  className="bg-red-500 text-white px-3 py-1 text-sm rounded"
                  onClick={() => handleDelete(admin.email)}
                >
                  Delete
                </button> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminManagement;
