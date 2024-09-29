// src/pages/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
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
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Skickar token från localStorage
        },
      };

      await axios.delete(`http://localhost:3000/api/users/${userId}`, config);
      setUsers(users.filter(user => user._id !== userId)); // Ta bort användaren från state
      setSuccess('Användare raderad!'); // Sätt framgångsmeddelande
    } catch (error) {
      console.error('Error deleting user: ', error);
      setError('Failed to delete user'); // Sätt felmeddelande
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
      const response = await axios.put(`http://localhost:3000/api/users/${editingUserId}`, { name: updatedName, email: updatedEmail });
      setUsers(users.map((user) => 
        user._id === editingUserId ? { ...user, name: updatedName, email: updatedEmail } : user
      ));
      setEditingUserId(null); // Reset editing user ID
      setUpdatedName(''); // Clear input fields
      setUpdatedEmail('');
      setSuccess('Användare uppdaterad!'); // Sätt framgångsmeddelande
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user'); // Sätt felmeddelande
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
      setSuccess('Användare skapad!'); // Sätt framgångsmeddelande
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Failed to create user'); // Sätt felmeddelande
    }
  };

  // Hantera meddelanden
  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  if (loading) {
    return <p className="text-center text-lg">Laddar användare...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold mb-4">Admin Panel</h1>

      {/* Visa felmeddelande om ett fel uppstår */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Visa framgångsmeddelande om registreringen lyckas */}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {users.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Namn</th>
              <th className="px-4 py-2 border-b">E-post</th>
              <th className="px-4 py-2 border-b">Åtgärder</th>
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
                    Uppdatera Användare
                  </button>

                  {/* Delete User Button */}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:underline"
                  >
                    Ta Bort Användare
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Inga användare hittades.</p>
      )}

      {/* Update User Form */}
      {editingUserId && (
        <form onSubmit={handleUpdate} className="mt-6">
          <h2 className="text-xl mb-2">Uppdatera Användare</h2>
          <div className="flex flex-col mb-4">
            <label className="mb-1">Namn:</label>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="border rounded p-2"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-1">E-post:</label>
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
            Uppdatera Användare
          </button>
          <button
            type="button"
            onClick={() => setEditingUserId(null)}
            className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
          >
            Avbryt
          </button>
        </form>
      )}

      <form onSubmit={handleCreate} className="mt-6">
        <h2 className="text-xl mb-2 font-extrabold">Skapa Ny Användare</h2>
        <div className="flex flex-col mb-4">
          <label className="mb-1">Namn:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded p-2"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-1">E-post:</label>
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
          Skapa Användare
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;