import React, { useState } from 'react';
import { useRegisterMutation, useLoginMutation } from '../redux/apiSlice';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ email, username, password }).unwrap();
      const data = await login({ username, password }).unwrap();
      dispatch(setUser({ user: username, token: data.access }));
      navigate('/submit-review');
    } catch (error) {
      setError(error.data ? error.data.detail : 'Registration failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Register
        </button>
        <p>
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-blue-500">
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
