import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";

const Login = () => {
  // State for form fields and loading status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth(); // Firebase Auth instance
  const provider = new GoogleAuthProvider(); // Google Auth provider

  // Store Firebase token and sync user info with backend (MongoDB)
  const storeTokenAndSync = async () => {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken(); // Get Firebase ID token
      localStorage.setItem("access-token", token); // Store token locally

      try {
        // Prepare user data to send to backend
        const userData = {
          name: auth.currentUser.displayName || "No Name",
          email: auth.currentUser.email,
          photo: auth.currentUser.photoURL || "",
        };

        // Send POST request to backend with Bearer token
        await axios.post("https://eventpick-server.onrender.com/api/user", userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.warn("User sync error:", err.response?.data || err.message);
      }
    }
  };

  // Handle login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password); // Firebase auth login
      await storeTokenAndSync(); // Sync user info to backend
      toast.success("Login successful!");
      setPassword(""); // Clear password field
      navigate("/"); // Redirect to home
    } catch (err) {
      toast.error(err.message); // Show error to user
      console.error("Login error:", err); // Log for debugging
    }
    setLoading(false);
  };

  // Handle login using Google OAuth
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider); // Firebase Google login
      await storeTokenAndSync(); // Sync to backend
      toast.success("Logged in with Google!");
      navigate("/"); // Redirect
    } catch (err) {
      toast.error("Google sign-in failed.");
      console.error("Google Sign-In Error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md p-8 rounded-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h2>

        {/* Email/Password Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            autoComplete="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded text-white ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            <FaGoogle /> Continue with Google
          </button>
        </div>

        {/* Link to register page */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
