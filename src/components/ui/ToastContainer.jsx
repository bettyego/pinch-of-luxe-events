import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast, { TOAST_POSITIONS } from './Toast';

// Position styles
const POSITION_STYLES = {
  [TOAST_POSITIONS.TOP_RIGHT]: 'top-4 right-4',
  [TOAST_POSITIONS.TOP_LEFT]: 'top-4 left-4',
  [TOAST_POSITIONS.TOP_CENTER]: 'top-4 left-1/2 transform -translate-x-1/2',
  [TOAST_POSITIONS.BOTTOM_RIGHT]: 'bottom-4 right-4',
  [TOAST_POSITIONS.BOTTOM_LEFT]: 'bottom-4 left-4',
  [TOAST_POSITIONS.BOTTOM_CENTER]: 'bottom-4 left-1/2 transform -translate-x-1/2'
};

const ToastContainer = ({ 
  toasts = [], 
  position = TOAST_POSITIONS.TOP_RIGHT,
  onRemoveToast 
}) => {
  const positionClass = POSITION_STYLES[position];

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`fixed ${positionClass} z-50 space-y-3 max-w-sm w-full`}>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onClose={onRemoveToast}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ToastContainer;
