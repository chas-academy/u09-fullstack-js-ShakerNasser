import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useUpdateTitle from '../hooks/UpdateTitle';  // Import the custom hook

const Register = () => {
  useUpdateTitle("Register"); 
  // Använd state för fältens värden och fel/success hantering
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();  // För att navigera till inloggningssidan

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { 
        name, 
        email, 
        password 
      });

      // Sätt framgångsmeddelande och logga tokenen (valfritt)
      setSuccess('Registration successful!');


      // Rensa alla fält efter lyckad registrering
      setName('');
      setEmail('');
      setPassword('');

      // Omdirigera användaren till inloggningssidan efter 3 sekunder
      setTimeout(() => {
        setSuccess('');
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      // Hantera felmeddelandet från servern eller visa ett generellt felmeddelande
      setError(err.response?.data?.message || 'Something went wrong');
      
      // Rensa felmeddelandet efter 3 sekunder
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">Register</h2>

        {/* Visa felmeddelande om ett fel uppstår */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Visa framgångsmeddelande om registreringen lyckas */}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>

        <div className="mt-4">
          <p>
            Already a member? <Link to="/login" className="text-blue-500">Login!</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
