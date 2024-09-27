// src/pages/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  
  // New user state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Failed to delete user');
      }
    }
  };

  // Start editing user
  const startEditing = (user) => {
    setEditingUserId(user._id);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!updatedName || !updatedEmail) {
      alert("Name and email are required");
      return;
    }
    
    try {
      await axios.put(`http://localhost:3000/api/users/${editingUserId}`, { name: updatedName, email: updatedEmail });
      setUsers(users.map((user) => 
        user._id === editingUserId ? { ...user, name: updatedName, email: updatedEmail } : user
      ));
      setEditingUserId(null); // Reset editing user ID
      setUpdatedName(''); // Clear input fields
      setUpdatedEmail('');
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user');
    }
  };

  // Create new user
  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!newName || !newEmail) {
      alert("Name and email are required");
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3000/api/users', { name: newName, email: newEmail });
      setUsers([...users, response.data]); // Add new user to the state
      setNewName(''); // Clear input fields
      setNewEmail('');
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Failed to create user');
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold mb-4">Admin Panel</h1>

      {users.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-4 py-2 border-b">
                  {/* Update User Button */}
                  <button
                    onClick={() => startEditing(user)}
                    className="text-yellow-500 hover:underline mr-4"
                  >
                    Update User
                  </button>

                  {/* Delete User Button */}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}

      {/* Update User Form */}
      {editingUserId && (
        <form onSubmit={handleUpdate} className="mt-6">
          <h2 className="text-xl mb-2">Update User</h2>
          <div className="flex flex-col mb-4">
            <label className="mb-1">Name:</label>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="border rounded p-2"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-1">Email:</label>
            <input
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              className="border rounded p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update User
          </button>
          <button
            type="button"
            onClick={() => setEditingUserId(null)}
            className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      )}

      <form onSubmit={handleCreate} className="mt-6">
        <h2 className="text-xl mb-2 font-extrabold">Create New User</h2>
        <div className="flex flex-col mb-4">
          <label className="mb-1">Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded p-2"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-1">Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className=" bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
