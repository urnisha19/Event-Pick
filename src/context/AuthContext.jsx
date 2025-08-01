import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  getIdToken,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase.config";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Save or update user info in your backend MongoDB
  const saveUserToDB = async (user) => {
    const token = await getIdToken(user);
    const userData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL || null,
    };

    await axios.post(
      "https://eventpick-server.onrender.com/api/user",
      userData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  // Check if user is admin 
  const checkAdmin = async (email, currentUser) => {
    try {
      //const token = await getIdToken(currentUser, true);
      const res = await axios.get(
        `https://eventpick-server.onrender.com/admin/isAdmin?email=${email}`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      setRole(res.data.admin ? "admin" : "user");
    } catch (error) {
      console.error("Failed to check role:", error.response?.data || error.message);
      setRole("user"); // fallback role
    }
  };

  const registerWithEmail = async (email, password, name, photoURL = null) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name, photoURL });
    await saveUserToDB(res.user);
  };

  const loginWithEmail = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    await saveUserToDB(res.user);
  };

  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider);
    await saveUserToDB(res.user);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        await checkAdmin(currentUser.email, currentUser);
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        registerWithEmail,
        loginWithEmail,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
