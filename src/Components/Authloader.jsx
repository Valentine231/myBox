import React from 'react';
import { ReactSpinner } from 'react-spinner';

const Spinner = ({ size = 'medium', color = '#4f46e5' }) => {
  const sizeValues = {
    small: 24,
    medium: 32,
    large: 48
  };

  return (
    <div className="flex justify-center items-center">
      <ReactSpinner 
        width={sizeValues[size]} 
        height={sizeValues[size]} 
        color={color} 
      />
    </div>
  );
};

export default Spinner;