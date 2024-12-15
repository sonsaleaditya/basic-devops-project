import axios from 'axios';

// Create an Axios instance with the base URL from the environment variable
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // URL from the .env file
});

// Fetch all users
export const getUsers = async () => {
  const response = await API.get("/api/users");
  return response.data;
};

// Add a new user
export const addUser = async (userData) => {
  const response = await API.post("/api/users", userData);
  return response.data;
};

// Delete a user by ID
export const deleteUser = async (id) => {
  const response = await API.delete(`/api/users/${id}`);
  return response.data;
};
