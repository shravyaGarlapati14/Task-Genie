import React, { createContext, useState,useEffect } from 'react';
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // const savedUser = localStorage.getItem('user');
        // return savedUser ? JSON.parse(savedUser) : null;
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null
    });


    useEffect(() => {
        // Fetch user from the database when the app loads
        const fetchUser = async () => {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            try {
              const { data } = await axios.get(`/api/users/${JSON.parse(storedUser).id}`);
              setUser(data); // Update user from the backend
            } catch (error) {
              console.error("Failed to fetch user:", error);
            }
          }
        };
        fetchUser();
      }, []);
    


    // const updateUser = (updatedUser) => {
    //     setUser(updatedUser);
    // };
    const updateUser = (newUser) => {
        setUser(newUser);
        if (newUser) {
          localStorage.setItem("user", JSON.stringify(newUser));
        } else {
          localStorage.removeItem("user");
        }
      };
    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
