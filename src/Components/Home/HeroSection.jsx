import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EventCard from "../EventCard";

const HeroSection = () => {
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [categorySuggestions, setCategorySuggestions] = useState([]);

  const nameInputRef = useRef(null);
  const categoryInputRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://eventpick-server.onrender.com/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!searchName.trim() && !searchCategory.trim()) {
      setFilteredEvents([]);
      return;
    }

    const lowerName = searchName.toLowerCase();
    const lowerCategory = searchCategory.toLowerCase();

    const filtered = events.filter((event) => {
      const nameMatch = event.eventName?.toLowerCase().includes(lowerName);
      const categoryMatch = event.category?.toLowerCase().includes(lowerCategory);
      return (
        (searchName.trim() ? nameMatch : true) &&
        (searchCategory.trim() ? categoryMatch : true)
      );
    });

    setFilteredEvents(filtered);
  }, [searchName, searchCategory, events]);

  useEffect(() => {
    if (!searchName.trim()) {
      setNameSuggestions([]);
      return;
    }

    const lowerName = searchName.toLowerCase();
    const uniqueNames = Array.from(
      new Set(
        events
          .map((event) => event.eventName)
          .filter((name) => name?.toLowerCase().includes(lowerName))
      )
    );

    setNameSuggestions(uniqueNames.slice(0, 5));
  }, [searchName, events]);

  useEffect(() => {
    if (!searchCategory.trim()) {
      setCategorySuggestions([]);
      return;
    }

    const lowerCategory = searchCategory.toLowerCase();
    const uniqueCategories = Array.from(
      new Set(
        events
          .map((event) => event.category)
          .filter((cat) => cat?.toLowerCase().includes(lowerCategory))
      )
    );

    setCategorySuggestions(uniqueCategories.slice(0, 5));
  }, [searchCategory, events]);

  const handleSelectName = (name) => {
    setSearchName(name);
    setNameSuggestions([]);

    const matched = events.find((e) => e.eventName === name);
    setFilteredEvents(matched ? [matched] : []);
  };

  const handleSelectCategory = (category) => {
    setSearchCategory(category);
    setCategorySuggestions([]);

    const lowerCategory = category.toLowerCase();
    const matched = events.filter((event) =>
      event.category?.toLowerCase().includes(lowerCategory)
    );
    setFilteredEvents(matched);
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="h-[500px] bg-cover bg-center relative"
        style={{ backgroundImage: `url('/assets/hero.jpg')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4 w-full max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-md">
              Find Events That Inspire You
            </h1>
            <p className="mb-6 max-w-2xl mx-auto">
              Whatever your interest — from hiking and reading to networking and skill-sharing — thousands of people are sharing it on EventPick.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {/* Search by name */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by event name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border focus:ring-2 focus:ring-blue-500"
                  ref={nameInputRef}
                  autoComplete="off"
                />
                {nameSuggestions.length > 0 && (
                  <ul className="absolute z-20 bg-white text-black w-full max-h-52 overflow-auto rounded-md shadow-lg mt-1">
                    {nameSuggestions.map((name, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        onClick={() => handleSelectName(name)}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Search by category */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by category..."
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border focus:ring-2 focus:ring-blue-500"
                  ref={categoryInputRef}
                  autoComplete="off"
                />
                {categorySuggestions.length > 0 && (
                  <ul className="absolute z-20 bg-white text-black w-full max-h-52 overflow-auto rounded-md shadow-lg mt-1">
                    {categorySuggestions.map((category, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        onClick={() => handleSelectCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results (outside hero section) */}
      {(searchName || searchCategory) && (
        <section className="relative z-10 max-w-7xl mx-auto px-4 py-12 bg-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Search Results</h2>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No matching events found.</p>
          )}
        </section>
      )}
    </>
  );
};

export default HeroSection;
