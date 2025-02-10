import React from 'react';

const TextContainer = ({ text }) => {
  return (
    <div className="text-container w-full max-w-md my-4 p-4 bg-white rounded-lg shadow-md text-center">
      <p>{text}</p>
    </div>
  );
};

export default TextContainer;
