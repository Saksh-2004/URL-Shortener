/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "./db/apiAuth";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error("Failed to fetch user:", err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
