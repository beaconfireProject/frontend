import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';
import type { ToastContextProps } from '../context/ToastContext';


export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
