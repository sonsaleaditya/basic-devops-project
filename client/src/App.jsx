import React, { useEffect, useState } from "react";
import { getUsers, addUser, deleteUser } from "./api";
import "./App.css"; // Importing the CSS file

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [error, setError] = useState(null);

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError("Error fetching users.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to add a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = await addUser(formData);
      setUsers([...users, newUser]); // Update the user list
      setFormData({ name: "", email: "" }); // Reset form
    } catch (err) {
      setError("Error adding user.");
      console.error(err);
    }
  };

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user._id !== id)); // Update user list
    } catch (err) {
      setError("Error deleting user.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>User Management</h1>
        <p>Add, update, and delete user details below</p>
      </header>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* User Form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add User</button>
      </form>

      {/* User List */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
