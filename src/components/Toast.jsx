import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X, RotateCcw } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, onUndo }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2">
      <div className={`flex items-center space-x-3 p-4 rounded-lg border shadow-lg ${getBgColor()}`}>
        {getIcon()}
        <span className="text-sm font-medium text-gray-900">{message}</span>
        
        {onUndo && (
          <button
            onClick={onUndo}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Undo
          </button>
        )}
        
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white hover:bg-opacity-50"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;