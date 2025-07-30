import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import axios from "axios";
import { AuthProvider, AuthContext } from '../context/AuthContext'; 


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check admin status
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        if (user?.email) {
          const res = await axios.get(
            `http://localhost:3000/admin/isAdmin?email=${user.email}`
          );
          setIsAdmin(res.data.admin);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Failed to check admin status:", error);
      }
    };
    checkAdmin();
  }, [user]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access-token");
    setMenuOpen(false);
  };

  const NavLinks = (
    <>
      <Link to="/" className="btn btn-ghost">
        Home
      </Link>
      <Link to="/events" className="btn btn-ghost">
        Events
      </Link>
      <Link to="/myBookings" className="btn btn-ghost">
        My Bookings
      </Link>
      {isAdmin && (
        <Link to="/addEvent" className="btn btn-ghost">
          Add Event
        </Link>
      )}
      {isAdmin && (
        <Link to="/adminManagement" className="btn btn-ghost">
          Add Admin
        </Link>
      )}
      {user && (
        <Link to="/profile" className="btn btn-ghost">
          <div className="flex items-center gap-2">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className="hidden sm:inline">
              {user.displayName || "Profile"}
            </span>
          </div>
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-base-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center btn btn-ghost p-0">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">{NavLinks}</div>

        {/* Right Actions */}
        <div className="hidden md:flex gap-3 items-center">
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-2 space-y-2 border-t">
          {NavLinks}
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline w-full text-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline w-full">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary w-full">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
