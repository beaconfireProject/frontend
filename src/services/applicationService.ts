import axiosInstance from '../utils/axiosInstance';

interface OnboardingStatusResponse {
  status: 'APPROVED' | 'PENDING' | 'REJECTED' | string;
}

export const getOnboardingStatus = async () => {
  // Uncomment when backend is ready
  const response = await axiosInstance.post<OnboardingStatusResponse>('/api/onboarding/status');
  // return response.data;

  // Mock response for now
  // return {
  //   success: true,
  //   message: 'Status fetched successfully',
  //   data: {
  //     status: 'PENDING', // or 'PENDING', 'REJECTED'
  //   },
  //   timestamp: new Date().toISOString(),
  // };

  return {
    success: true,
    message: 'Status fetched successfully',
    data: response.data,
    timestamp: new Date().toISOString(),
  };
};
