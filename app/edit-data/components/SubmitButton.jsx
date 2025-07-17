import React from 'react';

const SubmitButton = ({ onClick, disabled }) => (
  <div className="pt-6">
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn px-6 py-2 rounded-lg text-white transition 
        ${disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-orange-500 hover:bg-orange-600"}`}
    >
      Submit
    </button>
  </div>
);

export default SubmitButton;
