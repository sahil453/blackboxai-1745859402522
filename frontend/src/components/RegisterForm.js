import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/auth/register', { username, email, password });
      onRegister();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <label className="block mb-2">
        Username
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label className="block mb-2">
        Email
        <input
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="block mb-4">
        Password
        <input
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Register
      </button>
    </form>
  );
}
