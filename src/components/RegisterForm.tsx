import React, { useState } from 'react';
import { useToast } from '../hooks/useToast';
import { register } from '../services/authService'; 

const RegisterForm: React.FC = () => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await register({ token, username, email, password });

      if (!res.success) {
        showToast(res.message || 'Registration failed', 'danger');
        return;
      }

      showToast(res.message || 'Registered successfully!', 'success');

      setToken('');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err: unknown) {
      let message = 'Registration failed';

      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response
      ) {
        const axiosError = err as {
          response: {
            data: {
              message?: string;
            };
          };
        };

        message = axiosError.response.data?.message || message;
      }

      showToast(message, 'danger');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 shadow rounded bg-white" style={{ minWidth: '350px' }}>
        <h4 className="mb-4 text-center">Register</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Registration Token</label>
            <input
              type="text"
              className="form-control"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
