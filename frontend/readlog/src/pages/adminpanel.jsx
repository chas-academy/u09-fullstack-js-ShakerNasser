import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUpdateTitle from '../hooks/UpdateTitle';  // Import the custom hook

const AdminPanel = () => {
  useUpdateTitle("Admin Panel");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  // New user state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState(''); // State for the new user's password
  const [isCreating, setIsCreating] = useState(false);  // State to show/hide the create user form

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`);
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

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, config);
      
      // Remove user from the list
      setUsers(users.filter(user => user._id !== userId));
      
      // Set success message
      setSuccess('User deleted!'); 
      console.log('Success message set: User deleted!'); // Log the success message
    } catch (error) {
      console.error('Error deleting user: ', error);
      setError('Failed to delete user');
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
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Send token from localStorage
        },
      };

      await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${editingUserId}`,
        { name: updatedName, email: updatedEmail },
        config
      );
      setUsers(users.map((user) => 
        user._id === editingUserId ? { ...user, name: updatedName, email: updatedEmail } : user
      ));
      setEditingUserId(null); // Reset editing user ID
      setUpdatedName(''); // Clear input fields
      setUpdatedEmail('');
      setSuccess('User updated!'); // Set success message
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user'); // Set error message
    }
  };

  // Create new user
  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!newName || !newEmail || !newPassword) { // Check for name, email, and password
      alert("Name, email, and password are required");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Send token from localStorage
        },
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, 
        { name: newName, email: newEmail, password: newPassword },
        config
      );
      
      setUsers([...users, response.data]); // Add new user to the state
      setNewName(''); // Clear input fields
      setNewEmail('');
      setNewPassword(''); // Clear password field
      setIsCreating(false); // Hide the form after user creation
      setSuccess('User created!'); // Set success message
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Failed to create user'); // Set error message
    }
  };

  // Automatically hide success message after a few seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000); // Remove message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Automatically hide error message after a few seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000); // Remove message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (loading) {
    return <p className="text-center text-lg">Loading users...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold mb-4">Admin Panel</h1>

      {/* Display error message if any */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Display success message if the operation succeeds */}
      {success && <p className="text-green-500 mb-4">{success}</p>}

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

      {/* Button to show/hide Create User form */}
      <button
        onClick={() => setIsCreating(!isCreating)}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isCreating ? 'Cancel' : 'Create New User'}
      </button>

      {/* New User Form */}
      {isCreating && (
        <form onSubmit={handleCreate} className="mt-6">
          <h2 className="text-xl mb-2">Create New User</h2>
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
          <div className="flex flex-col mb-4">
            <label className="mb-1">Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border rounded p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create User
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminPanel;
