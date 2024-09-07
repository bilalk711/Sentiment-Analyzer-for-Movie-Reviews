import React, { useState } from 'react';
import { useLoginMutation } from '../redux/apiSlice';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ username, password }).unwrap();
      console.log(data);
      dispatch(setUser({ user: username, token: data.access }));
      navigate('/submit-review');
    } catch (error) {
      setError(error.data ? error.data.detail : 'Login failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
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
          Login
        </button>
        <p>
          Don't have an account?{' '}
          <button onClick={() => navigate('/register')} className="text-blue-500">
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
