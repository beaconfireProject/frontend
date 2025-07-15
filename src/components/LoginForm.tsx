import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { getOnboardingStatus } from '../services/applicationService';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await login({ username, password });

      if (!res.success) {
        setError(res.message || 'Login failed');
        return;
      }

      const { token, role } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'HR') {
        navigate('/hr/dashboard');
        return;
      }

      if (role === 'EMPLOYEE') {
        const statusRes = await getOnboardingStatus();

        if (!statusRes.success) {
          setError(statusRes.message || 'Unable to check onboarding status');
          return;
        }

        const status = statusRes.data.status;

        if (status === 'APPROVED') {
          navigate('/employee/home');
        } else {
          navigate('/employee/onboarding');
        }

        return;
      }

      setError('Unknown role');
    } catch (err: unknown) {
      let message = 'Login failed';

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

      setError(message);
      showToast(message, 'danger');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 shadow rounded bg-white" style={{ minWidth: '350px' }}>
        <h4 className="mb-4 text-center">Login</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
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
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
