import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import clsx from '../../utils/clsx';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: string) => void }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50 max-w-md w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            "p-4 rounded-lg shadow-lg flex items-start",
            "transform transition-all duration-300 animate-slide-up",
            toast.type === 'success' && "bg-success-50 text-success-800 dark:bg-success-900 dark:text-success-100",
            toast.type === 'error' && "bg-error-50 text-error-800 dark:bg-error-900 dark:text-error-100",
            toast.type === 'info' && "bg-primary-50 text-primary-800 dark:bg-primary-900 dark:text-primary-100",
          )}
        >
          <div className="flex-shrink-0 mr-3">
            {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-success-500" />}
            {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-error-500" />}
            {toast.type === 'info' && <Info className="h-5 w-5 text-primary-500" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export const Toaster = () => null; // This component is no longer needed as ToastProvider handles everything