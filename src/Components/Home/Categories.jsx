import { useEffect, useState } from "react";
import axios from "axios";
import { FaShapes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/events");
        const events = res.data;
        const uniqueCategories = [
          ...new Set(events.map((event) => event.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  return (
    <section className="py-14 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-black-600">
        Explore Top Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category, idx) => (
          <div
            key={idx}
            onClick={() => handleCategoryClick(category)}
            className="cursor-pointer group bg-gradient-to-tr from-gray-200 to-gray-100 hover:from-gray-100 hover:to-gray-200 p-6 rounded-xl shadow-md transform hover:scale-105 transition duration-300 ease-in-out flex flex-col items-center"
          >
            <FaShapes className="text-black-600 text-3xl mb-3 group-hover:text-indigo-800 transition" />
            <p className="text-base font-semibold capitalize text-gray-700 group-hover:text-indigo-900">
              {category}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
