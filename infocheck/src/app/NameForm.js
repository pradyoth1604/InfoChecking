"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Shimmer from "./Shimmer-UI";

const NameForm = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // New piece of state to track whether user details should be displayed
  const [userDetailsVisible, setUserDetailsVisible] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://my.api.mockaroo.com/users.json?key=bfa20ea0"
      );

      setUsers(response.data);
      setOriginalUsers(response.data);
      setError(null);
    } catch (error) {
      console.error("API request failed:", error);
      setError("API request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (name.trim() === "") {
        fetchUsers();
        setError(null);
        return;
      }

      const filteredUsers = originalUsers.filter((user) =>
        user.full_name.toLowerCase().includes(name.toLowerCase())
      );

      if (filteredUsers.length > 0) {
        setUsers(filteredUsers);
        setError(null);
      } else {
        setError("No users found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (value.trim() === "") {
      fetchUsers();
    }
  };

  // Function to toggle the visibility of user details
  const toggleUserDetails = (userId) => {
    setUserDetailsVisible((prevVisibility) => ({
      ...prevVisibility,
      [userId]: !prevVisibility[userId], // Toggle visibility for the specific user :)
    }));
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Enter a name"
          className="p-2 border rounded-l mr-2 focus:outline-none"
          value={name}
          onChange={handleInputChange} // Use the modified handler here :)
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </form>
      {error && (
        <p className="text-red-500 mt-4 text-center font-bold">{error}</p>
      )}
      <div className="mt-4 flex flex-wrap">
        {loading ? (
          <Shimmer />
        ) : users.length === 0 ? (
          <Shimmer />
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded-md mb-2 shadow-md bg-white mr-4"
              style={{ flexBasis: "calc(33.33% - 1rem)" }}
            >
              <p className="text-lg font-semibold text-gray-800">
                Name: {user.full_name}
              </p>
              {/* Conditionally show user details based on visibility state */}
              {userDetailsVisible[user.id] && (
                <>
                  <p className="text-gray-600">Age: {user.age}</p>
                  <p className="text-gray-600">
                    Nationality: {user.nationality}
                  </p>
                  <p className="text-gray-600">Gender: {user.gender}</p>
                </>
              )}
              <button
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                onClick={() => toggleUserDetails(user.id)}
              >
                {userDetailsVisible[user.id] ? "Hide Details" : "View Profile"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NameForm;
