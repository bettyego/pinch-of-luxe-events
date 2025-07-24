import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiXCircle, 
  FiAlertCircle, 
  FiInfo, 
  FiX,
  FiLoader
} from 'react-icons/fi';

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  LOADING: 'loading'
};

// Toast positions
export const TOAST_POSITIONS = {
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center'
};

// Toast configuration
const TOAST_CONFIG = {
  [TOAST_TYPES.SUCCESS]: {
    icon: FiCheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
    textColor: 'text-green-800',
    progressColor: 'bg-green-500'
  },
  [TOAST_TYPES.ERROR]: {
    icon: FiXCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
    textColor: 'text-red-800',
    progressColor: 'bg-red-500'
  },
  [TOAST_TYPES.WARNING]: {
    icon: FiAlertCircle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-600',
    textColor: 'text-yellow-800',
    progressColor: 'bg-yellow-500'
  },
  [TOAST_TYPES.INFO]: {
    icon: FiInfo,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    textColor: 'text-blue-800',
    progressColor: 'bg-blue-500'
  },
  [TOAST_TYPES.LOADING]: {
    icon: FiLoader,
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    iconColor: 'text-gray-600',
    textColor: 'text-gray-800',
    progressColor: 'bg-gray-500'
  }
};

// Individual Toast Component
const Toast = ({ 
  id,
  type = TOAST_TYPES.INFO,
  title,
  message,
  duration = 5000,
  showProgress = true,
  onClose,
  action
}) => {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  const config = TOAST_CONFIG[type];
  const Icon = config.icon;

  useEffect(() => {
    if (type === TOAST_TYPES.LOADING) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev <= 0) {
          handleClose();
          return 0;
        }
        return prev - (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, type]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(id), 300);
  };

  const toastVariants = {
    initial: { 
      opacity: 0, 
      x: 300, 
      scale: 0.8 
    },
    animate: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      x: 300, 
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={toastVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`
            relative max-w-sm w-full ${config.bgColor} ${config.borderColor} 
            border rounded-lg shadow-lg overflow-hidden backdrop-blur-sm
          `}
        >
          {/* Progress bar */}
          {showProgress && type !== TOAST_TYPES.LOADING && (
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
              <motion.div
                className={`h-full ${config.progressColor}`}
                initial={{ width: '100%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          )}

          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {type === TOAST_TYPES.LOADING ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon className={`h-5 w-5 ${config.iconColor}`} />
                  </motion.div>
                ) : (
                  <Icon className={`h-5 w-5 ${config.iconColor}`} />
                )}
              </div>
              
              <div className="ml-3 w-0 flex-1">
                {title && (
                  <p className={`text-sm font-medium ${config.textColor}`}>
                    {title}
                  </p>
                )}
                {message && (
                  <p className={`text-sm ${config.textColor} ${title ? 'mt-1' : ''}`}>
                    {message}
                  </p>
                )}
                
                {action && (
                  <div className="mt-3">
                    <button
                      onClick={action.onClick}
                      className={`
                        text-sm font-medium ${config.iconColor} 
                        hover:underline focus:outline-none
                      `}
                    >
                      {action.label}
                    </button>
                  </div>
                )}
              </div>
              
              {type !== TOAST_TYPES.LOADING && (
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={handleClose}
                    className={`
                      inline-flex ${config.textColor} hover:opacity-75 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 
                      focus:ring-offset-white focus:ring-gray-400 rounded-md
                    `}
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
