import React from 'react';
import useUpdateTitle from '../hooks/UpdateTitle';  // Import the custom hook
import useFetchUsers from '../hooks/useFetchUsers'; // Import the fetch users hook
import useUserManagement from '../hooks/useUserManagement'; // Import the user management hook

const AdminPanel = () => {
  useUpdateTitle("Admin Panel");

  const { users, loading, error } = useFetchUsers(); // Fetch users from API
  const {
    success,
    editingUserId,
    updatedName,
    updatedEmail,
    newName,
    newEmail,
    newPassword,
    isCreating,
    handleDelete,
    startEditing,
    handleUpdate,
    handleCreate,
    setEditingUserId,
    setUpdatedName,
    setUpdatedEmail,
    setNewName,
    setNewEmail,
    setNewPassword,
    setIsCreating,
  } = useUserManagement(users); // Use user management logic

  // Automatically hide success message after a few seconds
  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000); // Remove message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Automatically hide error message after a few seconds
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000); // Remove message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (loading) {
    return <p className="text-center text-lg">Loading users...</p>;
  }

  return (
    <div className="container mx-auto p-4 mb-15">
      <h1 className="text-3xl font-extrabold mb-4">Admin Panel</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
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
                  <button
                    onClick={() => startEditing(user)}
                    className="text-yellow-500 hover:underline mr-4"
                  >
                    Update User
                  </button>
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

      <button
        onClick={() => setIsCreating(!isCreating)}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isCreating ? 'Cancel' : 'Create New User'}
      </button>

      {isCreating && (
        <form onSubmit={handleCreate} className="mt-6 mb-20">
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
