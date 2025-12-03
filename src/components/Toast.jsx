import React, { useEffect } from 'react';

const Toast = ({ show, message, actionLabel, onAction, onClose, duration = 3500 }) => {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed right-4 bottom-6 z-50">
      <div className="max-w-sm bg-white shadow-lg border rounded-lg p-4 flex items-center gap-3">
        <div className="text-sm text-gray-800">{message}</div>
        {actionLabel && (
          <button
            onClick={onAction}
            className="ml-2 text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {actionLabel}
          </button>
        )}
        <button onClick={onClose} className="ml-2 text-xs text-gray-500">✕</button>
      </div>
    </div>
  );
};

export default Toast;
