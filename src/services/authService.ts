import axiosInstance from '../utils/axiosInstance';

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  token: string;
}

export const login = async (credentials: LoginRequest) => {
  // Uncomment below when backend is ready
  // const response = await axiosInstance.post('/api/auth/login', credentials);
  // return response.data;

  // Mock response for now
  return {
    success: true,
    message: 'Login successful',
    data: {
      token: 'mock-jwt-token-123456',
      role: 'HR', // or 'HR'
    },
    timestamp: new Date().toISOString(),
  };
};

export const register = async (form: RegisterRequest) => {
  // Uncomment below when backend is ready
  // const response = await axiosInstance.post('/api/auth/register', form);
  // return response.data;

  // Mock response for now
  return {
    success: true,
    message: 'Registration successful',
    data: {},
    timestamp: new Date().toISOString(),
  };
};
