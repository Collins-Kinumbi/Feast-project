import { useState, useEffect } from "react";

// Create a local cache for user data
const userCache = new Map();

const useFetchUsername = (userId) => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
  const [username, setUsername] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      if (userCache.has(userId)) {
        setUsername(userCache.get(userId));
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/v1/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch username");
        }
        const resData = await response.json();
        const fetchedUsername = resData.data.user.username;

        // Cache the username
        userCache.set(userId, fetchedUsername);
        setUsername(fetchedUsername);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      }
    };

    if (userId) {
      fetchUsername();
    }
  }, [userId, API_URL]);

  return { username, error };
};

export default useFetchUsername;
