import React from 'react';

const QuantitySelector = ({ value = 1, min = 1, onChange }) => {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(value + 1);

  return (
    <div className="inline-flex items-center border rounded overflow-hidden">
      <button
        onClick={dec}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
        aria-label="decrease"
      >−</button>
      <div className="px-4 py-1 w-10 text-center">{value}</div>
      <button
        onClick={inc}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
        aria-label="increase"
      >+</button>
    </div>
  );
};

export default QuantitySelector;
