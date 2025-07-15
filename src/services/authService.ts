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
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    return {
      success: true,
      message: 'Login successful',
      data: response.data,
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || 'Login failed',
      data: null,
      timestamp: new Date().toISOString()
    };
  }
};

export const register = async (form: RegisterRequest) => {
  // Uncomment below when backend is ready
  const response = await axiosInstance.post('/api/auth/register', form);
  // return response.data;

  // Mock response for now
  // return {
  //   success: true,
  //   message: 'Registration successful',
  //   data: {},
  //   timestamp: new Date().toISOString(),
  // };


  return {
    success: true,
    message: 'Registration successful',
    data: response.data,               // whatever your backend returns (often empty)
    timestamp: new Date().toISOString()
  };
};

