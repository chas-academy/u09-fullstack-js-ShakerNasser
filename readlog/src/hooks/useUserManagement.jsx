// src/hooks/useUserManagement.js

import { useState } from 'react';
import axios from 'axios';

const useUserManagement = (initialUsers) => {
  const [users, setUsers] = useState(initialUsers);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, config);
      setUsers(users.filter(user => user._id !== userId));
      setSuccess('User deleted!');
    } catch (error) {
      console.error('Error deleting user: ', error);
      setError('Failed to delete user');
    }
  };

  const startEditing = (user) => {
    setEditingUserId(user._id);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updatedName || !updatedEmail) {
      alert("Name and email are required");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${editingUserId}`,
        { name: updatedName, email: updatedEmail },
        config
      );

      setUsers(users.map((user) => 
        user._id === editingUserId ? { ...user, name: updatedName, email: updatedEmail } : user
      ));
      setEditingUserId(null);
      setUpdatedName('');
      setUpdatedEmail('');
      setSuccess('User updated!');
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName || !newEmail || !newPassword) {
      alert("Name, email, and password are required");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, 
        { name: newName, email: newEmail, password: newPassword },
        config
      );

      setUsers([...users, response.data]);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setIsCreating(false);
      setSuccess('User created!');
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Failed to create user');
    }
  };

  return {
    users,
    success,
    error,
    editingUserId,
    updatedName,
    updatedEmail,
    newName,
    newEmail,
    newPassword,
    isCreating,
    setEditingUserId,
    setUpdatedName,
    setUpdatedEmail,
    setNewName,
    setNewEmail,
    setNewPassword,
    setIsCreating,
    handleDelete,
    startEditing,
    handleUpdate,
    handleCreate,
    setSuccess,
    setError,
  };
};

export default useUserManagement;
