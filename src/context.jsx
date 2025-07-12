/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { getCurrentUser } from "./db/apiAuth";
import useFetch from "./hooks/use-fetch";

// Create a context
const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  // Fetch user with useFetch (no default options needed anymore)
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();  // ✅ works fine since getCurrentUser takes no args
  }, []);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

// Custom hook to consume context
export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
